/*
 * @Description: 文件说明
 * @Date: 2019-10-28 10:38:42
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-11-14 16:20:45
 */
import { request } from '@/utils/request';

/**
 * 获取模块权限树
 */
export const getPrivilegesModules = data =>
    request({
        method: 'get',
        url: '/api/v1/privileges/modules',
        params: data
    });

/**
 * 获取角色拥有权限列表
 */
export const getPrivilegesOwn = data =>
    request({
        method: 'get',
        url: '/api/v1/privileges/own',
        params: data
    });

/**
 * 保存角色权限
 */
export const postPrivileges = data =>
    request({
        method: 'post',
        url: '/api/v1/privileges',
        data
    });