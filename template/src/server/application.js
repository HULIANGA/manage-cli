/*
 * @Description: 文件说明
 * @Date: 2019-10-25 11:26:19
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-11-14 16:05:33
 */
import { request } from '@/utils/request';

// sdk列表
export const getSdks = data =>
    request({
        method: 'get',
        url: '/api/v1/apps/sdks',
        params: data
    });

// 应用列表
export const getApps = data =>
    request({
        method: 'get',
        url: '/api/v1/apps',
        params: data
    });

// 删除应用
export const deleteAppsById = ({ id }) =>
    request({
        method: 'delete',
        url: `/api/v1/apps/${id}`
    });

// 获取应用详情
export const getAppsById = ({ id }) =>
    request({
        method: 'get',
        url: `/api/v1/apps/${id}`
    });

// 新增应用
export const postApps = data =>
    request({
        method: 'post',
        url: '/api/v1/apps',
        data
    });

// 编辑应用
export const putAppsById = ({ id, data }) =>
    request({
        method: 'put',
        url: `/api/v1/apps/${id}`,
        data
    });

// 重置密钥
export const putAppsSecretResetById = ({ id }) =>
    request({
        method: 'put',
        url: `/api/v1/apps/${id}/secret/reset`
    });

// 授权应用
export const postAppsAuth = data =>
    request({
        method: 'post',
        url: '/api/v1/apps/auth',
        data
    });

// 修改应用状态
export const putAppStatus = ({ id, status }) => request({
        method: 'put',
        url: `/api/v1/apps/switch/${id}/${status}`
});