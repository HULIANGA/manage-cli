/*
 * @Description: 文件说明
 * @Date: 2019-11-04 15:07:16
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-12-05 11:21:25
 */
import { request } from '@/utils/request';

/**
 * 获取优化方案列表
 */
export const getAbExperiments = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/experiments',
    params: data
  });

/**
 * 获取优化方案下拉列表
 */
export const getAbExperimentsList = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/experiments/list',
    params: data
  });

/**
 * 获取优化方案详情
 */
export const getAbExperimentsById = ({ id }) =>
  request({
    method: 'get',
    url: `/api/v1/ab/experiments/${id}`
  });

/**
 * 受众详情
 */
export const getAssetAudiencesById = ({ id }) =>
  request({
    method: 'get',
    url: `/api/v1/ab/asset_audiences/${id}`
  });

/**
 * 新建优化方案
 */
export const postAbExperiments = data =>
  request({
    method: 'post',
    url: '/api/v1/ab/experiments',
    data
  });

/**
 * 优化方案开关
 */
export const putAbExperimentsSwitch = data =>
  request({
    method: 'put',
    url: '/api/v1/ab/experiments/switch',
    params: data
  });

/**
 * 修改优化方案
 */
export const putAbExperimentsById = ({ id, data }) =>
  request({
    method: 'put',
    url: `/api/v1/ab/experiments/${id}`,
    data
  });

// 删除优化方案
export const deleteAbExperimentsById = ({ id }) =>
  request({
    method: 'delete',
    url: `/api/v1/ab/experiments/${id}`
  });

// 受众列表
export const getAbAudiences = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/audiences',
    params: data
  });

// 根据受众列表id获取受众项目列表
export const getAbAudiencesValues = ({ code, data }) =>
  request({
    method: 'get',
    url: `/api/v1/audiences/${code}/values`,
    params: data
  });
// 根据受众列表id获取受众项目列表
export const getAbAudiencesValuesByCode = ({ code, data }) =>
  request({
    method: 'get',
    url: `/api/v1/audiences/${code}/values?query_type=0`
  });

// 受众列表
export const getAudiences = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/audiences',
    params: data
  });
// 受众列表
export const getAllAudiences = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/audiences',
    params: data
  });
// 受众详情
export const getAudiencesById = ({ id }) =>
  request({
    method: 'get',
    url: `/api/v1/ab/audiences/${id}`
  });

// 新增受众
export const postAudiences = data =>
  request({
    method: 'post',
    url: '/api/v1/ab/audiences',
    data
  });

// 修改受众
export const putAudiencesById = ({ id, data }) =>
  request({
    method: 'put',
    url: `/api/v1/ab/audiences/${id}`,
    data
  });

// 显示隐藏受众
export const putAudiencesByIdAction = ({ id, data }) =>
  request({
    method: 'put',
    url: `/api/v1/ab/audiences/${id}/status`,
    params: data
  });
// 新建精细化运营
export const postAbMeticulous = data =>
  request({
    method: 'post',
    url: '/api/v1/ab/meticulous',
    data
  });

/**
 * 修改精细化运营
 */
export const putAbMeticulousById = ({ id, data }) =>
  request({
    method: 'put',
    url: `/api/v1/ab/meticulous/${id}`,
    data
  });

// 删除精细化运营
export const deleteAbMeticulousById = ({ id }) =>
  request({
    method: 'delete',
    url: `/api/v1/ab/meticulous/${id}`
  });

/**
 * 获取精细化运营列表
 */
export const getAbMeticulous = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/meticulous',
    params: data
  });

// 获取精细化运营详情
export const getAbMeticulousById = ({ id }) =>
  request({
    method: 'get',
    url: `/api/v1/ab/meticulous/${id}`
  });

// 开关精细化运营
export const putAbMeticulousStateById = ({ id }) =>
  request({
    method: 'put',
    url: `/api/v1/ab/meticulous/state/${id}`
  });

// 查看日志
export const postLogOperate = data =>
  request({
    method: 'get',
    url: '/api/v1/log/operate?object_id=' + data.object_id + '&object_type=' + data.object_type
  });

// 获取业务列表
export const getAbStrategy = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/strategy',
    params: data
  });

// 新增业务
export const postAbStrategy = data =>
  request({
    method: 'post',
    url: '/api/v1/ab/strategy',
    data
  });

// 编辑业务
export const putAbStrategy = data =>
  request({
    method: 'put',
    url: '/api/v1/ab/strategy',
    data
  });

// 业务策略字段列表
export const getAbStrategyByStrategyIdColumns = data =>
  request({
    method: 'get',
    url: `/api/v1/ab/strategy/${data.id}/columns`,
    params: data
  });

// 业务策略隐藏显示
export const putAbStrategyByStrategyIdVisibleByVisible = ({ id, visible }) =>
  request({
    method: 'put',
    url: `/api/v1/ab/strategy/${id}/visible/${visible}`
  });

// 业务策略隐藏显示
export const putAbStrategyColumnsByColumnIdVisibleByVisible = ({ id, visible }) =>
  request({
    method: 'put',
    url: `/api/v1/ab/strategy/columns/${id}/visible/${visible}`
  });

// 业务策略字段新增
export const postAbStrategyByStrategyIdColumns = data =>
  request({
    method: 'post',
    url: `/api/v1/ab/strategy/${data.strategy_id}/columns`,
    data
  });

// 业务策略字段新增
export const putAbStrategyByStrategyIdColumns = data =>
  request({
    method: 'put',
    url: `/api/v1/ab/strategy/${data.strategy_id}/columns`,
    data
  });
// 获取业务列表-下拉选择列表
export const getAbStrategySelectItems = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/strategy/selectItems',
    params: data
  });

