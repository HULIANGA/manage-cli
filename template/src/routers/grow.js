import HeaderAsideLayout from '@/layouts/HeaderAsideLayout';
/**
 * 增长服务模块
 */
const AuthList = resolve => require(['@/pages/Grow/AuthList'], resolve);
const AuthCode = resolve => require(['@/pages/Grow/AuthList/AuthCode'], resolve);
const AdOverviews = resolve => require(['@/pages/Grow/Overview/DashBoard'], resolve);
const Efficiency = resolve => require(['@/pages/Grow/Efficiency'], resolve);

// 增长服务
export default [
  {
    // 广告计划
    path: '/grow',
    component: HeaderAsideLayout,
    children: [
      {
        path: '/grow/auth',
        component: AuthList,
        meta: {
          name: '授权管理',
          keepAlive: true,
          code: 'growService:auth'
        }
      },
      {
        path: '/grow/dashboard',
        component: AdOverviews,
        meta: {
          name: '投放数据总览',
          keepAlive: true,
          code: 'growService:dashboard'
        }
      },
      {
        path: '/grow/efficiency',
        component: Efficiency,
        meta: {
          name: '投放人效分析',
          code: 'growService:efficiency'
        }
      },
      {
        path: '/grow/authCode',
        component: AuthCode,
        meta: {
          name: '授权',
          code: 'growService:auth:add'
        }
      }
    ]
  }
];
