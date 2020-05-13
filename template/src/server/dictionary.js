/*
 * @Description: 文件说明
 * @Date: 2019-11-01 14:10:41
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-11-14 16:12:29
 */
import { request } from '@/utils/request';

// 字典列表
export const getDictionaries = data =>
    request({
        method: 'get',
        url: '/api/v1/dictionaries',
        params: data
    });
// 字典详情
export const getDictionariesById = ({ id }) =>
    request({
        method: 'get',
        url: `/api/v1/dictionaries/${id}`
    });

// 新建字典
export const postDictionaries = data =>
    request({
        method: 'post',
        url: '/api/v1/dictionaries',
        data
    });

// 修改字典
export const putDictionariesById = ({ data, id }) =>
    request({
        method: 'put',
        url: `/api/v1/dictionaries/${id}`,
        data
    });

// 删除字典
export const deleteDictionariesById = ({ data, id }) =>
    request({
        method: 'delete',
        url: `/api/v1/dictionaries/${id}`
    });