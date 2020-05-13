# css使用

## 样式说明
本系统使用iview为ui框架，框架样式路径src/assets/lib，根据设计要求修改了默认样式

##统一语言
配合iview统一使用less

##统一主题
font-size、color、background-color、padding、margin、border-corlor、border-radius的样式不使用色号和大小，统一使用 src/assets/lib/custom.less 内变量。请勿使用w200，mr20这类class来设置宽度或者边距。

##统一布局
参照给出的列表、详情模板创建新页面。
页面路径：**待添加**

# 交互规范

##交互说明
基本交互例如hover、收缩等保持iview效果，**不能因为修改样式影响原交互效果**

## loading
1. 列表加载使用Spin组件(iview)增加loading效果
2. 后端交互操作按钮使用loading属性

## 系统反馈
1. 操作结果展示统一使用Result组件，组件路径：**待添加**
2. 文字提示例如接口返回结果，统一使用Notice组件(iview)，可展示标题和详细内容

## 二次确认
1. 列表上需二次确认的操作例如删除、修改状态，统一使用Poptip组件(iview)。**注意使用transfer否则超出table部分不会显示**
2. 编辑页的二次确认操作，一般是需要展示输入数据，统一使用Modal组件(iview)
3. 二次确认的按钮同样要有loading

## 表单验证
1. 输入框要有maxlength
2. 验证结果反馈统一使用Form组件(iview)的验证功能，非特殊情况不要使用Message提示来展示错误

##内容滚动
1. 浏览器的默认滚动条在windows上不美观，如需内容滚动统一使用Scroll组件实现，组件路径：[https://github.com/mercs600/vue2-perfect-scrollbar/tree/master](https://github.com/mercs600/vue2-perfect-scrollbar/tree/master)
2. 修改样式 .ps 的高度设置滚动内容高度
3. 修改样式 :global(.ps__rail-y) 可自定义滚动条样式
4. 可参考菜单栏的滚动实现，src/layouts/components/asideLeft/asideLeft.vue