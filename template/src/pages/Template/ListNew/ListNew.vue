<template>
  <div>
    <Card :bordered="false" :dis-hover="true">
      <ListFilter ref="listFilter" :config="filterConfig" @submit="filterSubmit"></ListFilter>
      <div class="common-list-btn-container">
        <Button type="primary" icon="md-add" @click="handleAdd">新建</Button>
      </div>
      <ListTable ref="listTable" :sub-columns="subColumns" :columns="columns" :data="data" :pagination.sync="pagination" :loading="loading" @change="tableChange"></ListTable>
    </Card>
  </div>
</template>
<script>
import ListFilter from '@/components/common/ListFilter';
import ListTable from '@/components/common/ListTable';
import { getAbMeticulous, putAbMeticulousStateById } from '@/server/ab';
import { Poptip } from 'view-design';

export default {
  components: {
    Poptip, // eslint-disable-line
    ListFilter,
    ListTable,
  },
  data() {
    return {
      statusMap: {
        // 状态
        0: '草稿',
        1: '已开启',
        2: '已关闭',
      },
      filterParams: {}, // 选择的查询条件
      subColumns: [
        {
          title: '受众ID',
          key: 'audienceId',
          span: 6,
          render: (h, value, record) => {
            return <span>{record.audience.id}</span>;
          },
        },
        {
          title: '受众名称',
          key: 'audienceName',
          span: 10,
          render: (h, value, record) => {
            return <span>{record.audience.ac_name}</span>;
          },
        },
        {
          title: '应用',
          key: 'app_name',
          span: 5,
        },
        {
          title: '状态',
          key: 'status',
          span: 3,
          align: 'right',
          render: (h, value, record) => {
            return <span>{this.statusMap[value]}</span>;
          },
        },
      ], // 表格子列配置
      columns: [
        {
          title: '方案名称',
          key: 'met_name',
          span: 4,
        },
        {
          title: '受众条件',
          key: 'rule_name',
          span: 6,
          render: (h, value, record, index) => {
            const ruleName = record.audience && record.audience.rule_name;
            return ruleName ? (
              <div>
                <span>{ruleName.length <= 150 || this.data[index].showMoreText ? ruleName : ruleName.slice(0, 150) + '...'}</span>
                {ruleName.length > 150 || this.data[index].showMoreText ? (
                  <div style={{ textAlign: 'right' }}>
                    <a
                      v-on:click={() => {
                        this.$set(this.data[index], 'showMoreText', !this.data[index].showMoreText);
                      }}
                    >
                      {this.data[index].showMoreText ? '收起' : '展开'}
                    </a>
                  </div>
                ) : null}
              </div>
            ) : null;
          },
        },
        {
          title: '策略',
          key: 'strategies',
          span: 6,
          render: (h, value, record, i) => {
            return (
              <div>
                <List size='small' item-layout='vertical'>
                  <ListItem style='align-items: center;'>
                    <div>{value[0].version.id}</div>
                    <div slot='extra' style='text-align: right;'>
                      {value[0].group.map((item, index) => (index < 2 || this.data[i].showMore ? <div key={item.id}>{item.strategy_name}</div> : null))}
                      {value[0].group.length > 2 ? (
                        <div
                          style={{
                            textAlign: 'right',
                          }}
                        >
                          <a
                            v-on:click={() => {
                              this.$set(this.data[i], 'showMore', !this.data[i].showMore);
                            }}
                          >
                            {this.data[i].showMore ? '收起' : '展开'}
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </ListItem>
                </List>
              </div>
            );
          },
        },
        {
          title: '时间',
          key: 'time',
          span: 5,
          render: (h, value, record) => {
            return (
              <div>
                <p>
                  创建时间：
                  {record.create_time}
                </p>
                <p>
                  更新时间：
                  {record.update_time}
                </p>
              </div>
            );
          },
        },
        {
          title: '操作',
          key: 'operate',
          span: 3,
          render: (h, value, record) => {
            return (
              <div>
                <div>
                  <a
                    onClick={() => {
                      this.$router.push(`/strategy/meticulous/detail?id=${record.id}`);
                    }}
                  >
                    编辑
                  </a>
                  <Divider type='vertical' />
                  <a
                    onClick={() => {
                      this.$router.push(`/strategy/meticulous/add?copy=${record.id}`);
                    }}
                  >
                    复制
                  </a>
                </div>
                <div>
                  <Poptip
                    placement='left'
                    confirm
                    title={`确定将该方案${record.status === 0 || record.status === 2 ? '开启' : '关闭'}吗？`}
                    vOn:on-ok={() => {
                      this.switchStatus(record);
                    }}
                  >
                    <a>{record.status === 0 || record.status === 2 ? '开启' : '关闭'}</a>
                  </Poptip>
                  <Divider type='vertical' />
                  <a>日志</a>
                </div>
              </div>
            );
          },
        },
      ], // 表格列配置
      data: [], // 表格数据
      pagination: {
        pageNum: 1, // 页码
        pageSize: 20, // 每页大小
        total: 0, // 全部数据条数
      },
      loading: false,
    };
  },
  computed: {
    filterConfig() {
      const statusOptions = [];
      for (const key in this.statusMap) {
        statusOptions.push({
          label: this.statusMap[key],
          value: key,
        });
      }
      return [
        {
          key: 'audience_name',
          label: '受众名称',
          type: 'input',
        },
        {
          key: 'status',
          label: '状态',
          type: 'select',
          options: statusOptions,
        },
        {
          key: 'updateTimes',
          label: '更新时间',
          type: 'datePicker',
          startKey: 'update_time_start',
          endKey: 'update_time_end',
        },
        {
          key: 'createTimes',
          label: '创建时间',
          type: 'datePicker',
          startKey: 'create_time_start',
          endKey: 'create_time_end',
        },
      ]; // 查询条件配置
    },
  },
  created() {},
  mounted() {
    this.getListData();
  },
  methods: {
    async switchStatus(record) {
      // 开启、关闭
      this.loading = true;
      const { data } = await putAbMeticulousStateById(record);
      if (data.code === 0) {
        this.$Message.success('操作成功');
        this.getListData();
      } else {
        this.loading = false;
      }
    },
    handleAdd() {
      // 新增
      this.$router.push({
        path: '/template/detail',
      });
    },
    filterSubmit(filter) {
      // 点击 查询/重置 按钮
      this.pagination.pageNum = 1;
      this.filterParams = filter;
      this.getListData();
    },
    tableChange() {
      this.getListData();
    },
    async getListData() {
      // 查询列表接口
      const requestParams = {
        page_num: this.pagination.pageNum,
        page_size: this.pagination.pageSize,
        ...this.filterParams,
      };
      this.loading = true;
      const { data } = await getAbMeticulous(requestParams);
      if (data.code === 0) {
        this.data = data.data.items;
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
<style lang="less" scoped></style>
