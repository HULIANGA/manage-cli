<template>
  <div class="login-container">
    <div class="login-content">
      <div class="logo-wrap">
        <img src="../../assets/images/logo/text-logo.png" alt="方舟" />
      </div>
      <Resut v-show="loginType === 'code'" :type="authResult" :title="authTitle" :confirm-btn="confirmBtn" :confirm-btn-cbk="reloadPage"></Resut>
      <Form v-show="loginType !== 'code'" ref="loginForm" :model="loginFormData" :rules="loginFormRules">
        <template v-if="loginType === 'developer'">
          <FormItem prop="login_name">
            <Input v-model="loginFormData.login_name" prefix="ios-contact-outline" type="text" placeholder="用户名" size="large" clearable />
          </FormItem>
          <FormItem prop="password">
            <Input v-model="loginFormData.password" prefix="ios-lock-outline" type="password" placeholder="密码" size="large" clearable />
          </FormItem>
          <FormItem>
            <Button size="large" type="primary" long @click="handleSubmit">登录</Button>
          </FormItem>
        </template>
        <div v-show="loginType === 'wechat'" id="wechatQrCode"></div>
        <a
          v-if="loginType === 'wechat'"
          @click="
            () => {
              loginType = 'developer';
            }
          "
          >开发者使用账号密码登录</a>
        <a
          v-else-if="loginType === 'developer'"
          @click="
            () => {
              loginType = 'wechat';
            }
          "
          >员工使用企业微信扫码登录</a>
      </Form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import { loginByWechat, getUserPermissionById } from '@/server/permission';
import Resut from '@/components/common/Result';

export default {
  components: {
    Resut
  },
  data() {
    return {
      authResult: 'loading',
      authTitle: '登录中',
      confirmBtn: '',
      loginType: 'wechat', // developer开发者，wechat企业微信
      loginFormData: {},
      loginFormRules: {
        login_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不得少于6位', trigger: 'blur  ' }
        ]
      }
    };
  },
  computed: {
      ...mapState(['user'])
  },
  created() {
    if (this.$route.query.code) {
      this.loginType = 'code';
      this.code = this.$route.query.code;
      this.authLogin();
    } else if (this.$route.query.type) {
      this.loginType = this.$route.query.type;
    }
  },
  mounted() {
    if (this.loginType !== 'code') {
      const agentId = process.env.VUE_APP_WECHAT_AGENTID;
      window.WwLogin({
        id: 'wechatQrCode',
        appid: 'ww265c7058b417d2ec',
        agentid: agentId,
        redirect_uri: encodeURIComponent(window.location.origin + '/login' + (this.$route.query.from ? ('?from=' + this.$route.query.from) : '')),
        // redirect_uri: encodeURIComponent('http://test2-zzm.zhizh.com/loginCode'), // 本地启用可以用这个页面获取code再手动添加到本地地址 http://192.168.102.215:8088/login?code=XXXXXX
        state: '',
        href: ''
      });
    }
  },
  methods: {
    ...mapActions(['USER_SIGNIN']),
    ...mapMutations(['USER_UPDATE']),
    reloadPage() {
      window.location.replace('/login');
    },
    async authLogin() {
      const { data } = await loginByWechat(this.code);
      if (data.code === 0) {
        this.authResult = 'success';
        this.authTitle = '登陆成功';
        localStorage.setItem('token', data.data.token);
        this.USER_UPDATE(data.data);
        // 菜单和权限
        await this.setPermission();
        this.loginCbk();
      } else {
        this.authResult = 'fail';
        this.authTitle = '登陆失败';
        this.confirmBtn = '重新登录';
      }
    },
    async setPermission() {
      const permission = await getUserPermissionById(this.user.id);
      const menuConfig = permission.data.data.actions;
      this.$store.commit('app.setMenu', menuConfig);
      const authData = this.getAuthCode(permission.data.data.actions);
      this.$store.commit('app.setAuth', authData);
    },
    getAuthCode(data) {
      var authCode = [];
      data.forEach(obj => {
        if (obj.selected) {
          obj.action_code && authCode.push(obj.action_code);
          if (obj.children && obj.children.length > 0) {
            authCode = authCode.concat(this.getAuthCode(obj.children));
          }
        }
      });
      return authCode;
    },
    handleSubmit() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const res = await this.USER_SIGNIN(this.loginFormData);
          if (res) {
            localStorage.setItem('token', res.token);
            await this.setPermission();
            this.loginCbk();
          }
        }
      });
    },
    loginCbk() {
      if (this.$route.query.from) {
        this.$router.push({ path: this.$route.query.from });
      } else {
        this.$router.push({ path: '/dashboard/index' });
      }
    }
  }
};
</script>

<style lang="less" scoped>
#wechatQrCode {
  text-align: center;
}
.login-container {
  background-image: url(../../assets/images/login-bg.svg);
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100%;
  background-color: #f0f2f5;
  height: 100vh;
  overflow: auto;
}
.login-content {
  width: 360px;
  margin: 0 auto;
  padding: 64px 0 32px 0;
  text-align: center;
  .logo-wrap {
    text-align: center;
    padding: 32px 0 24px 0;
    img {
      width: 140px;
    }
  }
}
@media screen and (max-width: 576px) {
  .login-content {
    width: 95%;
  }
}
</style>
