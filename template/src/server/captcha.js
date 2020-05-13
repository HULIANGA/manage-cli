/*
 * @Description: 文件说明
 * @Date: 2019-10-29 18:01:10
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-10-29 18:03:18
 */
import { request } from '@/utils/request';

// 获取验证码
export const getCaptcha = data =>
    request({
        method: 'get',
        url: '/api/v1/captcha',
        params: data
    });
