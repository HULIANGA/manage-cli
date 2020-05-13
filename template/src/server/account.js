/*
 * @Description: 文件说明
 * @Date: 2019-10-29 17:20:06
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-11-14 16:00:48
 */
import { request } from '@/utils/request';
/**
 * 重置密码
 */
export const postAccountResetPassword = data =>
    request({
        method: 'post',
        url: '/api/v1/account/reset_password',
        data: data
    });