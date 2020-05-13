// 客户管理
import { request } from '@/utils/request';

// 列表
export const getPlatformCustomer = data => request({
  method: 'get',
  url: '/api/v1/platform/customer',
  params: data
});

// 修改状态
export const putCustomerStatus = data => request({
  method: 'put',
  url: `/api/v1/platform/customer/switch/${data.id}/${data.is_enable}`
});

// 新增
export const postPlatformCustomer = data => request({
  method: 'post',
  url: '/api/v1/platform/customer',
  data
});

// 详情
export const getPlatformCustomerDetail = id => request({
  method: 'get',
  url: `/api/v1/platform/customer/${id}`
});

// 修改
export const putPlatformCustomer = (id, data) => request({
  method: 'put',
  url: `/api/v1/platform/customer/${id}`,
  data
});
