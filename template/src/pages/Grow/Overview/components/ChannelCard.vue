<template>
  <Card id="ChannelCard">
    <p slot="title">渠道结构</p>
    <Select slot="extra" v-model="selected" @on-change="handleSeletedChange">
      <Option :value="1">激活数</Option>
      <Option :value="2">花费</Option>
      <Option :value="3">收益</Option>
    </Select>
    <div class="icon-button">
      <Icon
        type="ios-pie-outline"
        :class="{ 'active-icon': active === 1 }"
        @click="
          () => {
            active = 1;
          }
        "
      ></Icon>
      <Icon
        type="ios-paper-outline"
        :class="{ 'active-icon': active === 2 }"
        @click="
          () => {
            active = 2;
          }
        "
      ></Icon>
    </div>
    <vue-lazy-component @init="showChart">
      <div
        v-show="active === 1"
        id="container"
        style="min-height:300px"
      >
        <div id="channel-chart"></div>
      </div>
      <div v-if="active === 2" class="card-table">
        <Table
          stripe
          :columns="columns"
          :data="tableData"
          :height="280"
        ></Table>
      </div>
    </vue-lazy-component>
    <Spin v-if="loading" size="large" fix></Spin>
  </Card>
</template>
<script>
import { Chart } from '@antv/g2';
import {
  getOVChannel
} from '@/server/grow';
export default {
  props: {
    params: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      chart: null,
      loading: false,
      isShow: false,
      selected: 1,
      selectedOptions: [
        { value: 1, label: '激活数' },
        { value: 2, label: '花费' },
        { value: 3, label: '收益' }
      ],
      active: 1,
      activeTotal: '···',
      data: [],
      tableData: [],
      columns: [
        {
          title: '渠道',
          key: 'channel_name'
        },
        {
          title: '激活数',
          key: 'data'
        },
        {
          title: '占比',
          key: 'ratio',
          render: (h, params) => {
            return <span>{`${params.row.ratio}%`}</span>;
          }
        }
      ]
    };
  },
  watch: {
    params: {
      handler(value) {
        this.getData();
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    async showChart() {
      this.isShow = true;
      await this.getData();
    },
    async getData() {
      if (!this.isShow) {
        return false;
      }
      this.loading = true;
      const { data } = await getOVChannel({
        ...this.params,
        index: this.selected
      });
      if (data.code === 0) {
        const parseData = data.data.items ? data.data.items.map(item => ({
          channel_name: item.channel_name,
          data: Math.floor(item.data * 100) / 100,
          ratio: Math.floor(item.ratio * 100) / 100
        })) : [];
        this.data = parseData;
        this.tableData = parseData;
        this.activeTotal = data.data.data_total;
      }
      this.loading = false;
      this.initChannelCart(this.data);
    },
    handleSeletedChange() {
      this.getData();
    },
    initChannelCart(data) {
      this.chart && this.chart.destroy();
      const chart = new Chart({
        container: 'channel-chart',
        autoFit: true,
        height: 300
      });
      chart.data(data);
      chart.coordinate('theta', {
        radius: 0.75,
        innerRadius: 0.75
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
        itemTpl: `
          <ul class="g2-tooltip-list">
            <li class="g2-tooltip-list-item">
              <span style="background-color:{color};" class="g2-tooltip-marker"></span>
              <span class="g2-tooltip-name">{name}</span></span>
            </li>
            <li class="g2-tooltip-list-item">
              <span class="g2-tooltip-marker"></span>
              <span class="g2-tooltip-name">{selected}</span>:<span class="g2-tooltip-value">{value}</span>
            </li>
            <li class="g2-tooltip-list-item">
              <span class="g2-tooltip-marker"></span>
              <span class="g2-tooltip-name">占比</span>:<span class="g2-tooltip-value">{percent}</span>
            </li>
          </ul>
        `
      });
      // 声明需要进行自定义图例字段：
      chart.legend('channel_name', {
        position: 'right', // 配置图例显示位置
        custom: true, // 关键字段，告诉 G2，要使用自定义的图例
        offsetX: -40,
        items: data.map((obj, index) => {
          return {
            name: obj.channel_name, // 对应 itemName
            value: `${obj.ratio}% | ${obj.data}`, // 对应 itemValue
            marker: {
              symbol: 'circle', // marker 的形状
              style: {
                r: 5, // marker 图形半径
                fill: chart.getTheme().colors10[index] // marker 颜色，使用默认颜色，同图形对应
              }
            } // marker 配置
          };
        }),
        itemValue: {
          style: {
            fill: '#999'
          }, // 配置 itemValue 样式
          formatter: val => `${val}` // 格式化 itemValue 内容
        }
      });
      chart.annotation().clear(true);
      data.length > 0 && chart
        .annotation()
        .text({
          position: ['50%', '50%'],
          content: this.selectedOptions[this.selected - 1].label,
          style: {
            fontSize: 14,
            fill: '#8c8c8c',
            textAlign: 'center'
          },
          offsetY: -14
        })
        .text({
          position: ['50%', '50%'],
          content: this.activeTotal,
          style: {
            fontSize: 22,
            fill: 'rgba(0, 0, 0, 0.84)',
            textAlign: 'center',
            background: '#ffffff'
          },
          offsetY: 14
        });
      chart
        .interval()
        .adjust('stack')
        .position('data')
        .color('channel_name')
        .tooltip('channel_name*data*ratio', (name, value, percent) => {
          return {
            selected: this.selectedOptions[this.selected - 1].label,
            name,
            value,
            percent: percent + '%'
          };
        });
      chart.render();
      this.chart = chart;
    }
  }
};
</script>

<style lang="scss">
#ChannelCard {
  .icon-button {
    .ivu-icon {
      font-size: 30px;
      cursor: pointer;
      margin: 0 10px;
    }
    .active-icon {
      color: #3388ff;
      /* background-color: #3388ff; */
    }
  }
  .ivu-card-extra {
    top: 7px;
  }
  .card-table {
    margin: 20px 10px 0;
  }
}
</style>
