<template>
  <Card id="ConversionCard">
    <p slot="title">转化概览</p>
    <vue-lazy-component @init="showChart">
      <Row
        :gutter="16"
        type="flex"
        justify="space-around"
        style="margin-top: 8px;margin-bottom: 24px;"
      >
        <Col :span="6">
          <div>
            <div class="card-title">点击数</div>
            <div class="card-count">{{ total.ad_click }}</div>
          </div>
        </Col>
        <Col :span="6">
          <div class="card-title">激活数</div>
          <div class="card-count">{{ total.ad_install }}</div>
        </Col>
        <Col :span="6">
          <div class="card-title">转化率</div>
          <div class="card-count">{{ total.cvr }}%</div>
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
      <div
        v-show="active === 1"
        id="container"
        style="margin:20px 10px 10px;min-height: 300px"
      >
        <div id="conversion-chart"></div>
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
import { getOVConversion } from '@/server/grow';
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
        container: 'conversion-chart',
        autoFit: true,
        padding: 0,
        height: 400
      },
      loading: false,
      isShow: false,
      active: 1,
      chart: null,
      total: {
        ad_click: '···',
        ad_install: '···',
        cvr: '···'
      },
      data: [],
      tableData: [],
      columns: [
        {
          title: '日期',
          key: 'date_time'
        },
        {
          title: '点击数',
          key: 'ad_click'
        },
        {
          title: '激活数',
          key: 'ad_install'
        },
        {
          title: '转化率',
          key: 'cvr'
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
      const { data } = await getOVConversion(this.params);
      if (data.code === 0) {
        this.data = data.data.items ? data.data.items.map(item => {
          var array = [];
          for (const key in item) {
            array.push(item[key]);
          }
          return array;
        }) : [];
        this.tableData = data.data.items ? data.data.items.map(item => ({
          date_time: item.date_time,
          ad_click: parseInt(item.ad_click),
          ad_install: parseInt(item.ad_install),
          cvr: (item.cvr * 100).toFixed(2) + '%'
        })) : [];
        this.total = {
          ad_click: data.data.ad_click ? parseInt(data.data.ad_click) : '···',
          ad_install: data.data.ad_install ? parseInt(data.data.ad_install) : '···',
          cvr: data.data.cvr || '···'
        };
      }
      this.loading = false;
      this.initConversionCart();
    },
    // 分组双轴图的数据转换
    transformData2Dodge(data) {
      var res = [];
      data &&
        data.forEach(i => {
          const date = this.params.begin_time === this.params.end_time ? (`${this.params.begin_time} ${i[0]}:00`) : i[0];
          res.push({
            date,
            type: i[0],
            name: '点击数',
            count: Number(i[1] || 0),
            ratio: Math.floor((i[3] || 0) * 10000) / 100
          });
          res.push({
            date,
            type: i[0],
            name: '激活数',
            count: Number(i[2] || 0),
            ratio: Math.floor((i[3] || 0) * 10000) / 100
          });
        });
      return res;
    },
    initConversionCart() {
      var data = this.data;
      var conversionChart = this.chart || new Chart({
        container: 'conversion-chart',
        autoFit: true,
        height: 300
      });
      conversionChart.data(this.transformData2Dodge(data));
      conversionChart.scale({
        count: {
          alias: '点击/激活',
          min: 0,
          nice: true
        },
        ratio: {
          alias: '转化率',
          min: 0
        },
        type: {
          type: 'cat'
        }
      });
      conversionChart.legend({
        custom: true,
        items: [
          { value: 'impressions', name: '点击数', marker: { symbol: 'square', style: { fill: '#5c90f9', r: 5 } } },
          { value: 'cliks', name: '激活数', marker: { symbol: 'square', style: { fill: '#5bd8a7', r: 5 } } },
          { value: 'ctr', name: '点击率', marker: { symbol: 'square', style: { fill: '#e86553', r: 5 } } }
        ]
      });
      conversionChart.removeInteraction('legend-filter'); // 自定义图例，移除默认的分类图例筛选交互
      conversionChart.tooltip({
        shared: true,
        title: 'date',
        itemTpl: `
          <li class="g2-tooltip-list-item">
            <span style="background-color:{color};" class="g2-tooltip-marker"></span>
            <span class="g2-tooltip-name">{name}</span>:<span class="g2-tooltip-value">{value}</span>
          </li>
        `
      });
      conversionChart.axis('count', {
        title: {}
      });
      conversionChart.axis('ratio', {
        grid: null,
        title: {},
        label: {
          formatter: val => {
            return val + ' %';
          }
        }
      });
      conversionChart
        .interval()
        .position('type*count')
        .color('name')
        .adjust([
          {
            type: 'stack'
          }
        ]).tooltip('name*count', (name, value) => {
          return {
            name,
            value
          };
        });
      conversionChart.line().position('type*ratio').color('#e86553')
        .tooltip('ratio', (ratio) => {
          return {
            name: '转化率',
            value: ratio + '%'
          };
        });
      conversionChart
        .point()
        .position('type*ratio')
        .shape('circle').color('#e86553').tooltip('ratio', (ratio) => {
          return {
            name: '点击率',
            value: ratio + '%'
          };
        });
      conversionChart.interaction('active-region');
      conversionChart.render();
      this.chart = conversionChart;
    }
  }
};
</script>

<style lang="scss">
#ConversionCard {
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
