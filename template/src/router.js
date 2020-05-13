/*
 * @Description: 文件说明
 * @Date: 2019-10-10 16:50:38
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-10-12 09:52:03
 */
import Vue from 'vue';
import Router from 'vue-router';
import routerConfig from '@/routers';
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: routerConfig
});