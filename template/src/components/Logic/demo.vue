<template>
  <div>
    <LogicGroup :value="apiGroup" operator="||" :scoped="scoped" @add="handleAdd" @on-change="handleChange" @remove="handleRemove">
    </LogicGroup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 组数据
      group: [],
      audiences: [],
      // audiences 受众列表查询参数的----范围
      scoped: {
        page_num: 1,
        page_size: 100000,
        status: 1,
        query_type: 0
      },
      apiGroup: [
        { audience_group: 0, group_operator: '||', id: 1 }
      ]
    };
  },
  methods: {
    handleChange(value) {
      console.log('////', value);
    },
    handleAdd(value) {
      console.log(value);
    },
    handleRemove(index, value) {
      // this.group.slice(index, 1);
      console.log(index, value);
    }
  }
};
</script>
<style lang="less" scoped></style>
