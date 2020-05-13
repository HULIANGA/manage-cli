/*
 * @Author: minqun
 * @Date: 2020-02-25 10:14:07
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-02-25 11:34:21
 */
import HeaderAsideLayout from '@/layouts/HeaderAsideLayout';
/**
 * 公共模块
 */
const Exception404 = resolve => require(['@/pages/Exception/404'], resolve);
const Exception403 = resolve => require(['@/pages/Exception/403'], resolve);
const Exception500 = resolve => require(['@/pages/Exception/500'], resolve);
const Update = resolve => require(['@/pages/Exception/Update'], resolve);
const Dashboard = resolve => require(['@/pages/Dashboard'], resolve);
const Login = resolve => require(['@/pages/Login'], resolve);
const LoginCode = resolve => require(['@/pages/Login/LoginCode'], resolve);
const TESTVIEW = resolve => require(['@/pages/test'], resolve);
export default [
    {
        path: '/updating',
        component: Update,
        meta: {
            name: '系统升级中'
        }
    }, {
        path: '/exception',
        component: HeaderAsideLayout,
        meta: {
            name: '异常'
        },
        children: [{
            path: '404',
            component: Exception404,
            meta: {
                name: 404
            }
        }, {
            path: '403',
            component: Exception403,
            meta: {
                name: 403
            }
        }, {
            path: '500',
            component: Exception500,
            meta: {
                name: 500
            }
        }]
    }, {
        path: '/',
        redirect: '/dashboard/index'
    },
    {
        path: '/test',
        component: HeaderAsideLayout,
        children: [{
            path: '/test/index',
            component: TESTVIEW
        }]
    },
    {
        path: '/login',
        component: Login,
        name: 'login'
    },
    {
        path: '/loginCode',
        component: LoginCode
    },
    {
        path: '/dashboard',
        component: HeaderAsideLayout,
        children: [{
            path: '/dashboard/index',
            component: Dashboard,
            meta: {
                name: '首页',
                code: 'index'
            }
        }]
    }
];