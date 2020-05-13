/*
 * @Description: 文件说明
 * @Date: 2019-10-10 11:05:09
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-10-31 11:14:40
 */
import Vue from 'vue';
// import viewDesign from 'view-design';
import './assets/lib/index.less';
import './assets/css/global.less';
// import 'view-design/dist/styles/iview.css';
// import 'normalize.css/normalize.css';
// import './styles/index.scss';

import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';

import { request } from './utils/request';
import { listNameFilter } from './utils';
import App from './App.vue';
import router from './router';
import store from './store';
// import { Select, Option } from './components/Select';
import DictionarySelect from './components/dictionarySelect';
import { components } from './components';
// Vue.use(viewDesign);
import { zzmCopy, zzmAuth, zzmEllip, getTrim } from './directives';
import mixin from './mixins/mixinCommon';
import PerfectScrollbar from 'vue2-perfect-scrollbar';
import VueLazyComponent from '@xunlei/vue-lazy-component';
import {
  DatePicker,
  Divider,
  List,
  ListItem,
  ListItemMeta,
  Button,
  Table,
  Tabs,
  TabPane,
  LoadingBar,
  Layout,
  Sider,
  Header,
  Content,
  Footer,
  Row,
  Col,
  Menu,
  MenuItem,
  MenuGroup,
  Breadcrumb,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Icon,
  Avatar,
  Submenu,
  BreadcrumbItem,
  Form,
  FormItem,
  Input,
  InputNumber,
  Card,
  Modal,
  Message,
  Notice,
  Checkbox,
  CheckboxGroup,
  Poptip,
  Alert,
  Cascader,
  Tag,
  Page,
  Spin,
  Radio,
  RadioGroup,
  Select,
  Option
} from 'view-design';

Vue.component('Dropdown', Dropdown);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.component('dictionarySelect', DictionarySelect);
Vue.component('Poptip', Poptip);
Vue.component('DatePicker', DatePicker);
Vue.component('Divider', Divider);
Vue.component('Button', Button);
Vue.component('Table', Table);
Vue.component('Tabs', Tabs);
Vue.component('TabPane', TabPane);
Vue.component('Layout', Layout);
Vue.component('Sider', Sider);
Vue.component('Header', Header);
Vue.component('Content', Content);
Vue.component('Footer', Footer);
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Menu', Menu);
Vue.component('MenuItem', MenuItem);
Vue.component('MenuGroup', MenuGroup);
Vue.component('Breadcrumb', Breadcrumb);
Vue.component('Icon', Icon);
Vue.component('Avatar', Avatar);
Vue.component('Submenu', Submenu);
Vue.component('BreadcrumbItem', BreadcrumbItem);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Input', Input);
Vue.component('InputNumber', InputNumber);
Vue.component('Card', Card);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Modal', Modal);
Vue.component('List', List);
Vue.component('ListItem', ListItem);
Vue.component('ListItemMeta', ListItemMeta);
Vue.component('Checkbox', Checkbox);
Vue.component('CheckboxGroup', CheckboxGroup);
Vue.component('Alert', Alert);
Vue.component('Tag', Tag);
Vue.component('Page', Page);
Vue.component('Notice', Notice);
Vue.component('Cascader', Cascader);
Vue.component('Spin', Spin);
Vue.component('RadioGroup', RadioGroup);
Vue.component('Radio', Radio);
// 自定义组件
components.map(component => {
  Vue.use(component);
});

// 自定义过滤方法的过滤器
Vue.filter('patch', function(value, cb) {
  const args = [].slice.call(arguments, 2, arguments.length - 1);
  return cb.apply(this, [value, ...args]);
});

Vue.use(PerfectScrollbar);
Vue.use(VueLazyComponent);

Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.prototype.$Modal = Modal;
Vue.prototype.$Message = Message;
Vue.prototype.$Notice = Notice;

// 把封装的请求对象挂到Vue的实例中
Vue.prototype.$http = request;
// 列表名字过滤展示
Vue.prototype.$lname = listNameFilter;
// 路由跳转前
const noTabRoute = ['/login']; // 不在tab显示的路由
router.beforeEach((to, from, next) => {
  if (
    process.env.VUE_APP_SYSTEM_STATUS === 'update' &&
    to.path !== '/updating'
  ) {
    // 系统维护中
    next({ path: '/updating' });
  }
  if (!store.state.user.id && !store.state.app.noAuthRoute.includes(to.path)) {
    next({ path: '/login', query: { from: to.fullPath } });
  } else if (to.matched.length !== 0) {
    if (
      !store.state.app.noAuthRoute.includes(to.path) &&
      !store.state.app.auth.includes(to.meta.code)
    ) {
      // 需要校验权限且已经获取了权限列表
      next({ path: '/exception/403' });
    } else {
      LoadingBar.start();
      if (!noTabRoute.includes(to.path)) {
        store.commit('router.list', to);
      }
      next();
    }
  } else {
    // 无匹配路由跳转404
    next({ path: '/exception/404' });
  }
});
// 路由跳转后
router.afterEach((to, from) => {
  store.commit('router.active', to.path);
  LoadingBar.finish();
});
Vue.use(zzmCopy);
Vue.use(zzmAuth);
Vue.use(zzmEllip);
Vue.use(getTrim);
Vue.mixin(mixin);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
