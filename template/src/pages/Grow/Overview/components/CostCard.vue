<template>
  <Card id="CostCard">
    <p slot="title">成本概览</p>
    <Row
      :gutter="16"
      type="flex"
      justify="space-around"
      style="margin-top: 8px;margin-bottom: 24px;"
    >
      <Col :span="6">
        <div>
          <div class="card-title">花费</div>
          <div class="card-count">{{ total.ad_cost }}</div>
        </div>
      </Col>
      <Col :span="6">
        <div class="card-title">激活数</div>
        <div class="card-count">{{ total.ad_install }}</div>
      </Col>
      <Col :span="6">
        <div class="card-title">CPI</div>
        <div class="card-count">&yen;{{ total.cpi }}</div>
      </Col>
    </Row>
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
        <div id="cost-chart"></div>
      </div>
      <div v-if="active === 2" class="card-table">
        <Table
          stripe
          :columns="columns"
          :data="tableData"
          :height="310"
        ></Table>
      </div>
    </vue-lazy-component>
    <Spin v-if="loading" size="large" fix></Spin>
  </Card>
</template>
<script>
import { getOVCost } from '@/server/grow';
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
      Prop: {
        container: 'cost-chart',
        autoFit: true,
        padding: 0,
        height: 400
      },
      isShow: false,
      loading: false,
      chart: null,
      active: 1,
      total: {
        ad_cost: '···',
        ad_install: '···',
        cpi: '···'
      },
      data: [],
      tableData: [],
      columns: [
        {
          title: '日期',
          key: 'date_time'
        },
        {
          title: '花费',
          key: 'ad_cost'
        },
        {
          title: '激活数',
          key: 'ad_install'
        },
        {
          title: 'CPI',
          key: 'cpi'
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
      const { data } = await getOVCost(this.params);
      if (data.code === 0) {
        this.data = this.tableData = data.data.items ? data.data.items.map(item => ({
          date: this.params.begin_time === this.params.end_time ? (`${this.params.begin_time} ${item.date_time}:00`) : item.date_time,
          date_time: item.date_time,
          ad_cost: Math.floor(item.ad_cost * 100) / 100,
          ad_install: parseInt(item.ad_install),
          cpi: item.cpi
        })) : [];
        this.total = {
          ad_cost: data.data.ad_cost ? Math.floor(data.data.ad_cost * 100) / 100 : '···',
          ad_install: data.data.ad_install ? parseInt(data.data.ad_install) : '···',
          cpi: data.data.cpi || '···'
        };
      }
      this.loading = false;
      this.initCostCart();
    },
    initCostCart() {
      const data = this.data;
      const chart = this.chart || new Chart({
        container: 'cost-chart',
        autoFit: true,
        height: 300
      });

      chart.data(data);
      chart.scale({
        date_time: {
          type: 'cat'
        },
        ad_install: {
          alias: '激活数',
          nice: true
        },
        cpi: {
          alias: 'CPI',
          type: 'linear',
          nice: true
        }
      });

      chart.axis('ad_install', {
        title: {}
      });

      chart.axis('cpi', {
        grid: null,
        title: {}
      });

      chart.legend({
        custom: true,
        items: [
          { value: 'ad_install', name: '激活数', marker: { symbol: 'square', style: { fill: '#5c90f9', r: 5 } } },
          { value: 'cpi', name: 'CPI', marker: { symbol: 'square', style: { fill: '#5bd8a7', r: 5 } } }
        ]
      });
      chart.removeInteraction('legend-filter'); // 自定义图例，移除默认的分类图例筛选交互

      chart.tooltip({
        showCrosshairs: true,
        shared: true,
        title: 'date',
        itemTpl: `
          <div>
            <li class="g2-tooltip-list-item">
              <span class="g2-tooltip-marker"></span>
              <span class="g2-tooltip-name">花费</span>:<span class="g2-tooltip-value">{ad_cost}</span>
            </li>
            <li class="g2-tooltip-list-item">
              <span style="background-color:#5b8ff9;" class="g2-tooltip-marker"></span>
              <span class="g2-tooltip-name">激活数</span>:<span class="g2-tooltip-value">{ad_install}</span>
            </li>
            <li class="g2-tooltip-list-item">
              <span style="background-color:#59d8a6;" class="g2-tooltip-marker"></span>
              <span class="g2-tooltip-name">CPI</span>:<span class="g2-tooltip-value">￥{cpi}</span>
            </li>
          </div>
        `
      });

      chart
        .line()
        .position('date_time*ad_install')
        .color('#5b8ff9')
        .tooltip('ad_install*ad_cost*cpi', (ad_install, ad_cost, cpi) => {
          return {
            ad_install,
            ad_cost,
            cpi
          };
        });

      chart
        .line()
        .position('date_time*cpi')
        .color('#59d8a6').tooltip(false);

      chart.render();
      this.chart = chart;
    }
  }
};
</script>

<style lang="scss">
#CostCard {
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
