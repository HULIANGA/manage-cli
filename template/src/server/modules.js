/*
 * @Description: 文件说明
 * @Date: 2019-10-30 10:57:49
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-11-14 16:14:11
 */
import { request } from '@/utils/request';

// 获取模块列表
export const getModules = () => request({
    method: 'get',
    url: '/api/v1/modules'
});

// 修改模块
export const putModulesById = ({ id, data }) => request({
    method: 'put',
    url: `/api/v1/modules/${id}`,
    data
});

// 获取菜单列表
export const getModulesMenu = () =>
    request({
        method: 'get',
        url: '/api/v1/modules/menu'
    });