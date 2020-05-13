<template>
  <div>
    <div class="card-container filter-card-container">
      <Card :bordered="false" :dis-hover="true">
        <ListFilter ref="listFilter" :config="filterConfig" style="border-bottom: none;" @on-init="handleInit" @submit="filterSubmit"></ListFilter>
      </Card>
    </div>

    <div class="card-container">
      <Card :bordered="false" :dis-hover="true" title="优化师排名">
        <Operator ref="operatorTable" :filter-params="filterParams" :active-tab="activeTab" :table-height="mixTableHeight"></Operator>
      </Card>
    </div>

    <div class="card-container">
      <Card :bordered="false" :dis-hover="true" title="产品投放排名">
        <App ref="appTable" :filter-params="filterParams" :active-tab="activeTab" :table-height="mixTableHeight"></App>
      </Card>
    </div>

    <div class="card-container">
      <Card :bordered="false" :dis-hover="true" title="渠道投放排名">
        <Platform ref="platformTable" :filter-params="filterParams" :active-tab="activeTab" :table-height="mixTableHeight"></Platform>
      </Card>
    </div>
  </div>
</template>

<script>
import {
  getAdPlanList
} from '@/server/grow';
import {
  getPlatformPutinDict
} from '@/server/global';
import ListFilter from '@/components/common/ListFilter';
import mixGetTableHeight from '@/mixins/mixGetTableHeight.js';
import moment from 'moment';
import Operator from './Operator.vue';
import Platform from './Platform.vue';
import App from './App.vue';

export default {
  components: {
    ListFilter,
    Operator,
    Platform,
    App
  },
  mixins: [mixGetTableHeight],
  data() {
    return {
      activeTab: 0, // 0：国内，1：海外
      appOptions1: [], // 产品选项，国内
      appOptions2: [], // 产品选项，海外
      platformOptions: [], // 渠道(平台)选项
      filterParams: {} // 选择的查询条件
    };
  },
  // filterConfig和columns如果固定不变可以放在data里
  computed: {
    filterConfig() { // 筛选条件配置
      return [
        {
          key: 'dateTimes',
          label: '统计日期',
          type: 'datePicker',
          startKey: 'begin_time',
          endKey: 'end_time',
          params: {
            clearable: false,
            default: [
              moment(new Date().getTime() - 3600 * 1000 * 24 * 7).format('YYYY-MM-DD'),
              moment().format('YYYY-MM-DD')
            ],
            type: 'daterange',
            format: 'yyyy-MM-dd',
            options: {
              shortcuts: [
                {
                  text: '当天',
                  value: [new Date(), new Date()]
                },
                {
                  text: '最近一周',
                  value() {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    return [start, end];
                  }
                },
                {
                  text: '最近一个月',
                  value() {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    return [start, end];
                  }
                }
              ]
            }
          }
        },
        {
          key: 'platform_id',
          label: '渠道',
          type: 'select',
          options: this.platformOptions
        },
        {
          key: 'app_id',
          label: '产品',
          type: 'select',
          options: this.activeTab === 0 ? this.appOptions1 : this.appOptions2
        },
        {
          key: 'ad_operator_id',
          label: '优化师',
          type: 'dictSelect',
          dataType: this.activeTab === 0 ? 'ad_operator_0' : 'ad_operator_1',
          params: {
            filterable: true
          }
        },
        {
          key: 'ad_type',
          label: '广告类型',
          type: 'dictSelect',
          dataType: 'bizadtype',
          params: {
            multiple: true
          }
        }
      ];
    }
  },
  created() {
    this.getAppOptions();
    this.getPlatformOptions();
  },
  mounted() {
  },
  methods: {
    async getAppOptions() {
      getAdPlanList({ put_area: 1 }).then(({ data }) => {
        if (data.code === 0) {
          this.appOptions1 = data.data && data.data.length > 0 ?
          data.data.map(i => ({
            value: i.app_id,
            label: i.app_name
          })) : [];
        }
      });
      getAdPlanList({ put_area: 2 }).then(({ data }) => {
        if (data.code === 0) {
          this.appOptions2 = data.data && data.data.length > 0 ?
          data.data.map(i => ({
            value: i.app_id,
            label: i.app_name
          })) : [];
        }
      });
    },
    async getPlatformOptions() {
      const { data } = await getPlatformPutinDict({ is_overseas: 0 });
      if (data.code === 0) {
        this.platformOptions = data.data.items && data.data.items.length > 0 ?
          data.data.items.map(i => ({
            value: i.platform_code,
            label: i.platform_name
          })) : [];
      }
    },
    getListData() {
      this.$refs.operatorTable.pagination.pageNum = 1;
      this.$refs.operatorTable.getListData();
      this.$refs.appTable.pagination.pageNum = 1;
      this.$refs.appTable.getListData();
      this.$refs.platformTable.pagination.pageNum = 1;
      this.$refs.platformTable.getListData();
    },
    handleInit(filters) { // 初始默认值
      this.filterParams = filters;
      this.$nextTick(() => {
        this.getListData(); // 查询表格数据
      });
    },
    filterSubmit(filter) { // 点击 查询/重置 按钮
    this.pagination.pageNum = 1;
      this.filterParams = filter;
      this.$nextTick(() => {
        this.getListData(); // 查询表格数据
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .filter-card-container {
    :global(.ivu-card-body) {
      padding-bottom: 0;
    }
  }
</style>