export default {
    state: {
        list: [],
        defaultUrl: '/dashboard/index',
        authRouterList: [],
        active: '',
        keepUpdateList: []
    },
    mutations: {
        'router.keepUpdateList' (state, data) {
            if (!state.keepUpdateList.includes(data)) {
                state.keepUpdateList.push(data);
            }
        },
        'router.removekeepUpdateListItem' (state, data) {
            state.keepUpdateList = state.keepUpdateList.filter(url => url !== data);
        },
        'router.setAuthList' (state, data) {
            state.authRouterList = data;
        },
        'router.active' (state, data) {
            state.active = data;
        },
        'router.list' (state, obj) {
            const list = state.list;
            const data = obj;
            const campareList = list.map(url => url.path);
            if (campareList.includes(data.path)) {
                const index = campareList.findIndex(value => value === obj.path);
                list.splice(index, 1, data);
                state.list = list;
                // state.active = data.path;
            } else {
                list.push(data);
                state.list = list;
                // state.active = data.path;
            }
        },
        'router.removeItem' (state, url) {
            state.list = state.list.filter(item => {
                return item.path !== url;
            });
            if (!state.keepUpdateList.includes(url)) {
                state.keepUpdateList.push(url);
            }
        },
        'router.removeMethod' (state, data) {
            let list = [];
            const compare = state.list.map(item => item.path);
            const index = compare.findIndex(value => value === state.active);
            if (data === 'left') {
                list = state.list.slice(index, state.list.length);
            } else if (data === 'right') {
                list = state.list.slice(0, index + 1);
            } else if (data === 'both') {
                list = state.list.slice(index, index + 1);
            } else {
                list = [];
            }
            state.list = list;
        }
    }
};