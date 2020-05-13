## directives

#### 平台常用指令

| methods     | params                | desc                                                                                       |
| :---------- | :-------------------- | :----------------------------------------------------------------------------------------- |
| v-zzm-copy  | `String`:value        | 文本复制,可传可不传                                                                        |
| v-zzm-auth  | `String|Number`:value | 权限控制，需要传入权限值，否则如果使用该指令元素会被移除                                   |
| v-zzm-ellip | `Object`              | 文本省略，{`String`:width,`Number`:line},如：{width: '100px',line:1}默认为 auto,line: 1or2 |

#### demo

`备注：权限列表取自 Store.State.app.auth`

```html
<template>
  <div>
    <div v-zzm-ellip="{width:'100px',line: 1}">
      文本超出省略文本超出省略文本超出省略文本超出省略
    </div>
    <div v-zzm-ellip="{width:'100px',line: 2}">
      文本超出省略文本超出省略文本超出省略文本超出省略
    </div>
    <div v-zzm-copy style="cursor:pointer;">文本复制不需要传参数</div>
    <div>
      文本复制传参数
      <Icon
        type="md-albums"
        v-zzm-copy="'复制传参数'"
        style="cursor:pointer;"
      />
    </div>
    <div v-zzm-auth="3">Store.state.app.auth查看权限</div>
    <div v-zzm-auth="5">无权限查看</div>
  </div>
</template>
```
