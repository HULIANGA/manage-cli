/*
 * @Description: 文件说明
 * @Date: 2019-10-07 19:09:02
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-12-12 11:26:08
 */
export const dateFormat = timestamp => {
  if (!timestamp) {
    return;
  }
  const date = new Date(timestamp);
  if (!date) {
    return timestamp;
  }
  const y = date.getFullYear();
  if (!y) {
    return timestamp;
  }
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let m1 = date.getMinutes();
  // let s = date.getSeconds();
  m = m < 10 ? '0' + m : m;
  d = d < 10 ? '0' + d : d;
  h = h < 10 ? '0' + h : h;
  m1 = m1 < 10 ? '0' + m1 : m1;
  // s = s < 10 ? '0' + s : s;

  return y + '-' + m + '-' + d + ' ' + h + ':' + m1;
};

// 获取菜单所有路由对象信息
export const getAllPath = (children, path = '', obj = {}) => {
  if (children && children.length) {
    children.forEach(item => {
      const fullPath = `${path}${item.path}`;
      obj[fullPath] = {
        ...item,
        path: fullPath
      };
      getAllPath(item.children, fullPath, obj);
    });
  }
};

/**
 * @desc 获取日期期间
 * @return 日期期间
 */
export function getDatePeriod() {
  const now = new Date(); // 当天
  const nowMonth = now.getMonth(); // 当前月
  let nowYear = now.getYear(); // 当前年
  nowYear += nowYear < 2000 ? 1900 : 0;
  const weekday = now.getDay(); // 星期几
  const thisMouthStart = new Date(nowYear, nowMonth, 1);
  const lastMouthDate = new Date(); // 上月日期
  lastMouthDate.setDate(1);
  lastMouthDate.setMonth(lastMouthDate.getMonth() - 1);
  const lastMouth = lastMouthDate.getMonth(); // 上月日期
  // 本周周一
  const monday = new Date(1000 * 60 * 60 * 24 * (1 - weekday) + now.getTime());
  // 获取dateNumber天前
  function dateSove(dateNumber) {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * dateNumber);
    return {
      start,
      end
    };
  }
  // 获得某月的天数
  function getMonthDays(myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  }
  return {
    today: {
      text: '今天',
      value() {
        const result = dateSove(0);
        return [result.start, result.end];
      }
    },
    yesterDay: {
      text: '昨天',
      value() {
        const result = dateSove(1);
        return [result.start, result.start];
      }
    },
    sevenDay: {
      text: '过去7天',
      value() {
        const result = dateSove(6);
        return [result.start, result.end];
      }
    },
    fourteenDay: {
      text: '过去14天',
      value() {
        const result = dateSove(13);
        return [result.start, result.end];
      }
    },
    mouthBefore: {
      text: '过去30天',
      value() {
        const result = dateSove(29);
        return [result.start, result.end];
      },
      values: dateSove(29)
    },
    thisWeek: {
      text: '本周',
      value() {
        return [new Date(monday - 3600 * 1000 * 24), now];
      }
    },
    lastWeek: {
      text: '上周',
      value() {
        return [
          new Date(monday - 3600 * 1000 * 24 * 8),
          new Date(monday - 3600 * 1000 * 24 * 2)
        ];
      }
    },
    thisMouth: {
      text: '本月',
      value() {
        return [thisMouthStart, now];
      }
    },
    lastMouth: {
      text: '上个月',
      value() {
        return [
          new Date(nowYear, lastMouth, 1),
          new Date(nowYear, lastMouth, getMonthDays(lastMouth))
        ];
      }
    }
  };
}

/**
 * @desc 日期期间格式化为数组
 */
export function datePeriodFormat() {
  const datePeriods = getDatePeriod();
  const types = ['today', 'yesterDay', 'sevenDay', 'fourteenDay', 'mouthBefore', 'thisWeek', 'lastWeek', 'thisMouth', 'lastMouth'];
  return types.map(item => datePeriods[item]);
}

/**
 * 获取权限菜单分组
 */
export const getMuneGroups = (data) => {
  const menuGroups = [];
  for (let i = 0; i < data.length; i++) {
    if (menuGroups.indexOf(data[i].group_name) < 0) {
      menuGroups.push(data[i].group_name);
    }
  }
  return menuGroups;
};

/**
 * 将权限列表转为树形结构
 */
export const getJsonTree = (data, parentId) => {
  const itemArr = [];
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    if (node.parent_id === parentId) {
      const newNode = Object.assign({}, node);
      newNode.title = newNode.module_name;
      /* if (newNode.resource_id) {
                newNode.title = newNode.operation_name;
            } else {
                newNode.title = newNode.module_name;
            } */
      newNode.expand = true;
      newNode.children = node.module_id ? getJsonTree(data, node.module_id) : getJsonTree(data, node.id);

      if (!newNode.operation_name) { // 导航菜单树
        itemArr.push(newNode);
      } else { // 权限菜单树
        let isExisted = false;
        for (let j = 0; j < itemArr.length; j++) {
          if (itemArr[j].module_id === newNode.module_id) {
            isExisted = true;
          }
        }
        if (!isExisted) {
          itemArr.push(newNode);
          for (let k = 0; k < data.length; k++) { // 添加操作资源
            if (data[k].resource_id && data[k].module_id === newNode.module_id) {
              itemArr[itemArr.length - 1].children = itemArr[itemArr.length - 1].children || [];
              const newOperationNode = Object.assign({}, data[k]);
              newOperationNode.title = newOperationNode.operation_name;
              itemArr[itemArr.length - 1].children.push(newOperationNode);
            }
          }
        }
      }
    }
  }
  return itemArr;
};

