/*
 * @Author: minqun
 * @Date: 2020-02-25 10:10:51
 * @Last Modified by: zhongwei4@meicloud.com
 * @Last Modified time: 2020-04-01 17:48:21
 */
import store from '../store';
import { Message } from 'view-design';
export const zzmCopy = Vue => {
  // 复制指令
  Vue.directive('zzm-copy', {
    inserted: (el, binding, vnode) => {
      let input;
      if (!document.getElementById('copyDesc')) {
        input = document.createElement('input');
        input.id = 'copyDesc';
        input.style = 'position:absolute;top: -10000px;right: -10000px;';
        el.appendChild(input);
      } else {
        input = document.getElementById('copyDesc');
      }

      el.onclick = function(dom) {
        input.value = binding.value ? binding.value : dom.target.innerText;
        input.select(); // 选择对象

        document.execCommand('Copy'); // 执行浏览器复制命令
        Message.success({
          content: '复制成功'
        });
      };
    }
  });
};

function authInserted(el, binding) {
  if (store.state.app.auth && store.state.app.auth.length) {
      if (!store.state.app.auth.includes(binding.value)) {
          const parent = el.parentNode;
          parent.removeChild(el);
      }
  } else {
      const parent = el.parentNode;
      parent.removeChild(el);
  }
}
export const zzmAuth = Vue => {
  // 权限指令
  Vue.directive('zzm-auth', {
    inserted: (el, binding) => {
      authInserted(el, binding);
    }
  });
};
export const zzmEllip = Vue => {
  // 文本省略指令
  Vue.directive('zzm-ellip', {
    bind: (el, binding) => {
      const opt = binding.value;
      if (opt && opt !== undefined) {
        if (opt.line === 2) {
          el.className = el.className + 'two-line';
        } else {
          el.className = el.className + 'one-line';
        }
        el.style = `width: ${opt.width};`;
      }
    }
  });
};

export const getTrim = Vue => {
  Vue.directive('get-trim', {
    bind: function(el, binding, vnode) {
      const _this = vnode.context;
      // console.log(_this, el, binding);
      _this.getTrimHandler = function(e) {
        if (binding.expression) {
          const keys = binding.expression.split('.');
          const target_key = keys.pop();

          if (keys.length === 0) {
            _this.$set(_this, `${target_key}`, e.targe.value.trim());
          } else if (keys.length === 1) {
            _this.$set(
              _this[`${keys[0]}`],
              `${target_key}`,
              e.target.value.trim()
            );
          } else if (keys.length === 2) {
            _this.$set(
              _this[`${keys[0]}`][`${keys[1]}`],
              `${target_key}`,
              e.target.value.trim()
            );
            // do somthing
          } else if (keys.length === 3) {
            _this.$set(
              _this[`${keys[0]}`][`${keys[1]}`][`${keys[2]}`],
              `${target_key}`,
              e.target.value.trim()
            );
          }
        }
        e.target.value = e.target.value.trim();
      };
      el.addEventListener('change', _this.getTrimHandler);
    },
    unbind: function(el, binding, vnode) {
      const _this = vnode.context;
      el.removeEventListener('change', _this.getTrimHandler);
    }
  });
};
