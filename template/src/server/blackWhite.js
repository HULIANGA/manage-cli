import { request } from '@/utils/request';

// 检查应用是否有黑白名单
export const getWhiteListByAppId = (appId) => request({
  method: 'get',
  url: `/api/v1/whiteblacklist/${appId}`
});

// 白名单列表
export const getWhiteList = (data) => request({
  method: 'get',
  url: '/api/v1/ab/white',
  params: data
});

// 黑名单列表
export const getBlackList = (data) => request({
  method: 'get',
  url: '/api/v1/ab/black',
  params: data
});

// 删除白名单
export const deleteWhiteById = (id) => request({
  method: 'delete',
  url: `/api/v1/ab/white/${id}`
});

// 删除黑名单
export const deleteBlackById = (id) => request({
  method: 'delete',
  url: `/api/v1/ab/black/${id}`
});

// 新增白名单
export const postAddWhite = data => request({
  method: 'post',
  url: '/api/v1/ab/white',
  data: data
});

// 新增黑名单
export const postAddBlack = data => request({
  method: 'post',
  url: '/api/v1/ab/black',
  data: data
});

// 查询白名单详情
export const getWhiteById = (wbId) => request({
  method: 'get',
  url: `/api/v1/ab/white/${wbId}`
});

// 查询黑名单详情
export const getBlackById = (wbId) => request({
  method: 'get',
  url: `/api/v1/ab/black/${wbId}`
});

// 修改白名单
export const putEditWhite = (id, data) => request({
  method: 'put',
  url: `/api/v1/ab/white/${id}`,
  data: data
});

// 修改黑名单
export const putEditBlack = (id, data) => request({
  method: 'put',
  url: `/api/v1/ab/black/${id}`,
  data: data
});