<template>
  <div>
    <Card :bordered="false" :dis-hover="true">
      <ListFilter ref="listFilter" :config="filterConfig" @submit="filterSubmit"></ListFilter>

      <div class="common-list-btn-container">
        <Button type="primary" icon="md-add" @click="handleAdd">新建</Button>
      </div>

      <div class="list-table-container">
        <Table :columns="columns" :data="tableData" :height="mixTableHeight" :loading="loading">
          <template slot="status" slot-scope="{ row, index }">
            <Poptip confirm :title="row.is_enable === 1 ? '该账号在使用中，确认将其关闭吗？关闭后将对该账号的数据不再爬取处理。' : '该账号已停止使用，确认将其重新开启吗？开启后将对该账号的数据进行拉取处理。'" @on-ok="handleSwitch(index)">
              <i-Switch v-model="tableData[index].is_enable" size="large" :before-change="handleBeforeSwitch" :true-value="1" :false-value="0">
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
              </i-Switch>
            </Poptip>
          </template>
          <template slot="action" slot-scope="{ row }">
            <a @click="handleEdit(row.id)">编辑</a>
            <Divider type="vertical" />
            <a @click="showModal()">弹窗</a>
          </template>
        </Table>
      </div>
      <div class="table-page-container">
        <Page :pagination.sync="pagination" @on-change="handlePageChange" />
      </div>
    </Card>
    <MyModal :visible.sync="modalVisible"></MyModal>
  </div>
</template>

<script>
import { getAccount, putAccountStatus } from '@/server/product';
import ListFilter from '@/components/common/ListFilter';
import mixGetTableHeight from '@/mixins/mixGetTableHeight.js';
import MyModal from './Modal.vue';
import Page from '@/components/Page.vue';
import { Switch, Poptip } from 'view-design';

export default {
  components: {
    ListFilter,
    Page,
    'i-Switch': Switch,
    Poptip,
    MyModal,
  },
  mixins: [mixGetTableHeight],
  data() {
    return {
      tableData: [], // 表格数据
      filterParams: {}, // 选择的查询条件
      pagination: {
        // 页码配置
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
      loading: false,
      modalVisible: false,
    };
  },
  // filterConfig和columns如果固定不变可以放在data里
  computed: {
    filterConfig() {
      // 筛选条件配置
      return [
        {
          key: 'account_name',
          label: '账号名称',
          type: 'input',
        },
        {
          key: 'is_enable',
          label: '账号状态',
          type: 'select',
          options: [
            {
              label: '开启',
              value: 1,
            },
            {
              label: '关闭',
              value: 0,
            },
          ],
        },
        {
          key: 'test_dict1',
          label: '数据字典',
          type: 'dictSelect',
          dataType: 'agents',
          params: {
            multiple: true,
          },
        },
      ];
    },
    columns() {
      // 表格配置
      return [
        {
          title: '账号ID',
          key: 'id',
          minWidth: 100,
        },
        {
          title: '账号名称',
          key: 'account_name',
          minWidth: 120,
        },
        {
          title: '关联平台',
          key: 'platform_name',
          minWidth: 120,
        },
        {
          title: '关联产品',
          key: 'app_name',
          minWidth: 120,
        },
        {
          title: '状态',
          key: 'is_enable',
          slot: 'status',
          width: 100,
        },
        {
          title: '操作',
          key: 'action',
          slot: 'action',
          width: 120,
        },
      ];
    },
  },
  created() {},
  mounted() {
    this.getListData(); // 查询表格数据
  },
  methods: {
    showModal() {
      this.modalVisible = true;
    },
    async handleSwitch(index) {
      // 修改状态
      const isEnabled = this.tableData[index].is_enable === 1 ? 0 : 1;
      this.loading = true;
      const { data } = await putAccountStatus({
        ...this.tableData[index],
        is_enable: isEnabled,
      });
      if (data.code === 0) {
        this.tableData[index].is_enable = isEnabled;
      }
      this.loading = false;
    },
    handleBeforeSwitch() {
      // 阻止开关切换
      return new Promise((resolve) => {});
    },
    handlePageChange() {
      // 分页变化
      this.getListData();
    },
    filterSubmit(filter) {
      // 点击 查询/重置 按钮
      this.pagination.pageNum = 1;
      this.filterParams = filter;
      this.getListData();
    },
    handleAdd() {
      // 新增跳转
      this.$router.push('./detailStep');
    },
    handleEdit(id) {
      // 编辑跳转
      this.$router.push('./detailStep?id=' + id);
    },
    async getListData() {
      // 查询列表接口
      const requestParams = {
        page_num: this.pagination.pageNum,
        page_size: this.pagination.pageSize,
        account_type: 1,
        ...this.filterParams,
      };
      this.loading = true;
      const result = await getAccount(requestParams);
      const { data } = result;
      if (data.code === 0) {
        this.tableData = data.data.items;
        this.pagination.total = parseInt(data.data.total_count);
      }
      this.loading = false;
    },
    keepAliveRefresh() {
      // 刷新keepalive缓存
      this.pagination.pageNum = 1;
      this.$refs.listFilter.handleReset();
    },
  },
};
</script>
