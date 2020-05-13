/*
 * @Description: 文件说明
 * @Date: 2019-10-11 10:40:53
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-10-11 10:40:53
 */
import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import app from './app';
import router from './router';
import dictionary from './dictionary';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        app,
        dictionary,
        router
    }
});