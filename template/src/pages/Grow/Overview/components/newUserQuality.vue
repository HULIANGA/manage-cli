<template>
  <Card id="NewUserCard">
    <p slot="title">新用户质量</p>
    <Select slot="extra" v-model="selected" @on-change="handleSeletedChange">
      <Option :value="1">切换次数>=3次用户数</Option>
      <Option :value="2">0次展示用户数</Option>
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
        style="margin:20px 10px 10px;min-height: 300px"
      >
        <div id="new-user-chart"></div>
      </div>
      <div v-if="active === 2" class="card-table">
        <Table
          stripe
          :columns="columns"
          :data="tableData"
          :height="310"
        ></Table>
      </div>
      <Spin v-if="loading" size="large" fix></Spin>
    </vue-lazy-component>
  </Card>
</template>
<script>
import { getOVNewUserQuality } from '@/server/grow';
import { Chart } from '@antv/g2';
export default {
  props: {
    params: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isShow: false,
      loading: false,
      chart: null,
      active: 1,
      selected: 1,
      data: [],
      tableData: []
    };
  },
  computed: {
    columns: function() {
      return [
        {
          title: '日期',
          key: 'date_time'
        },
        {
          title: '新增用户数',
          key: 'add_user'
        },
        {
          title: this.selected === 1 ? '切换次数≥3次用户数' : '0次展示用户数',
          key: 'data'
        }
      ];
    }
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
      const { data } = await getOVNewUserQuality({
        ...this.params,
        index: this.selected
      });
      if (data.code === 0) {
        this.data = data.data.items || [];
        this.tableData = data.data.items ? data.data.items.map(item => ({
          date_time: item.date_time,
          add_user: parseInt(item.add_user || 0),
          data: parseInt(item.data || 0)
        })) : [];
      }
      this.loading = false;
      this.initNewUserQualityChart();
    },
    initNewUserQualityChart() {
      const data = [];
      this.data.forEach(item => {
        const date = this.params.begin_time === this.params.end_time ? (`${this.params.begin_time} ${item.date_time}:00`) : item.date_time;
        data.push({
          date,
          date_time: item.date_time,
          value: parseInt(item.add_user || 0),
          type: '新增用户'
        });
        data.push({
          date,
          date_time: item.date_time,
          value: parseInt(item.data || 0),
          type: this.selected === 1 ? '切换次数≥3次用户数' : '0次展示用户数'
        });
      });
      const chart = this.chart || new Chart({
        container: 'new-user-chart',
        autoFit: true,
        height: 320
      });

      chart.data(data);
      chart.scale({
        date_time: {
          type: 'cat'
        },
        value: {
          nice: true
        }
      });

      chart.tooltip({
        showCrosshairs: true,
        shared: true,
        title: 'date'
      });

      chart.legend({
        custom: true,
        items: [
          { value: 'add_user', name: '新增用户', marker: { symbol: 'square', style: { fill: '#5c90f9', r: 5 } } },
          { value: 'data', name: this.selected === 1 ? '切换次数≥3次用户数' : '0次展示用户数', marker: { symbol: 'square', style: { fill: '#5bd8a7', r: 5 } } }
        ]
      });
      chart.removeInteraction('legend-filter'); // 自定义图例，移除默认的分类图例筛选交互

      chart
        .line()
        .position('date_time*value')
        .color('type');

      chart
        .point()
        .position('date_time*value')
        .color('type')
        .shape('circle');

      chart.render();
      this.chart = chart;
    },
    handleSeletedChange() {
      this.getData();
    }
  }
};
</script>

<style lang="scss">
#NewUserCard {
  .card-title {
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    color: rgba(0, 0, 0, 0.427450980392157);
    line-height: 22px;
  }
  .card-count {
    align-self: flex-start;
    /* padding: 0px 0px 28px 24px; */
    box-sizing: border-box;
    font-size: 30px;
    color: rgba(0, 0, 0, 0.847058823529412);
    line-height: 38px;
  }
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
