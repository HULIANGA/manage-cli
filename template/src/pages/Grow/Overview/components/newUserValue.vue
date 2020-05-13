<template>
  <Card id="NewUserValue">
    <p slot="title">新增用户价值</p>
    <Select slot="extra" v-model="selected" @on-change="handleSeletedChange">
      <Option :value="1">LTV7</Option>
      <Option :value="2">LTV15</Option>
      <Option :value="3">LTV30</Option>
    </Select>
    <div class="chart-info">
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
      <Alert type="warning" show-icon>查看该图表的LTV数据时，“产品”或“渠道+产品”请必选一个，仅选择“渠道”或不选时，无法预测LTV。</Alert>
    </div>
    <vue-lazy-component @init="showChart">
      <div
        v-show="active === 1"
        id="container"
        style="margin:20px 10px 10px;min-height: 300px"
      >
        <div id="new-userchart"></div>
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
import { getOVNewUserLTV } from '@/server/grow';
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
          title: 'CPI',
          key: 'cpi'
        },
        {
          title: 'ARPU',
          key: 'arpu'
        },
        {
          title: this.selected === 1 ? 'LTV7' : this.selected === 2 ? 'LTV15' : 'LTV30',
          key: 'ltv'
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
      const { data } = await getOVNewUserLTV({
        ...this.params,
        index: this.selected
      });
      if (data.code === 0) {
        this.data = data.data.items || [];
        this.tableData = data.data.items || [];
      }
      this.loading = false;
      this.initNewUserValueChart();
    },
    initNewUserValueChart() {
      const data = [];
      this.data.forEach(item => {
        data.push({
          date_time: item.date_time,
          value: Math.floor(item.cpi * 100) / 100,
          type: 'CPI'
        });
        data.push({
          date_time: item.date_time,
          value: Math.floor(item.arpu * 100) / 100,
          type: 'ARPU'
        });
        data.push({
          date_time: item.date_time,
          value: Math.floor(item.ltv * 100) / 100,
          type: this.selected === 1 ? 'LTV7' : this.selected === 2 ? 'LTV15' : 'LTV30'
        });
      });

      const chart = this.chart || new Chart({
        container: 'new-userchart',
        autoFit: true,
        height: 300
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

      chart.legend({
        custom: true,
        items: [
          { value: 'cpi', name: 'CPI', marker: { symbol: 'square', style: { fill: '#5c90f9', r: 5 } } },
          { value: 'arpu', name: 'ARPU', marker: { symbol: 'square', style: { fill: '#5bd8a7', r: 5 } } },
          { value: 'ltv', name: 'LTV', marker: { symbol: 'square', style: { fill: '#657798', r: 5 } } }
        ]
      });
      chart.removeInteraction('legend-filter'); // 自定义图例，移除默认的分类图例筛选交互

      chart.tooltip({
        showCrosshairs: true,
        shared: true
      });

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
#NewUserValue {
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
  .chart-info {
    display: flex;
    align-items: center;
    :global(.ivu-alert) {
      margin-bottom: 0;
      margin-left: 16px;
    }
    .icon-button {
      flex-shrink: 0;
      .ivu-icon {
        font-size: 30px;
        cursor: pointer;
        margin: 0 10px;
      }
      .active-icon {
        color: #3388ff;
      }
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
