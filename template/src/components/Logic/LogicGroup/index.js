import LogicGroup from './src/LogicGroup.vue';

LogicGroup.install = function (Vue) {
  Vue.component(LogicGroup.name, LogicGroup);
};

export default LogicGroup;