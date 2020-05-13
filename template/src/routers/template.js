import HeaderAsideLayout from '@/layouts/HeaderAsideLayout';

const TemplateList = resolve => require(['@/pages/Template/List'], resolve);
const TemplateListNew = resolve => require(['@/pages/Template/ListNew'], resolve);
const TemplateDetail = resolve => require(['@/pages/Template/Detail'], resolve);
const TemplateDetailStep = resolve => require(['@/pages/Template/DetailStep'], resolve);

export default [{
    path: '/template',
    component: HeaderAsideLayout,
    children: [{
      path: '/template/list',
      component: TemplateList,
      meta: {
        keepAlive: true,
        name: '列表模板1'
      }
    }, {
      path: '/template/listNew',
      component: TemplateListNew,
      meta: {
        keepAlive: true,
        name: '列表模板2'
      }
    }, {
      path: '/template/detail',
      component: TemplateDetail,
      meta: {
        name: '详情模板1'
      }
    }, {
      path: '/template/detailStep',
      component: TemplateDetailStep,
      meta: {
        name: '详情模板2'
      }
    }]
}];