// 获取业务策略字段详情
export const getAbStrategyColumnsById = ({ id }) =>
  request({
    method: 'get',
    url: `/api/v1/ab/strategy/columns/${id}`
  });

// 获取精细化运营下拉列表
export const getAbbMeticulousList = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/meticulous/list',
    params: data
  });

// 消息发送记录
export const getAbMessages = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/messages',
    params: data
  });

// 营销推广-供应商设置-列表
export const getAbAppsms = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/appsms',
    params: data
  });

// 营销推广-供应商设置-邮件列表
export const getAbAppEmail = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/channel/email',
    params: data
  });
// 营销推广-供应商设置-短信列表
export const getAbAppSmsList = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/channel/sms',
    params: data
  });
// 营销推广-供应商设置-mailchimp受众列表
export const getMcChannelList = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/channel/mc/lists',
    params: data
  });
// 营销推广-供应商设置-短信设置编辑
export const postAbAppsmsEdit = data =>
  request({
    method: 'post',
    url: '/api/v1/ab/channel/sms',
    data
  });
// 营销推广-供应商设置-邮件设置编辑
export const postAbAppEmailEdit = data =>
  request({
    method: 'post',
    url: '/api/v1/ab/channel/email',
    data
  });

// 营销推广-供应商设置-编辑
export const postAbAppsms = data =>
  request({
    method: 'post',
    url: '/api/v1/ab/appsms',
    data
  });
// 营销推广-邮件默认设置-列表
export const getAbAppemail = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/appemail',
    params: data
  });
// 营销推广-邮件默认设置-编辑
export const postAbAppemail = data =>
  request({
    method: 'post',
    url: '/api/v1/ab/appemail',
    data
  });

// 设置-用户标签-管理列表
export const getAbUsertags = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/usertags',
    params: data
  });

// 设置-用户标签-修改
export const putAbUsertagsById = ({ data, id }) =>
  request({
    method: 'put',
    url: `/api/v1/ab/usertags/${id}`,
    data
  });

// 营销推广-管理列表
export const getAbPromotions = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/promotions',
    params: data
  });
// 营销推广-管理列表-下拉列表
export const getAbPromotionsList = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/promotions/list',
    params: data
  });

// 营销推广-管理列表-详情
export const getAbPromotionsById = ({ data, id }) =>
  request({
    method: 'get',
    url: `/api/v1/ab/promotions/${id}`,
    params: data
  });

// 营销推广-管理列表-删除
export const deleteAbPromotionsById = ({ data, id }) =>
  request({
    method: 'delete',
    url: `/api/v1/ab/promotions/${id}`,
    params: data
  });

// 营销推广-管理列表-开启/关闭
export const putAbPromotionsStateById = ({ data, id }) =>
  request({
    method: 'put',
    url: `/api/v1/ab/promotions/state/${id}`,
    params: data
  });
// 营销推广-管理列表-同步
export const putAbPromotionsSyncById = ({ data, id }) =>
  request({
    method: 'put',
    url: `/api/v1/ab/promotions/sync/${id}`,
    params: data
  });

// 营销推广-营销方案-新增
export const postAbPromotions = data =>
  request({
    method: 'post',
    url: '/api/v1/ab/promotions',
    data
  });

// 营销推广-营销方案-新增
export const putAbPromotionsById = ({ data, id }) =>
  request({
    method: 'put',
    url: `/api/v1/ab/promotions/${id}`,
    data
  });

// 营销推广-邮件内容-下拉列表
// 测试邮件
export const postAbEmailsSend = data =>
  request({
    method: 'post',
    url: '/api/v1/ab/emails/send',
    data
  });

// 邮件内容列表
export const getAbEmails = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/emails',
    params: data
  });

// 获取邮件详情
export const getAbEmailsById = ({ id }) =>
  request({
    method: 'get',
    url: `/api/v1/ab/emails/${id}`
  });

// 新建邮件
export const postAbEmails = data =>
  request({
    method: 'post',
    url: '/api/v1/ab/emails',
    data
  });

// 修改邮件
export const putAbEmailsById = ({ data, id }) =>
  request({
    method: 'put',
    url: `/api/v1/ab/emails/${id}`,
    data
  });

// 删除邮件
export const deleteAbEmailsById = ({ data, id }) =>
  request({
    method: 'delete',
    url: `/api/v1/ab/emails/${id}`,
    params: data
  });

// 邮件下拉列表
export const getAbEmailsList = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/emails/list',
    params: data
  });

// 测试短信
export const postAbSmsSend = data =>
  request({
    method: 'post',
    url: '/api/v1/ab/sms/send',
    data
  });

// 营销-设置-发送频率
export const getAbParameters = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/parameters',
    params: data
  });

// 营销-设置-保存
export const postAbParameters = ({ data, params }) =>
  request({
    method: 'post',
    url: '/api/v1/ab/parameters',
    data,
    params
  });

// 营销-设置-黑名单模板
export const abBlacklistTemplate = `${process.env.VUE_APP_BASEURL}/api/v1/ab/blacklist/template`;

// 营销-设置-黑名单上传
export const abBlacklist = `${process.env.VUE_APP_BASEURL}/api/v1/ab/blacklist`;

// 模板内容
export const abTemplatesContentById = (id) => `${process.env.VUE_APP_BASEURL}/api/v1/ab/templates/content/${id}`;

// 保存模板
export const postAbTemplates = data =>
  request({
    method: 'post',
    url: '/api/v1/ab/templates',
    data
  });

// 模板列表
export const getAbTemplates = data =>
  request({
    method: 'get',
    url: '/api/v1/ab/templates',
    params: data
  });