<template>
  <Card :bordered="false" :dis-hover="true">
    <Result :type="type" :title="title" :sub-title="subTitle"
      :cancel-btn-cbk="closePage"
      cancel-btn="返回"
    ></Result>
  </Card>
</template>

<script>
  import Result from '@/components/common/Result';
  import { postAuth } from '@/server/grow';
  export default {
    name: '',
    components: {
      Result
    },
    data() {
      return {
        type: 'loading',
        title: '授权中',
        subTitle: '正在授权，请稍后...',
        authCode: ''
      };
    },
    created() {
    },
    mounted() {
      this.authCode = this.$route.query.auth_code;
      this.state = this.$route.query.state;
      this.postAuth();
    },
    methods: {
      closePage() {
        window.close();
      },
      async postAuth() {
        const state = this.state.split(',');
        const { data } = await postAuth({ auth_code: this.authCode, retry: state[0] === '1', ad_account_id: state[1] });
        if (data.code === 0) {
          this.type = 'success';
          this.title = '授权成功';
          this.subTitle = '授权成功，3秒后自动关闭此页面';
          setTimeout(() => {
            window.close();
          }, 3000);
        } else {
          this.type = 'fail';
          this.title = '授权失败';
          this.subTitle = data.msg;
        }
      }
    }
  };
</script>

<style lang="less" scoped></style>