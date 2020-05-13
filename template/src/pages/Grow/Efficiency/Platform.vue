<template>
  <div>
    <div class="list-table-container">
      <Table
        :columns="columns"
        :data="tableData"
        :height="tableHeight"
        :loading="loading"
        :row-class-name="rowClassName"
        @on-sort-change="handleSortChange"
      >
      </Table>
    </div>
    <div class="table-page-container">
      <Button size="small" @click="prePage">上一页</Button>
      <Button size="small" @click="nextPage">下一页</Button>
    </div>
  </div>
</template>

<script>
  import {
    getEfOperator,
    getEfPlatform
  } from '@/server/grow';
  export default {
    name: '',
    components: {
    },
    props: {
      tableHeight: {
        type: Number,
        default: 300
      },
      filterParams: {
        type: Object
      },
      activeTab: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        tableData: [], // 表格数据
        sortParams: {
          ad_avg_switch_sort: 0
        }, // 排序条件
        pagination: { // 页码配置
          pageNum: 1,
          pageSize: 20,
          total: 0
        },
        loading: false
      };
    },
    computed: {
      columns() { // 表格配置
        return [{
          title: ' ',
          key: 'expend',
          width: 40,
          render: (h, params) => {
            return params.row.isChild ? null : <div vOn:click={() => this.toggleExpend(params)} class="icon-container">
              <Icon type={params.row.expend === 'expend' ? 'ios-remove' : params.row.expend === 'loading' ? 'ios-loading' : 'ios-add'}></Icon>
            </div>;
          }
        }, {
          title: '渠道',
          key: 'platform_name',
          minWidth: 100
        },
        {
          title: '花费',
          key: 'ad_cost',
          sortable: 'custom',
          minWidth: 120,
          render: (h, params) => {
            return <span>&yen;{params.row.ad_cost}</span>;
          }
        },
        {
          title: '收益',
          key: 'ad_income',
          sortable: 'custom',
          minWidth: 120,
          render: (h, params) => {
            return <span>&yen;{params.row.ad_income}</span>;
          }
        },
        {
          title: '收益占比',
          key: 'ad_income_ratio',
          sortable: 'custom',
          minWidth: 120,
          render: (h, params) => {
            return <span>{params.row.ad_income_ratio}%</span>;
          }
        },
        {
          title: 'ROI',
          key: 'roi',
          sortable: 'custom',
          minWidth: 80
        },
        {
          title: '新增用户',
          key: 'cpc_bid',
          sortable: 'custom',
          minWidth: 120
        },
        {
          title: 'CPI',
          key: 'cpi',
          sortable: 'custom',
          minWidth: 80
        },
        {
          title: '人均广告触发次数',
          key: 'ad_avg_switch',
          sortable: 'custom',
          sortType: 'desc',
          width: 160
        },
        {
          title: '人均展示次数',
          key: 'aipu',
          sortable: 'custom',
          minWidth: 140
        },
        {
          title: 'ARPU',
          key: 'arpu',
          sortable: 'custom',
          minWidth: 100
        }];
      }
    },
    methods: {
      prePage() {
        if (this.pagination.pageNum > 1) {
          this.pagination.pageNum = this.pagination.pageNum - 1;
          this.getListData();
        }
      },
      nextPage() {
        this.pagination.pageNum = this.pagination.pageNum + 1;
        this.getListData();
      },
      rowClassName (row, index) {
        if (row.pId) {
            return 'child-table-info-row';
        }
        return '';
      },
      async toggleExpend(params) { // 展开收缩
        if (params.row.expend === 'expend') { // 收缩
          this.tableData = this.tableData.filter(obj => obj.pId !== params.row.platform_id);
          this.$set(this.tableData[params.index], 'expend', '');
        } else if (params.row.expend === 'loading') {
          return false;
        } else { // 展开
          this.$set(this.tableData[params.index], 'expend', 'loading');
          const requestParams = {
            page_num: 1,
            page_size: 9999,
            is_overseas: this.activeTab,
            ...this.filterParams,
            ...this.sortParams,
            platform_id: params.row.platform_id
          };
          const result = await getEfOperator(requestParams);
          const { data } = result;
          if (data.code === 0) {
            this.tableData.splice(params.index + 1, 0, ...data.data.items.map(item => ({
              ...item,
              platform_name: item.ad_operator,
              isChild: true,
              pId: params.row.platform_id
            })));
          }
          this.$set(this.tableData[params.index], 'expend', 'expend');
        }
      },
      handleSortChange({ column, key, order }) { // 排序
        const sortParams = {};
        if (order !== 'normal') {
          sortParams[`${key}_sort`] = order === 'desc' ? 0 : 1;
        }
        this.sortParams = sortParams;
        this.getListData();
      },
      async getListData() { // 查询列表接口
        this.loading = true;
        const requestParams = {
          page_num: this.pagination.pageNum,
          page_size: this.pagination.pageSize,
          is_overseas: this.activeTab,
          ...this.filterParams,
          ...this.sortParams
        };
        const result = await getEfPlatform(requestParams);
        const { data } = result;
        if (data.code === 0 && data.data && data.data.items) {
          this.tableData = data.data.items;
          this.pagination.total = parseInt(data.data.total_count);
        }
        this.loading = false;
      }
    }
  };
</script>

<style lang="less" scoped>
  @import '../../../assets/lib/custom.less';
  .list-table-container {
    :global(.icon-container) {
      display: flex;
      border: 1px solid #ddd;
      width: 16px;
      height: 16px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all .3s;
    }
    :global(.icon-container:hover) {
      color: @primary-color;
      border-color: @link-hover-color;
    }
    :global(.child-table-info-row td) {
      background: @table-td-stripe-bg;
    }
  }
</style>