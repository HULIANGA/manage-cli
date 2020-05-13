<template>
  <div>
    <h3>常用指令/常用format</h3>
    <div v-zzm-ellip="{width:'100px',line: 1}">文本超出省略文本超出省略文本超出省略文本超出省略</div>
    <div v-zzm-ellip="{width:'100px',line: 2}">文本超出省略文本超出省略文本超出省略文本超出省略</div>
    <div v-zzm-copy style="cursor:pointer;">文本复制不需要传参数</div>
    <div>
      文本复制传参数
      <Icon type="md-albums" v-zzm-copy="'复制传参数'" style="cursor:pointer;" />
    </div>
    <dictionarySelect filterable v-model="value" @on-change="onChange" dataType="agents"></dictionarySelect>
    <dictionarySelect v-model="value" @on-change="onChange" dataType="business"></dictionarySelect>
    <div v-zzm-auth="3">Store.state.app.auth查看权限 {{auth}}</div>
    <div v-zzm-auth="5">无权限查看 {{auth}}</div>
    <div>1570272036000时间搓数据转换：{{1570272036000|zzmDateFormat}}</div>
    <div>2019-10-05 18:10:00时间转换YYYY-MM-DD：{{'2019-10-05 18:10:00'|zzmDateFormat('YYYY-MM-DD')}}</div>
    <div>3400004000数据转换： {{zzmFormatNumerMethod(3400004000)}}</div>
    <div>120000000filters数据转换： {{'120000000'|zzmFormatNumer}}</div>
    <div>1234567890数据转换： {{1234567890|zzmSymbolNumber(2,',')}}</div>
    <div>1234567890.345678数据转换： {{1234567890.345678|zzmSymbolNumber(3,',')}}</div>
  </div>
</template>
 
<script>
export default {
    data() {
        return {
            auth: this.$store.state.app.auth,
            types: [1],
            value: '',
        };
    },
    created() {},
    methods: {
      onChange (value) {
        console.log('chamhe', value)
      }
    }
};
</script>
<style lang="less" scoped>
div {
    line-height: 30px;
}
</style>
