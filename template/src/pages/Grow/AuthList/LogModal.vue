<template>
  <Modal
    v-model="value"
    title="日志"
    @on-visible-change="handleVisible"
  >
    <Spin v-show="loading" fix></Spin>
    <Table
      :columns="columns"
      :data="tableData"
    >
    </Table>
    <div class="table-page-container">
      <Page
        :pagination.sync="pagination"
        @on-change="handlePageChange"
      />
    </div>
  </Modal>
</template>

<script>
  import {
    Spin
  } from 'view-design';
  import Page from '@/components/Page.vue';
  import { getLogByAuthId } from '@/server/grow';

  export default {
    name: '',
    components: {
      Spin,
      Page
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      authId: {
        type: String
      }
    },
    data() {
      return {
        loading: false,
        tableData: [],
        columns: [{
          title: '内容',
          key: 'log_content',
          minWidth: 200
        }, {
          title: '操作人',
          key: 'operator',
          minWidth: 100
        }, {
          title: '时间',
          key: 'create_time',
          width: 160
        }],
        pagination: { // 页码配置
          pageNum: 1,
          pageSize: 20,
          total: 0
        }
      };
    },
    computed: {
      value: {
        get() {
          return this.visible;
        },
        set(val) {
          this.$emit('update:visible', val);
        }
      }
    },
    methods: {
      async getListData() {
        this.loading = true;
        const result = await getLogByAuthId(this.authId, {
          page_num: this.pagination.pageNum,
          page_size: this.pagination.pageSize
        });
        const { data } = result;
        if (data.code === 0) {
          this.tableData = data.data.items;
          this.pagination.total = parseInt(data.data.total_count);
        }
        this.loading = false;
      },
      handleVisible(value) {
        if (value) {
          this.pagination.pageNum = 1;
          this.getListData();
        } else {
          this.loading = false;
        }
      },
      handlePageChange() {
        this.getListData();
      }
    }
  };
</script>

<style lang="less" scoped></style>