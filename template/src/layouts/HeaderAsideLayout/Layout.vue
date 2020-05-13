<!--
 * @Description: 文件说明
 * @Date: 2019-10-12 14:21:31
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-11-11 15:16:34
 -->
<template>
  <div class="wrap">
    <Layout style="height:100vh">
      <Sider hide-trigger class="siderLeft">
        <LayoutAsideLeft :aside-menu-config="asideMenuConfig" />
      </Sider>
      <Layout>
        <Header>
          <LayoutHeader />
        </Header>
        <LayoutTabs :keep-alive="false"></LayoutTabs>

        <!-- <Footer>Footer</Footer> -->
      </Layout>
      <!-- <Sider
        class="siderRight"
        v-if="showRight"
      >
        <LayoutAsideRight @hideRightAside="hideRightAside"></LayoutAsideRight>
      </Sider>-->
    </Layout>
  </div>
</template>

<script type="text/babel">
import LayoutHeader from '../components/header/header';
import LayoutTabs from '../components/tabs';
import LayoutAsideLeft from '../components/asideLeft/asideLeft';
import { mapState } from 'vuex';
export default {
    components: {
        LayoutHeader,
        LayoutTabs,
        LayoutAsideLeft
    },
    data() {
        return {
            showRight: true,
            // 菜单配置
            asideMenuConfig: []
        };
    },
    computed: {
        ...mapState(['app'])
    },
    created() {
        this.asideMenuConfig = this.app.menu;
    },
    hideRightAside() {
      this.showRight = false;
    }
  };
</script>

<style lang="less">
body {
  margin: 0 0px;
}
a {
  text-decoration: none;
}
.wrap {
  height: 100vh;

  .ivu-layout-header {
    height: 56px;
    line-height: 56px;
    background: #fff;
    padding: 0 26px;
  }
  .ivu-layout-content {
    padding: 6px 12px 12px;
    position: relative;
  }
  .ivu-layout-footer {
    height: 90px;
  }
  .ivu-layout-sider {
    background: none;
  }
}
</style>
