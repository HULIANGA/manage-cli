/*
 * @Author: minqun
 * @Date: 2020-02-25 10:10:51
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-02-28 16:12:29
 */
var moment = require('moment');

function zzmFormatFunc(value) {
  const str = String(value);
  const sr = str.split('.');
  const n = sr[0].length;
  let slit = 1;
  let dm = '';
  if (n >= 4) {
    slit = 0.001;
    dm = 'K';
  }
  if (n >= 7) {
    slit = 0.000001;
    dm = 'M';
  }
  if (n >= 10) {
    slit = 0.000000001;
    dm = 'B';
  }
  const data = value * slit;
  const dataPoint = String(data).split('.');
  if (dataPoint.length > 1 && dataPoint[0] !== '0') {
    return data.toFixed(1) + dm;
  } else {
    return data + dm;
  }
}
// 优化数字四舍五入
function floatBeat(num, pz) {
  const str = String(num);
  if (str.includes('.')) {
    const nrr = str.split('.');
    let n = nrr[1];
    n = '0.' + nrr[1];
    if (nrr[1].substr(pz, 1) === 5 && num.toFixed(pz) < num) {
      const an = Number().toFixed(pz) + '1';

      nrr[1] = Number(n) + Number(an);
    } else {
      nrr[1] = Number(n).toFixed(pz);
    }
    const perz = Number(nrr[0]) + Number(nrr[1]);
    return perz.toFixed(pz);
  } else {
    return num.toFixed(pz);
  }
}

function zzmSymbolNumberFunc(num, precision = 2, separator) {
  var parts;
  // 判断是否为数字
  if (!isNaN(parseFloat(num)) && isFinite(num)) {
    // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
    // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
    // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
    // 的值变成了 12312312.123456713
    num = Number(num);
    // 处理小数点位数
    num = (typeof precision !== 'undefined' ?
      floatBeat(num, precision) :
      num
    ).toString();
    // 分离数字的小数部分和整数部分
    parts = num.split('.');
    parts[0] = parts[0]
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ''));
    return parts.join('.');
  }
  return NaN;
}
export default {
  filters: {
    zzmDateFormat: (value, format) => {
      return format !== undefined ?
        moment(value).format(format) :
        moment(value).format('YYYY-MM-DD HH:mm:ss');
    },
    zzmFormatNumer: value => {
      return zzmFormatFunc(value);
    },
    zzmSymbolNumber: (value, precision, separator) => {
      return zzmSymbolNumberFunc(value, precision, separator);
    }
  },
  data() {
    return {};
  },
  activated() {
    /**
         * 调用zzmkeepUpdate之后回到已缓存的列表页时。需要刷新已缓存的数据
         * 直接修改route.meta.keepAlive为ture不行
         * 因为这样改页面就不会继续缓存了
         * ****************************
         * VUE在 2.2.0 及其更高版本中，activated 和 deactivated 将会在 <keep-alive> 树内的所有嵌套组件中触发。
         * 所以在src/layouts/components/content/content.vue内增加了id="routerViewContainer"用来判断是否是页面组件
         * 在需要的页面methods内定义方法keepAliveRefresh刷新数据
         */
    if (this.$parent.$el.getAttribute('id') === 'routerViewContainer') {
      if (this.$store.state.router.keepUpdateList.includes(this.$route.path)) {
        this.keepAliveRefresh && this.keepAliveRefresh();
        this.$store.commit('router.removekeepUpdateListItem', this.$route.path);
      }
    }
  },
  methods: {
    /**
         * @desc 数字格式化
         * @param  value - 处理数字
         * @param  precision - 小数点位数
         * @param separator - 分隔号不传为''
         */
    zzmSymbolNumberMethod(value, precision, separator) {
      return zzmSymbolNumberFunc(value, precision, separator);
    },
    /**
         * @desc: 时间格式转换 Moment
         * @param value 时间搓 / new Date()/ String Date()
         * @param format 时间格式
         */
    zzmDateFormatMethod(value, format) {
      return format !== undefined ?
        moment(value).format(format) :
        moment(value).format('YYYY-MM-DD HH:mm:ss');
    },
    /**
         * @desc: 数字显示格式转换
         * @param value 参数
         */
    zzmFormatNumerMethod(value) {
      return zzmFormatFunc(value);
    },
    /**
         * @desc: 参数是否为空
         * @param value 参数
         */
    zzmIsEmptyMethod(value) {
      const data = String(value);
      return (
        data === 'null' || data === undefined || data === '' || data === []
      );
    },
    /**
         * @desc: 获取url参数对象
         * @param search 参数
         */
    zzmGetUrlParamsMethod(url) {
      const queryString =
                (url && url.split('?')[1]) || location.search.split('?')[1] || '';
      const queryList = queryString.split('&');
      const result = {};
      queryString &&
                queryList.map(item => {
                  const keyValue = item.split('=');
                  result[keyValue[0]] = decodeURIComponent(keyValue[1]);
                });
      return result;
    },
    /**
         * @desc 判断是否空对象
         * @param {Object} obj - 验证成功回调函数
         */
    zzmIsEmptyObject(obj) {
      return Object.keys(obj).length === 0;
    },
    /**
         * @desc 深度处理对象复制
         * @param {Object} obj - 验证成功回调函数
         */
    zzmDeepClone(obj) {
      function getType(obj) {
        if (Object.prototype.toString.call(obj) === '[object Object]') {
          return 'Object';
        } else if (Object.prototype.toString.call(obj) === '[object Array]') {
          return 'Array';
        } else {
          return 'nomal';
        }
      }
      if (getType(obj) === 'nomal') {
        return obj;
      } else {
        var newObj = getType(obj) === 'Object' ? {} : [];
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            newObj[key] = this.zzmDeepClone(obj[key]);
          }
        }
      }
      return newObj;
    },
    /**
         * @desc 路由缓存刷新地址传入方法
         * @param {String} url - 路由path
         */
    zzmkeepUpdate(url) {
      this.$store.commit('router.keepUpdateList', url);
    },
    /**
         * @desc 关闭当前页面对应的tab
         */
    closeCurTab() {
      this.$store.commit('router.removeItem', this.$route.path);
    }
  }
};