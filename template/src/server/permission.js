import { request } from '@/utils/request';

// 账号列表
export const getUserList = data =>
  request({
    method: 'get',
    url: '/api/v1/permission/user',
    params: data
  });

// 账号日志
export const getUserLogById = (user_id, data) =>
  request({
    method: 'get',
    url: `/api/v1/permission/user/${user_id}/log`,
    params: data
  });

// 企业微信登录
export const loginByWechat = code =>
  request({
    method: 'get',
    url: `/api/v1/login/qy_wechat/${code}`
  });

// 获取登录用户权限
export const getUserPermissionById = user_id =>
  request({
    method: 'get',
    url: `/api/v1/permission/user/resource/${user_id}`
  });

// 所有数据权限
export const getAllResourcePermission = data =>
  request({
    method: 'get',
    url: `/api/v1/permission/resource/datas?system_id=${data}`
  });

// 角色列表
export const getRoleList = data =>
  request({
    method: 'get',
    url: '/api/v1/permission/role',
    params: data
  });

// 所有权限
export const getAllPermission = data =>
  request({
    method: 'get',
    url: '/api/v1/permission/role/action',
    params: data
  });

// 账号详情
export const getUserById = account_id =>
  request({
    method: 'get',
    url: `/api/v1/permission/user/${account_id}`
  });

// 角色详情
export const getRoleById = role_id =>
  request({
    method: 'get',
    url: `/api/v1/permission/role/${role_id}`
  });

// 修改角色状态
export const putRoleStatus = (role_id, status) =>
  request({
    method: 'put',
    url: `/api/v1/permission/role/status/${role_id}/${status}`
  });

// 修改账号状态
export const putUserStatus = (user_id, status) =>
  request({
    method: 'put',
    url: `/api/v1/permission/user/status/${user_id}/${status}`
  });

// 根据系统ID获取可用角色
export const getRoleBySystemId = system_id =>
  request({
    method: 'get',
    url: `/api/v1/permission/role/system/${system_id}`
  });
// 根据系统ID获取权限树功能角色
export const getSystemRoleActionTree = data =>
  request({
    method: 'get',
    url: '/api/v1/permission/role/action',
    params: data
  });
// 根据系统ID获取权限树数据角色
export const getSystemRoleDataTree = data =>
  request({
    method: 'get',
    url: '/api/v1/permission/role/resource',
    params: data
  });
// 获取可用系统
export const getRoleBySystem = system_id =>
  request({
    method: 'get',
    url: '/api/v1/permission/role/system'
  });
// 新增账号
export const postCreateAccount = data =>
  request({
    method: 'post',
    url: '/api/v1/permission/user',
    data
  });

// 编辑账号
export const putEditAccount = data =>
  request({
    method: 'put',
    url: `/api/v1/permission/user/${data.account_id}`,
    data
  });

// 新增角色
export const postCreateRole = data =>
  request({
    method: 'post',
    url: '/api/v1/permission/role',
    data
  });

// 编辑角色
export const putEditRole = data =>
  request({
    method: 'put',
    url: `/api/v1/permission/role/${data.role_id}`,
    data
  });

// 修改密码
export const putChagePassword = (user_id, data) =>
  request({
    method: 'put',
    url: `/api/v1/permission/user/password/${user_id}`,
    data
  });
