/**
 * 商业化服务
 */
import { request } from '@/utils/request';

// 配置列表列表
export const getBizList = data => request({
  method: 'get',
  url: '/api/v1/biz/placement',
  params: data
});

// 修改配置状态
export const putBizStatus = data => request({
  method: 'put',
  url: `/api/v1/biz/placement/${data.id}/is_enable/${data.is_enable}`
});

// 新增配置
export const postCreateBiz = data => request({
  method: 'post',
  url: '/api/v1/biz/placement',
  data
});

// 查询配置详情
export const getBizById = id => request({
  method: 'get',
  url: `/api/v1/biz/placement/${id}`
});

// 广告位
// 广告位列表
export const getAdsList = data => request({
  method: 'get',
  url: '/api/v1/ad/advertising/place',
  params: data
});
// 修改广告状态
export const putAdsStatus = data => request({
  method: 'put',
  url: `/api/v1/ad/advertising/place/${data.id}/${data.is_enabled}`
});
// 新增广告
export const postCreateAds = data => request({
  method: 'post',
  url: '/api/v1/ad/advertising/place',
  data
});
// 修改广告
export const putEditAds = data => request({
  method: 'put',
  url: `/api/v1/ad/advertising/place/${data.id}`,
  data
});