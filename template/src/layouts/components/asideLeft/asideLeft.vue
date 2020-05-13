<!--
 * @Description: 文件说明
 * @Date: 2019-10-12 14:44:54
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-11-26 15:00:39
 -->
<!--  -->
<template>
  <div class="menuWrap">
    <perfect-scrollbar>
      <div class="logoWrap">
        <img src="../../../assets/images/logo/text-logo.png" alt="方舟" />
      </div>
      <slot name="top" />
      <Menu
        theme="dark"
        :open-names="openMenuNames"
        :active-name="activeMenuName"
        @on-select="handleSelect"
      >
        <MenuGroup
          v-for="group in menuList"
          :key="group.action_id"
          :title="group.action_name"
        >
          <zzmMenuItem v-for="menuData in group.children" v-if="menuData.selected" :key="menuData.action_id" :menu-data="menuData"></zzmMenuItem>
        </MenuGroup>
      </Menu>
    </perfect-scrollbar>
  </div>
</template>

<script>
import zzmMenuItem from './zzmMenuItem';

export default {
  components: {
    zzmMenuItem
  },
  props: {
    asideMenuConfig: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    };
  },
  computed: {
    menuList() {
      return this.asideMenuConfig.filter(obj => obj.selected);
    },
    activeMenuName() { // 选中的菜单
      return this.$route.meta && this.$route.meta.code;
    },
    openMenuNames() { // 展开的菜单
      if (this.$route.meta && this.$route.meta.code) {
        return this.getOpenMenus(this.menuList, this.$route.meta.code).names;
      } else {
        return [];
      }
    }
  },
  created() {
  },
  methods: {
    getOpenMenus(menus, code, index = [], name = []) {
      var indexs = [];
      var names = [];
      for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        if (menu.action_code === code) {
          indexs = [...index, i];
          names = [...name, menu.action_code];
        } else if (menu.children && menu.children.length > 0) {
          const temp = this.getOpenMenus(menu.children, code, [...index, i], [...name, menu.action_code]);
          if (temp.indexs.length > 0) {
            indexs = temp.indexs;
            names = temp.names;
            break;
          }
        }
      }
      return {
        indexs,
        names
      };
    },
    handleSelect(name) {
      if (name === 'systemService:api:front') {
        window.open('http://yapi.batmobi.cn/project/202/interface/api');
      } else if (name === 'systemService:api:back') {
        window.open('http://yapi.batmobi.cn/project/212/interface/api');
      }
      // if (name.indexOf('/document') > -1) {
      //   this.$router.go(-1);
      // }
    }
  }
};
</script>
<style lang="less" scoped>
  @import '../../../assets/lib/custom.less';
  .menuWrap {
    height: 100vh;
    background: @menu-dark-title;
    .ps {
      height: 100%;
      :global(.ps__rail-y) {
        z-index: 901;
      }
    }
    .logoWrap {
      text-align: center;
      border-bottom: 1px solid @menu-dark-active-bg;
      img {
        width: 100px;
        margin: 20px 0 10px;
      }
    }
}
</style>
