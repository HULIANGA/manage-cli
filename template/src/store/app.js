export default {
  state: {
    // apps-filter组件获取的应用列表
    apps: [],
    auth: window.localStorage.getItem('authConfig') ? JSON.parse(window.localStorage.getItem('authConfig')).auth : [],
    menu: window.localStorage.getItem('menuConfig') ? JSON.parse(window.localStorage.getItem('menuConfig')).menu : [],
    noAuthRoute: [
      '/login',
      '/exception/404',
      '/exception/403',
      '/exception/500',
      '/updating'
    ]
  },
  mutations: {
    setApps(state, apps) {
      state.apps = apps;
    },
    'app.setAuth' (state, auth) {
      window.localStorage.setItem('authConfig', JSON.stringify({
        auth
      }));
      state.auth = auth;
    },
    'app.setMenu' (state, menu) {
      window.localStorage.setItem('menuConfig', JSON.stringify({
        menu
      }));
      state.menu = menu;
    }
  }
};
