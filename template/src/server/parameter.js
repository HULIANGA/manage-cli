/*
 * @Description: 文件说明
 * @Date: 2019-10-25 14:30:07
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-11-14 16:16:45
 */
import { request } from '@/utils/request';

// 参数列表
export const getParameters = data =>
    request({
        method: 'get',
        url: '/api/v1/parameters',
        params: data
    });

// 参数详情
export const getParametersById = ({ id }) =>
    request({
        method: 'get',
        url: `/api/v1/parameters/${id}`
    });

// 新增参数
export const postParameters = data =>
    request({
        method: 'post',
        url: '/api/v1/parameters',
        data
    });

// 修改参数
export const putParametersById = ({ id, data }) =>
    request({
        method: 'put',
        url: `/api/v1/parameters/${id}`,
        data
    });

// 删除参数
export const deleteParametersById = ({ id }) =>
    request({
        method: 'delete',
        url: `/api/v1/parameters/${id}`
    });