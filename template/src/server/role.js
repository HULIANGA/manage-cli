/*
 * @Description: 文件说明
 * @Date: 2019-10-25 17:04:25
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-11-14 16:23:58
 */
import { request } from '@/utils/request';

// 角色列表
export const getRoles = data =>
    request({
        method: 'get',
        url: '/api/v1/roles',
        params: data
    });

// 删除角色
export const deleteRolesById = ({ id }) =>
    request({
        method: 'delete',
        url: `/api/v1/roles/${id}`
    });

// 新增角色
export const postRoles = data =>
    request({
        method: 'post',
        url: '/api/v1/roles',
        data
    });

// 编辑角色
export const putRolesById = ({ id, data }) =>
    request({
        method: 'put',
        url: `/api/v1/roles/${id}`,
        data
    });