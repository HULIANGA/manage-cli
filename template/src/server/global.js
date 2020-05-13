import { request } from '@/utils/request';

/**
 * 投放平台列表字典获取
 */
export const getPlatformPutinDict = data =>
  request({
    method: 'get',
    url: '/api/v1/platform/putin',
    params: { ...data, page_num: 1, page_size: 100000 }
  });

/**
 * 根据平台id查账户
 */
export const getPlatformAccountByIdDict = data =>
  request({
    method: 'get',
    url: `/api/v1/platform/account/${data.platform_id}/list`
  });
/**
 * 字典获取信息
 */
export const getDictByCode = data =>
  request({
    method: 'get',
    url: `/api/v1/dictionaries/code/${data.code}`
  });