export const getDateString = date => {
  if (typeof date !== 'object') return date;
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  if (m < 10) {
    m = '0' + m;
  }
  let d = date.getDate();
  if (d < 10) {
    d = '0' + d;
  }
  return y + '-' + m + '-' + d;
};
export const deepClone = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (obj instanceof Date) return obj;
  const result = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
};

// 只有对象才string
export const JsonStringfy = (obj) => {
  if (typeof obj === 'object') {
    return JSON.stringify(obj);
  }
  return obj;
};

// 只解析数组和json
export const JsonParse = (obj) => {
  if (['{', '['].includes(obj)) {
    return JSON.parse(obj);
  }
  return obj;
};

/**
 * @desc 列表名字过滤展示
 * @param {String} list 列表
 * @param {String,Number} idKey 主键的key
 * @param {String} nameKey 展示字段的key
 * @param {String} target 目标值
 */
export const listNameFilter = (list, idKey, nameKey, target) => {
  const result = list.filter(item => item[idKey] === target);
  return result && result.length > 0 ? result[0][nameKey] : '';
};

export const timeZones = [{
  label: 'UTC-12（IDL - 国际换日线）',
  value: 'UTC-12:00'
},
{
  label: 'UTC-11 （MIT - 中途岛标准时间）',
  value: 'UTC-11:00'
},
{
  label: 'UTC-10（HST - 夏威夷-阿留申标准时间）',
  value: 'UTC-10:00'
},
{
  label: 'UTC-9:30（MSIT - 马克萨斯群岛标准时间）',
  value: 'UTC-09:30'
},
{
  label: 'UTC-9（AKST - 阿拉斯加标准时间）',
  value: 'UTC-09:00'
},
{
  label: 'UTC-8（PST - 太平洋标准时间A）',
  value: 'UTC-08:00'
},
{
  label: 'UTC-7（MST - 北美山区标准时间）',
  value: 'UTC-07:00'
},
{
  label: 'UTC-6（CST - 北美中部标准时间）',
  value: 'UTC-06:00'
},
{
  label: 'UTC-5（EST - 北美东部标准时间）',
  value: 'UTC-05:00'
},
{
  label: 'UTC-4（AST - 大西洋标准时间）',
  value: 'UTC-04:00'
},
{
  label: 'UTC-3:30（NST - 纽芬兰岛标准时间）',
  value: 'UTC-03:30'
},
{
  label: 'UTC-3（SAT - 南美标准时间）',
  value: 'UTC-03:00'
},
{
  label: 'UTC-2（BRT - 巴西时间）',
  value: 'UTC-02:00'
},
{
  label: 'UTC-1（CVT - 佛得角标准时间）',
  value: 'UTC-01:00'
},
{
  label: 'UTC（WET - 欧洲西部时区，GMT - 格林威治标准时间）',
  value: 'UTC+00:00'
},
{
  label: 'UTC+1（CET - 欧洲中部时区）',
  value: 'UTC+01:00'
},
{
  label: 'UTC+2（EET - 欧洲东部时区）',
  value: 'UTC+02:00'
},
{
  label: 'UTC+3（MSK - 莫斯科时区）',
  value: 'UTC+03:00'
},
{
  label: 'UTC+3:30（IRT - 伊朗标准时间）',
  value: 'UTC+03:30'
},
{
  label: 'UTC+4（META - 中东时区A）',
  value: 'UTC+04:00'
},
{
  label: 'UTC+4:30（AFT- 阿富汗标准时间）',
  value: 'UTC+04:30'
},
{
  label: 'UTC+5（METB - 中东时区B）',
  value: 'UTC+05:00'
},
{
  label: 'UTC+5:30（IDT - 印度标准时间）',
  value: 'UTC+05:30'
},
{
  label: 'UTC+5:45（NPT - 尼泊尔标准时间）',
  value: 'UTC+05:45'
},
{
  label: 'UTC+6（BHT - 孟加拉标准时间）',
  value: 'UTC+06:00'
},
{
  label: 'UTC+6:30（MRT - 缅甸标准时间）',
  value: 'UTC+06:30'
},
{
  label: 'UTC+7（IST - 中南半岛标准时间）',
  value: 'UTC+07:00'
},
{
  label: 'UTC+8（EAT - 东亚标准时间/中国标准时间(BJT)）',
  value: 'UTC+08:00'
},
{
  label: 'UTC+9（FET- 远东标准时间）',
  value: 'UTC+09:00'
},
{
  label: 'UTC+9:30（ACST - 澳大利亚中部标准时间）',
  value: 'UTC+09:30'
},
{
  label: 'UTC+10（AEST - 澳大利亚东部标准时间）',
  value: 'UTC+10:00'
},
{
  label: 'UTC+10:30（FAST - 澳大利亚远东标准时间）',
  value: 'UTC+10:30'
},
{
  label: 'UTC+11（VTT - 瓦努阿图标准时间）',
  value: 'UTC+11:00'
},
{
  label: 'UTC+11:30（NFT - 诺福克岛标准时间）',
  value: 'UTC+11:30'
},
{
  label: 'UTC+12（PSTB - 太平洋标准时间B）',
  value: 'UTC+12:00'
},
{
  label: 'UTC+12:45（CIT - 查塔姆群岛标准时间）',
  value: 'UTC+12:45'
},
{
  label: 'UTC+13（PSTC - 太平洋标准时间C）',
  value: 'UTC+13:00'
},
{
  label: 'UTC+14（PSTD - 太平洋标准时间D）',
  value: 'UTC+14:00'
}
];