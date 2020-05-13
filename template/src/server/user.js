/*
 * @Description: 文件说明
 * @Date: 2019-10-25 11:26:19
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-12-17 14:49:22
 */
import { request } from '@/utils/request';

// 用户详情
export const getUsersById = ({ id }) => request({
  method: 'get',
  url: `/api/v1/users/${id}`
});

// 用户详情(新)
export const getAccountProfile = () => request({
  method: 'get',
  url: '/api/v1/account/profile'
});

// 用户新增
export const postUsers = data =>
  request({
    method: 'post',
    url: '/api/v1/users',
    data: data
  });

// 用户编辑
export const putUsersById = ({ id, data }) => request({
  method: 'put',
  url: `/api/v1/users/${id}`,
  data: data
});

// 用户删除
export const deleteUsersById = ({ id }) => request({
  method: 'delete',
  url: `/api/v1/users/${id}`
});

// 子账号列表
export const getUsersChildren = data =>
  request({
    method: 'get',
    url: '/api/v1/users/children',
    params: data
  });

// SDK开发者查询
export const getSdkDevelopers = data =>
  request({
    method: 'get',
    url: '/api/v1/sdk/developers',
    params: data
  });

// SDK应用查询
export const getSdkApps = data =>
  request({
    method: 'get',
    url: '/api/v1/sdk/apps',
    params: data
  });
// 黑名单列表
export const getBlacklists = data =>
  request({
    method: 'get',
    url: '/api/v1/mc/blacklists',
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded' // 模拟form表单方式提交请求
    // },
    params: data
  });
// 移除黑名单
export const deleteBlacklists = (data) => {
  const param = {
    ...data
  };
  delete param.id;
  return request({
    method: 'delete',
    url: `/api/v1/mc/blacklists/${data.id}`,
    params: param
  });
};
// 导出记录
export const getExportList = data => request({
  method: 'get',
  url: '/api/v1/task',
  params: data
});