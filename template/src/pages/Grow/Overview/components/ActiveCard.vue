<template>
  <Card id="CostCard">
    <p slot="title">激活概览</p>
    <Row
      :gutter="16"
      type="flex"
      justify="space-around"
      style="margin-top: 8px;margin-bottom: 24px;"
    >
      <Col :span="6">
        <div>
          <div class="card-title">激活数</div>
          <div class="card-count">{{ total.ad_install }}</div>
        </div>
      </Col>
      <Col :span="6">
        <div class="card-title">推广量</div>
        <div class="card-count">{{ total.cost_num }}</div>
      </Col>
      <Col :span="6">
        <div class="card-title">自然量</div>
        <div class="card-count">{{ total.natural_num }}</div>
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
        <div id="active-chart"></div>
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
import { getOVInstall } from '@/server/grow';
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
      total: {
        ad_install: '···',
        cost_num: '···',
        natural_num: '···'
      },
      data: [],
      tableData: [],
      columns: [
        {
          title: '日期',
          key: 'date_time'
        },
        {
          title: '激活数',
          key: 'ad_install'
        },
        {
          title: '推广量',
          key: 'cost_num'
        },
        {
          title: '自然量',
          key: 'natural_num'
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
      const { data } = await getOVInstall(this.params);
      if (data.code === 0) {
        this.data = data.data.items || [];
        this.tableData = data.data.items ? data.data.items.map(item => ({
          date_time: item.date_time,
          ad_install: parseInt(item.ad_install),
          cost_num: parseInt(item.cost_num),
          natural_num: parseInt(item.natural_num)
        })) : [];
        this.total = {
          ad_install: data.data.ad_install ? parseInt(data.data.ad_install) : '···',
          cost_num: data.data.cost_num ? parseInt(data.data.cost_num) : '···',
          natural_num: data.data.natural_num ? parseInt(data.data.natural_num) : '···'
        };
      }
      this.loading = false;
      this.initActiveCart();
    },
    initActiveCart() {
      const data = [];
      this.data.forEach(item => {
        const date = this.params.begin_time === this.params.end_time ? (`${this.params.begin_time} ${item.date_time}:00`) : item.date_time;
        data.push({
          date,
          type: '推广量',
          value: parseInt(item.cost_num),
          date_time: item.date_time
        });
        data.push({
          date,
          type: '自然量',
          value: parseInt(item.natural_num),
          date_time: item.date_time
        });
      });
      const chart = this.chart || new Chart({
        container: 'active-chart',
        autoFit: true,
        height: 300
      });

      chart.data(data);
      chart.scale({
        value: {
          nice: true
        },
        date_time: {
          type: 'cat'
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
          { value: '推广量', name: '推广量', marker: { symbol: 'square', style: { fill: '#5c90f9', r: 5 } } },
          { value: '自然量', name: '自然量', marker: { symbol: 'square', style: { fill: '#5bd8a7', r: 5 } } }
        ]
      });
      chart.removeInteraction('legend-filter'); // 自定义图例，移除默认的分类图例筛选交互

      chart
        .area()
        .adjust('stack')
        .position('date_time*value')
        .color('type')
        .shape('smooth');
      chart
        .line()
        .adjust('stack')
        .position('date_time*value')
        .color('type')
        .shape('smooth');
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
