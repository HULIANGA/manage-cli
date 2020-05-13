<template>
  <div>
    <Card :bordered="false" :dis-hover="true">
      <ListFilter ref="listFilter" :config="filterConfig" @submit="filterSubmit"></ListFilter>

      <div class="common-list-btn-container">
        <Button v-zzm-auth="'growService:auth:add'" type="primary" icon="md-add" @click="handleAdd">新建</Button>
      </div>

      <div class="list-table-container">
        <Spin v-show="loading" fix></Spin>

        <Table
          :columns="columns"
          :data="tableData"
          :height="mixTableHeight"
        >
          <template slot="status" slot-scope="{ row }">
            <Badge v-if="row.status === 0" status="error" text="未授权" />
            <Badge v-if="row.status === 1" status="success" text="授权成功" />
            <Badge v-if="row.status === 2" status="default" text="暂停" />
          </template>
          <template
            slot="action"
            slot-scope="{ row }"
          >
            <div>
              <a v-if="row.status === 0" v-zzm-auth="'growService:auth:edit'" @click="handleEdit(row)">编辑</a>
              <a v-else v-zzm-auth="'growService:auth:reAuth'" @click="handleReAuth(row.ad_account_id)">重新授权</a>
              <Divider type="vertical" />
              <a v-zzm-auth="'growService:auth:log'" @click="handleLog(row.id)">日志</a>
            </div>
            <Poptip
              v-if="row.status === 1"
              confirm
              transfer
              width="250"
              title="暂停授权将不再拉取广告数据，确定暂定该帐号的授权吗？"
              @on-ok="handlePause(row)"
            >
              <a>暂停</a>
            </Poptip>
          </template>
        </Table>
      </div>
      <div class="table-page-container">
        <Page
          :pagination.sync="pagination"
          @on-change="handlePageChange"
        />
      </div>
    </Card>
    <LogModal :visible.sync="logVisible" :auth-id="curId"></LogModal>
    <EditModal :visible.sync="editVisible" :auth-id="curId" :form-data="curAuthData" @on-success="handleModalSuccess"></EditModal>
    <Modal
      v-model="resultModal"
      :closable="false"
      :mask-closable="false"
      :footer-hide="true"
    >
      <Result
        title="提交成功"
        sub-title="您已提交授权，请确认是否已同意授权并授权成功"
        :confirm-btn-cbk="() => { resultModal = false;getListData() }"
        :cancel-btn-cbk="() => { resultModal = false;getListData() }"
        cancel-btn="未授权"
        confirm-btn="授权成功"
      ></Result>
    </Modal>
  </div>
</template>

<script>
import {
  getAuthList,
  postPauseAuth
} from '@/server/grow';
import {
  getPutin
} from '@/server/product';

import ListFilter from '@/components/common/ListFilter';
import mixGetTableHeight from '@/mixins/mixGetTableHeight.js';
import Page from '@/components/Page.vue';
import Result from '@/components/common/Result';
import LogModal from './LogModal.vue';
import EditModal from './EditModal.vue';
import {
  Spin,
  Poptip,
  Badge
} from 'view-design';

export default {
  components: {
    ListFilter,
    Page,
    Spin,
    Poptip,
    Badge,
    LogModal,
    EditModal,
    Result
  },
  mixins: [mixGetTableHeight],
  data() {
    return {
      resultModal: false,
      putInOptions: [],
      tableData: [], // 表格数据
      filterParams: {}, // 选择的查询条件
      pagination: { // 页码配置
        pageNum: 1,
        pageSize: 20,
        total: 0
      },
      loading: false,
      logVisible: false,
      curId: '',
      editVisible: false,
      curAuthData: {}
    };
  },
  // filterConfig和columns如果固定不变可以放在data里
  computed: {
    filterConfig() { // 筛选条件配置
      return [{
        key: 'platform_id',
        label: '平台',
        type: 'select',
        options: this.putInOptions,
        params: {
          filterable: true
        }
      }, {
        key: 'ad_account_id',
        label: '帐号ID',
        type: 'input'
      }, {
        key: 'ad_account_name',
        label: '帐号名称',
        type: 'input'
      }, {
        key: 'status',
        label: '账号状态',
        type: 'select',
        options: [{
          label: '授权成功',
          value: 1
        }, {
          label: '未授权',
          value: 0
        }, {
          label: '暂停',
          value: 2
        }]
      }];
    },
    columns() { // 表格配置
      return [{
        title: '平台',
        key: 'platform_name',
        minWidth: 100
      },
      {
        title: '账号ID',
        key: 'ad_account_id',
        minWidth: 120
      },
      {
        title: '账号名称',
        key: 'ad_account_name',
        minWidth: 120
      },
      {
        title: '状态',
        key: 'status',
        slot: 'status',
        minWidth: 120
      },
      {
        title: '操作',
        key: 'action',
        slot: 'action',
        width: 140
      }];
    }
  },
  created() {
    this.getPutinOptions();
  },
  mounted() {
    this.getListData(); // 查询表格数据
  },
  methods: {
    handleReAuth(id) {
      this.goAuth(1, id);
    },
    handleLog(id) {
      this.curId = id;
      this.logVisible = true;
    },
    async getPutinOptions() { // 平台选项
      const { data } = await getPutin({
        page_num: 1,
        page_size: 9999
      });
      if (data.code === 0) {
        this.putInOptions = data.data.items.map(obj => ({
          label: obj.platform_name,
          value: obj.id
        }));
      }
    },
    async handlePause(row) { // 暂停
      this.loading = true;
      const { data } = await postPauseAuth({
        id: row.id
      });
      if (data.code === 0) {
        this.getListData();
      } else {
        this.loading = false;
      }
    },
    handleModalSuccess(type, id) { // 新增、编辑成功
      this.goAuth(0, id);
      this.getListData();
    },
    handlePageChange() { // 分页变化
      this.getListData();
    },
    goAuth(retury = 0, id) { // 跳转前往授权，retury：1 重新授权，0 非重新授权
      this.resultModal = true;
      const appId = '1659125043356750';
      const redirectUri = `${window.location.origin}/grow/authCode`;
      window.open(`https://ad.oceanengine.com/openapi/audit/oauth.html?app_id=${appId}&state=${retury},${id}&redirect_uri=${redirectUri}`);
    },
    filterSubmit(filter) { // 点击 查询/重置 按钮
    this.pagination.pageNum = 1;
      this.filterParams = filter;
      this.getListData();
    },
    handleAdd() { // 新增
      this.editVisible = true;
      this.curId = '';
    },
    handleEdit(row) { // 编辑
      this.curId = row.id;
      this.curAuthData = row;
      this.editVisible = true;
    },
    async getListData() { // 查询列表接口
      const requestParams = {
        page_num: this.pagination.pageNum,
        page_size: this.pagination.pageSize,
        ...this.filterParams
      };
      this.loading = true;
      const result = await getAuthList(requestParams);
      const { data } = result;
      if (data.code === 0) {
        this.tableData = data.data.items;
        this.pagination.total = parseInt(data.data.total_count);
      }
      this.loading = false;
    },
    keepAliveRefresh() { // 刷新keepalive缓存
      this.pagination.pageNum = 1;
      this.$refs.listFilter.handleReset();
    }
  }
};
</script>