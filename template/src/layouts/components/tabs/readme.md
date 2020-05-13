# 页面跳转 Tab 全局组件

| params     | type      | desc           |
| ---------- | :-------- | :------------- |
| hot-key    | `Boolean` | 是否显示快捷键 |

`备注：通过设置路由meta.alive来指定路由缓存`

#### 指定路由缓存 demo

        {
            path: '/strategy/abtest/list',
            component: StrategyABTestListNew,
            meta: {
                keepAlive: true
            }
        },

#### demo

```html
<Layout>
  <header>
    <LayoutHeader
      v-if="Object.keys(breadcrumb).length > 0"
      :breadcrumb="breadcrumb"
    />
  </header>
  <LayoutTabs></LayoutTabs>
</Layout>
```

#### 更新缓存 demo

`使用zzmkeepUpdate方法，更新缓存需要传入目标更新地址`

```js
handleSubmit() {
    this.$refs.basicForm.validate(valid => {
        if (valid) {
            this.$refs.otherForm.validate(async valid => {
                if (valid) {
                    this.isLoading = true;
                    const postData = {
                        ...this.$refs.basicForm.basicFormData,
                        ...this.$refs.otherForm.otherFormData
                    };
                    if (postData.app_key_type === 'auto') {
                        delete postData.app_key;
                        delete postData.app_secret;
                    }
                    let result;
                    if (this.type === 'add') {
                        result = await postApps(postData);
                    } else {
                        result = await putAppsById({
                            id: this.editId,
                            data: postData
                        });
                    }
                    const { data } = result;
                    if (data.code === 0) {
                        this.$Message.success('保存成功');
                        this.zzmkeepUpdate('/application/list');
                        this.$router.go(-1);
                    }
                    this.isLoading = false;
                }
            });
        }
    });
}
```

`在页面上添加keepAliveRefresh方法更新页面内容`

```js
keepAliveRefresh() {
    this.$refs.listFilter.formData = {};
    this.$refs.listTable.pageChange(1);
}
```