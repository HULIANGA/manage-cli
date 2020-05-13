/*
 * @Description: 文件说明
 * @Date: 2019-10-29 17:20:06
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-11-14 16:00:48
 */
import { request } from '@/utils/request';
/**
 * 获取广告计划列表
 */
export const getIncreasePlan = data =>
  request({
    method: 'get',
    url: '/api/v1/ad/plan',
    params: data
  });

/**
 * 启动/暂停计划
 */
export const putIncreasePlanStatus = data =>
  request({
    method: 'put',
    url: '/api/v1/ad/plan/opt_status',
    data
  });

/**
 * 获取广告计划日志
 */
export const getIncreasePlanLogById = data =>
  request({
    method: 'get',
    url: `/api/v1/ad/plan/${data.id}/log`,
    params: {
      page_num: data.page_num,
      page_size: data.page_size
    }
  });

/**
 * 新建投放规则
 */
export const postCreatePlanRule = data =>
  request({
    method: 'post',
    url: '/api/v1/ad/plan/rule',
    data
  });

/**
 * 更新投放规则
 */
export const putCreatePlanRule = data =>
  request({
    method: 'put',
    url: '/api/v1/ad/plan/rule/' + data.rule_id,
    data
  });

/**
 * 启用/停用投放规则
 */
export const changeRuleStatus = data =>
  request({
    method: 'put',
    url: `/api/v1/ad/plan/rule/is_enable/${data.rule_id}`,
    data
  });

/**
 * 投放规则列表
 */
export const getPlanRule = data =>
  request({
    method: 'get',
    url: '/api/v1/ad/plan/rule',
    params: data
  });

/**
 * 投放规则日志
 */
export const getRuleLogById = data =>
  request({
    method: 'get',
    url: `/api/v1/ad/plan/rule/${data.rule_id}/log`,
    params: {
      page_num: data.page_num || 1,
      page_size: data.page_size || 100000
    }
  });

/**
 * 获取投放规则
 */
export const getRlueById = data =>
  request({
    method: 'get',
    url: `/api/v1/ad/plan/rule/${data.rule_id}`
  });

/**
 * 投放规则校验接口
 */
export const postRuleCheck = data =>
  request({
    method: 'post',
    url: '/api/v1/ad/plan/rule/check',
    data
  });

/**
 * 根据投放平台获取产品
 */
export const getAppsByPlatformId = data =>
  request({
    method: 'get',
    url: `/api/v1/platform/${data.platform_id}/app`
  });

/**
 * 授权管理列表
 */
export const getAuthList = data =>
  request({
    method: 'get',
    url: '/api/v1/ad/account/auth',
    params: data
  });

/**
 * 新增、编辑授权账号
 */
export const putAuthModify = data =>
  request({
    method: 'put',
    url: '/api/v1/ad/account/auth/modify',
    data
  });

/**
 * 暂停授权
 */
export const postPauseAuth = data =>
  request({
    method: 'put',
    url: '/api/v1/ad/account/auth/parse',
    data
  });

/**
 * 授权日志
 */
export const getLogByAuthId = (authId, data) =>
  request({
    method: 'get',
    url: `/api/v1/ad/account/auth/${authId}/log`,
    params: data
  });

/**
 * 授权
 */
export const postAuth = data =>
  request({
    method: 'put',
    url: '/api/v1/ad/plan/token',
    data
  });

/**
 * 根据投放平台获取产品
 */
export const getSubChannelByAccountId = data =>
  request({
    method: 'get',
    url: `/api/v1/platform/account/${data.account_id}/sub_channel`
  });

/**
 * 投放管理-产品下拉列表 投放地区, 1:国内2:海外3:全球
 */
export const getAdPlanList = data =>
  request({
    method: 'get',
    url: '/api/v1/apps/adplan/list',
    params: data
  });

/**
 * 总览
 */
// 指标卡
export const getOVIndicator = data => request({
  method: 'get',
  url: '/api/v1/increase/data/overview/indicator',
  params: data
});
// 渠道结构
export const getOVChannel = data => request({
  method: 'get',
  url: '/api/v1/increase/data/overview/channel',
  params: data
});
// 产品结构
export const getOVApp = data => request({
  method: 'get',
  url: '/api/v1/increase/data/overview/app',
  params: data
});
// 点击概览
export const getOVClick = data => request({
  method: 'get',
  url: '/api/v1/increase/data/overview/click',
  params: data
});
// 转化概览
export const getOVConversion = data => request({
  method: 'get',
  url: '/api/v1/increase/data/overview/conversion',
  params: data
});
// 成本概览
export const getOVCost = data => request({
  method: 'get',
  url: '/api/v1/increase/data/overview/cost',
  params: data
});
// 激活概览
export const getOVInstall = data => request({
  method: 'get',
  url: '/api/v1/increase/data/overview/install',
  params: data
});
// 新用户质量
export const getOVNewUserQuality = data => request({
  method: 'get',
  url: '/api/v1/increase/data/overview/new_user_quality',
  params: data
});
// 新用户价值
export const getOVNewUserLTV = data => request({
  method: 'get',
  url: '/api/v1/increase/data/overview/new_user_ltv',
  params: data
});

/**
 * 人效分析
 */
// 优化师排名
export const getEfOperator = data => request({
  method: 'get',
  url: '/api/v1/increase/efficiency/operator',
  params: data
});
// 产品投放排名
export const getEfApp = data => request({
  method: 'get',
  url: '/api/v1/increase/efficiency/app',
  params: data
});
// 渠道投放排名
export const getEfPlatform = data => request({
  method: 'get',
  url: '/api/v1/increase/efficiency/platform',
  params: data
});