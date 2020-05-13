## mixinCommon

### activated
keepAlive组件激活时回调

### filters

| filters         | params                                                       | desc                                                                                 |
| --------------- | :----------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| zzmDateFormat   | `String|number:`value, `String:`format                       | 时间格式格式化,`format` 默认为'YYYY-MM-DD HH:MM:DD'                                  |
| zzmFormatNumer  | `String|number:`value,                                       | 数据格式转换 3 位显示 K，6 位显示 M,9 位显示 B                                       |
| zzmSymbolNumber | `String|number:`value, `String:`precision,`String:`separator | 数据格式转换`precision`保留几位小数默认不保留`separator`使用传入值切分数据默认不切分 |

### methods

| methods               | desc                                                            | return           |
| --------------------- | :-------------------------------------------------------------- | :--------------- |
| zzmSymbolNumberMethod | 数字格式化                                                      | `String|Number`  |
| zzmDateFormatMethod   | 时间格式转换 Moment                                             | `String`         |
| zzmFormatNumerMethod  | 数字显示格式转换 数据格式转换 3 位显示 K，6 位显示 M,9 位显示 B | `String`         |
| zzmIsEmptyMethod      | 验证参数是否为空                                                | `Boolean`        |
| zzmGetUrlParamsMethod | 获取 url 参数对象                                               | `Object`         |
| zzmDeepClone          | 深度复制对象 支持传入`Object|Array|String`                      | `Object`         |
| zzmIsEmptyObject      | `Object`                                                        | 验证对象是否为空 |
| zzmkeepUpdate         | 更新指定页面缓存                    |                  |
| closeCurTab           | 关闭当前页面对应tab                 |                  |

#### zzmkeepUpdate

| params | type     | desc                |
| ------ | :------- | :------------------ |
| url    | `String` | 传入地址 route.path |

#### zzmSymbolNumberMethod

| params    | type            | desc       |
| --------- | :-------------- | :--------- |
| value     | `String|Number` |            |
| precision | Number          | 默认不保留 |
| separator | String          | 默认不切分 |

#### zzmDateFormatMethod

| params | type            | desc                |
| ------ | :-------------- | :------------------ |
| value  | `String|Number` |                     |
| format | `String`        | YYYY-MM-DD HH:mm:ss |

#### zzmFormatNumerMethod

| params | type            |
| ------ | :-------------- |
| value  | `String|Number` |

#### zzmIsEmptyMethod

| params | type                                   |
| ------ | :------------------------------------- |
| value  | `String|Number|Array|Object|undefined` |

#### zzmGetUrlParamsMethod

| params | type     | desc     |
| ------ | :------- | :------- |
| url    | `String` | 传入地址 |

#### demo

```html
<template>
  <div>
    <div>1570272036000时间搓数据转换：{{1570272036000|zzmDateFormat}}</div>
    <div>
      2019-10-05 18:10:00时间转换YYYY-MM-DD：{{'2019-10-05
      18:10:00'|zzmDateFormat('YYYY-MM-DD')}}
    </div>
    <div>3400004000数据转换： {{zzmFormatNumerMethod(3400004000)}}</div>
    <div>120000000filters数据转换： {{'120000000'|zzmFormatNumer}}</div>
    <div>1234567890数据转换： {{1234567890|zzmSymbolNumber(2,',')}}</div>
    <div>
      1234567890.345678数据转换： {{1234567890.345678|zzmSymbolNumber(3,',')}}
    </div>
  </div>
</template>
```
