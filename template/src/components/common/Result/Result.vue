<template>
    <div class="result-container">
        <div class="result-icon-container">
            <icon404 v-if="type === '404'"></icon404>
            <icon403 v-else-if="type === '403'"></icon403>
            <icon500 v-else-if="type === '500'"></icon500>
            <Icon v-else :class="['result-icon', 'result-icon-' + type]" :type="icon" />
        </div>
        <div class="result-title">{{ resultTitle }}</div>
        <div v-if="resultSubTitle" class="result-title-sub">{{ resultSubTitle }}</div>
        <slot></slot>
        <div class="action-buttons">
            <slot name="button"></slot>
            <Button v-if="type === '404' || type === '403' || type === '500'" type="primary" @click="goHome">返回首页</Button>
            <template v-else>
                <Button v-if="cancelBtn" @click="cancelBtnCbk">{{ cancelBtn }}</Button>
                <Button v-if="confirmBtn" type="primary" @click="confirmBtnCbk">{{ confirmBtn }}</Button>
            </template>
        </div>
    </div>
</template>

<script>
    import icon404 from './404.vue';
    import icon403 from './403.vue';
    import icon500 from './500.vue';
    export default {
        name: 'Result',
        components: {
            icon404,
            icon403,
            icon500
        },
        props: {
            confirmBtn: {
                type: String
            },
            cancelBtn: {
                type: String
            },
            confirmBtnCbk: {
                type: Function
            },
            cancelBtnCbk: {
                type: Function
            },
            title: {
                type: String,
                default: ''
            },
            subTitle: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'success'
            }
        },
        data() {
            return {
            };
        },
        computed: {
            icon() {
                let icon = '';
                switch (this.type) {
                    case 'success':
                        icon = 'ios-checkmark';
                        break;
                    case 'fail':
                        icon = 'ios-close';
                        break;
                    case 'loading':
                        icon = 'ios-loading';
                        break;
                    default:
                        icon = 'ios-checkmark';
                        break;
                }
                return icon;
            },
            resultSubTitle() {
                if (this.subTitle) {
                    return this.subTitle;
                }
                let subTitle = '';
                switch (this.type) {
                    case '404':
                        subTitle = '抱歉，你访问的页面不存在';
                        break;
                    case '403':
                        subTitle = '抱歉，你无权访问该页面';
                        break;
                    case '500':
                        subTitle = '抱歉，服务器出错了';
                        break;
                    default:
                        subTitle = '';
                        break;
                }
                return subTitle;
            },
            resultTitle() {
                if (this.title) {
                    return this.title;
                }
                let title = '';
                switch (this.type) {
                    case 'success':
                        title = '操作成功';
                        break;
                    case 'fail':
                        title = '操作失败';
                        break;
                    case 'loading':
                        title = '加载中';
                        break;
                    case '404':
                        title = '404';
                        break;
                    case '403':
                        title = '403';
                        break;
                    case '500':
                        title = '500';
                        break;
                    default:
                        title = '操作成功';
                        break;
                }
                return title;
            }
        },
        methods: {
            goHome() {
                this.closeCurTab();
                this.$router.push({ path: '/' });
            }
        }
    };
</script>

<style lang="less" scoped>
    .result-container {
        margin: 0 auto;
        padding: 48px 32px;
        text-align: center;
        .result-icon-container {
            margin-bottom: 24px;
        }
        .result-icon {
            font-size: 72px;
            color: #ffffff;
            border-radius: 50%;
            overflow: hidden;
        }
        .result-icon-success {
            background: #19be6b;
        }
        .result-icon-fail {
            background: #ed4014;
        }
        .result-icon-loading {
            color: #2d8cf0;
            animation: ani-demo-spin 1s linear infinite;
        }
        .result-title {
            margin-bottom: 16px;
            color: #17233d;
            font-weight: 500;
            font-size: 24px;
            line-height: 32px;
        }
        .result-title-sub {
            margin-bottom: 24px;
            color: #808695;
            font-size: 14px;
            line-height: 22px;
        }
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
</style>