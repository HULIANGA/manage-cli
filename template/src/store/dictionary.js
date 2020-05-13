import Vue from 'vue';
import { getDictByCode } from '@/server/product';
export default {
  state: {},
  getters: {
    // 根据key值和code来查对应value
    findValue: state => async (key, code) => {
      if (key && code) {
        if (state[key] && state[key].length > 0) {
          const target = state[key].find(i => i.value === code);
          return target ? target.label : '';
        } else {
          return new Promise((resolve, reject) => {
            getDictByCode(key).then(res => {
              const { data } = res;
              if (data.code === 0) {
                const databases = data.data.map(obj => ({
                  label: obj.val,
                  value: obj.code
                }));
                Vue.set(state, `${key}`, databases);
                const target = state[key].find(i => i.value === code);
                resolve(target ? target.label : '');
              } else {
                throw Error('Can not find parameters from server!');
              }
            });
          });
        }
      } else {
        return '';
      }
    }
  },
  mutations: {
    'dictionary.setState'(state, data) {
      Vue.set(state, `${data.name}`, data.values);
      // state[data.name] = data.values;
    }
  }
};
