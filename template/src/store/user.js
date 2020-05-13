/*
 * @Description: 文件说明
 * @Date: 2019-10-11 10:40:53
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-10-30 14:47:06
 */
import Vue from 'vue';
import { request } from '@/utils/request';

export const USER_SIGNIN = 'USER_SIGNIN'; // 登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT'; // 退出登录
export const USER_UPDATE = 'USER_UPDATE'; // 更新用户信息

export default {
  state: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
  mutations: {
    [USER_UPDATE] (state, user) {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        Object.assign(state, user);
      } else {
        localStorage.removeItem('user');
        Object.keys(state).forEach(k => Vue.delete(state, k));
      }
    }

  },
  actions: {
    async [USER_SIGNIN] ({ commit }, options) {
      const { data } = await request({
        method: 'post',
        url: '/api/v1/login',
        data: options
      });
      if (data.code === 0) {
        const user = data.data;
        commit(USER_UPDATE, user);
        return user;
      } else {
        return false;
      }
    },
    async [USER_SIGNOUT] () {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      location.href = '/login';
    }
  }
};
