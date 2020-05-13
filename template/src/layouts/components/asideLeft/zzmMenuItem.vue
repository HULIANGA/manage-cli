<template>
  <Submenu v-if="filterMenuData.children && filterMenuData.children.length > 0" :name="filterMenuData.action_code">
    <template slot="title">
      <Icon
        v-if="filterMenuData.icon"
        :type="filterMenuData.icon"
      />
      <span>{{ filterMenuData.action_name }}</span>
    </template>
    <ZzmMenuItem v-for="subMenuData in filterMenuData.children" v-if="subMenuData.selected" :key="subMenuData.action_id" :menu-data="subMenuData"></ZzmMenuItem>
  </Submenu>
  <MenuItem v-else :name="filterMenuData.action_code" :to="filterMenuData.url">
    <Icon
      v-if="filterMenuData.icon"
      :type="filterMenuData.icon"
    />
    <span>{{ filterMenuData.action_name }}</span>
  </MenuItem>
</template>

<script>
  /**
    菜单节点，有children展示Submenu并循环展示本身。无children展示MenuItem
   */
  export default {
    name: 'ZzmMenuItem',
    props: {
      menuData: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
      };
    },
    computed: {
      filterMenuData() {
        return {
          ...this.menuData,
          children: this.menuData.children && this.menuData.children.length > 0 ? this.menuData.children.filter(menu => menu.action_type === 1 && menu.is_show === 1 && menu.selected) : []
        };
      }
    }
  };
</script>

<style lang="less" scoped></style>