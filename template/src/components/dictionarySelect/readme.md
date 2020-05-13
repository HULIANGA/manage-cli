# 数据字典选择器

`备注： 支持iview 4.0 select组件参数，相关参数参考：https://www.iviewui.com/components/select#API`

#### 补充参数

| params   | type   | desc                                                                    |
| :------- | :----- | :---------------------------------------------------------------------- |
| dataType | String | 数据参数：`agents|business_type|business|company|product_line|platform` |

`备注： 数据缓存在Store.dictionary`

    dataType:
        agents: []
        business_type: []
        business: []
        company: []
        product_line: []
        platform: []

#### demo

```html
<template>
  <div>
    <dictionarySelect
      v-model="value"
      @on-change="onChange"
      dataType="agents"
    ></dictionarySelect>
    <dictionarySelect
      v-model="value"
      @on-change="onChange"
      dataType="business"
    ></dictionarySelect>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ""
      };
    },
    methods: {
      onChange(value) {
        console.log("chamhe", value);
      }
    }
  };
</script>
```
