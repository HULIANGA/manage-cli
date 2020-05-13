/**
 * 产品服务
 */
import { request } from '@/utils/request';

// 开发者
export const getDevelopers = code => request({
  method: 'get',
  url: '/api/v1/sdk/developers?keyword='
});

// 数据字典
export const getDictByCode = code => request({
  method: 'get',
  url: `/api/v1/dictionaries/code/${code}`
});

// account_type，1:投放账号 2:变现账号
// 账号列表
export const getAccount = data => request({
  method: 'get',
  url: '/api/v1/platform/account',
  params: data
});
// 修改账号状态
export const putAccountStatus = data => request({
  method: 'put',
  url: `/api/v1/platform/account/${data.id}/status/${data.is_enable}`
});
// 账号详情
export const getAccountById = id => request({
  method: 'get',
  url: `/api/v1/platform/account/${id}`
});
// 新增账号
export const postCreateAccount = data => request({
  method: 'post',
  url: '/api/v1/platform/account',
  data
});
// 编辑账号
export const putEditAccount = data => request({
  method: 'put',
  url: `/api/v1/platform/account/${data.id}`,
  data
});
// 账号编辑界面扩展配置
export const getExtconfigByPlatformId = platformId => request({
  method: 'get',
  url: `/api/v1/platform/account/ext_config/${platformId}`
});

// 平台列表
export const getPlatform = data => request({
  method: 'get',
  url: '/api/v1/platform',
  params: data
});
// 平台新增
export const postCreatePlatform = data => request({
  method: 'post',
  url: '/api/v1/platform',
  data
});
// 平台更新
export const putEditPlatform = data => request({
  method: 'put',
  url: `/api/v1/platform/${data.id}`,
  data
});

// 投放平台列表
export const getPutin = data => request({
  method: 'get',
  url: '/api/v1/platform/putin',
  params: data
});
// 投放平台新增
export const postCreatePutin = data => request({
  method: 'post',
  url: '/api/v1/platform/putin',
  data
});
// 投放平台更新
export const putEditPutin = data => request({
  method: 'put',
  url: `/api/v1/platform/putin/${data.id}`,
  data
});

// 变现平台列表
export const getRealize = data => request({
  method: 'get',
  url: '/api/v1/platform/realization',
  params: data
});
// 变现平台新增
export const postCreateRealize = data => request({
  method: 'post',
  url: '/api/v1/platform/realization',
  data
});
// 变现平台更新
export const putEditRealize = data => request({
  method: 'put',
  url: `/api/v1/platform/realization/${data.id}`,
  data
});

// 代理商返点列表
export const getAgentRebate = data => request({
  method: 'get',
  url: '/api/v1/platform/agentrebate',
  params: data
});
// 新增代理商返点
export const postCreateAgentRebate = data => request({
  method: 'post',
  url: '/api/v1/platform/agentrebate',
  data
});
// 编辑代理商返点
export const putEditAgentRebate = data => request({
  method: 'put',
  url: '/api/v1/platform/agentrebate',
  data
});

// 产品版本列表
export const getAppVersionById = appId => request({
  method: 'get',
  url: `/api/v1/appsversion/${appId}`
});
// 新增版本
export const postAppVersion = data => request({
  method: 'post',
  url: '/api/v1/appsversion',
  data
});
// 修改版本
export const putAppVersion = (versionId, data) => request({
  method: 'put',
  url: `/api/v1/appsversion/${versionId}`,
  data
});
// 删除版本
export const deleteAppVersionById = versionId => request({
  method: 'delete',
  url: `/api/v1/appsversion/${versionId}`
});

// 代理列表
export const getAgentList = data => request({
  method: 'get',
  url: '/api/v1/platform/agents',
  params: data
});
// 代理新增
export const postCreateAgent = data => request({
  method: 'post',
  url: '/api/v1/platform/agents',
  data
});
// 代理更新
export const putEditAgent = data => request({
  method: 'put',
  url: `/api/v1/platform/agents/${data.id}`,
  data
});
// 账号导出
export const getAccountExport = params => request({
  method: 'get',
  url: '/api/v1/platform/account/export',
  params
});