<!--
 * @Author: your name
 * @Date: 2019-12-20 15:47:49
 * @LastEditTime: 2020-02-26 18:12:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zzm-manage-h5\src\layouts\components\content\content.vue
 -->
<template>
    <div class="tab-router-content">
        <Tabs type="card" class="tab-router" :value="active" :animated="false" @on-click="data => onTabClick(data)">
            <!-- tabPane 设置closable，key需要保持同name 对应不然组件删减会有bug -->
            <TabPane v-for="tab in tabs" :key="tab.path" :name="tab.path" :label="h => label(h, tab.meta.name || tab.path, tab.path)"></TabPane>
            <Dropdown v-if="hotKey" slot="extra" transfer @on-click="onDropClick">
                <Button style="width: 28px;">
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="left">
                        <Icon type="md-arrow-back" size="14" />
                        左侧关闭
                    </DropdownItem>
                    <DropdownItem name="right">
                        <Icon type="md-arrow-forward" size="14" />
                        右侧关闭
                    </DropdownItem>
                    <DropdownItem name="both">
                        <Icon type="md-close" size="14" />
                        关闭其他
                    </DropdownItem>
                    <DropdownItem name="all">
                        <Icon type="md-close-circle" size="14" />
                        全部关闭
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </Tabs>
        <Content>
            <LayoutContent></LayoutContent>
        </Content>
    </div>
</template>
<script type="text/babel">
import LayoutContent from '../content/content';
import { Badge } from 'view-design';
export default {
    components: {
        LayoutContent,
        // eslint-disable-next-line
        Badge
    },
    props: {
        hotKey: {
            default: true,
            type: Boolean
        }
    },
    data() {
        return {
            label: (h, name, path) => {
                return h('span', [
                    path === this.active ? <span><Badge status="processing" />{name}</span> : h('span', name),
                    h('Icon', {
                        props: {
                            type: 'md-close'
                        },
                        class: 'tab-route-icon',
                        on: {
                            click: event => {
                                event.stopPropagation();
                                this.onTabRemove(path);
                            }
                        }
                    })
                ]);
            },
            active: ''
        };
    },
    computed: {
        tabs() {
            console.log(this.$store.state.router.list);
            return this.$store.state.router.list.concat();
        }
    },
    watch: {
        '$store.state.router.active': {
            handler: function(data) {
                this.active = data;
            },
            immediate: true
        }
    },
    methods: {
        onTabClick(url) {
            let data = {};
            console.log(url, this.tabs);
            this.tabs.forEach(item => {
                if (item.path === url) {
                    data = item;
                    return;
                }
            });
            this.$router.push({ path: data.fullPath });
        },
        onTabRemove(url) {
            let index = 0;
            let compare = this.tabs.map(item => item.path);
            if (this.tabs.length > 1) {
                if (compare.length === 0 && this.$store.state.router.defaultUrl === this.$route.path) {
                } else if (compare.length === 0) {
                    this.$store.commit('router.removeItem', url);
                    this.$router.push({ path: this.$store.state.router.defaultUrl });
                } else {
                    this.$store.commit('router.removeItem', url);
                    index = compare.findIndex(value => value === url);
                    compare = this.tabs.map(item => item.path);
                    if (index >= compare.length) {
                        index = compare.length - 1;
                    }
                    this.$router.push(compare[index]);
                }
            } else {
                if (this.$store.state.router.defaultUrl !== this.$route.path) {
                    this.$store.commit('router.removeItem', url);
                    this.$router.push({ path: this.$store.state.router.defaultUrl });
                }
            }
        },
        onDropClick(value) {
            if (value === 'all') {
                if (this.$store.state.router.defaultUrl === this.$route.path) {
                    this.$store.commit('router.removeMethod', value);
                    setTimeout(() => {
                        this.$store.commit('router.list', this.$route);
                    });
                } else {
                    this.$store.commit('router.removeMethod', value);
                    this.$router.push({ path: this.$store.state.router.defaultUrl });
                }
            } else {
                this.$store.commit('router.removeMethod', value);
            }
        }
    }
};
</script>
<style scoped lang="less">
.tab-router-content {
    padding: 6px 0 12px 0;
    padding-bottom: 0;
    .tab-router {
        padding: 0 12px;
        :global(.tab-route-icon) {
            position: relative;
            right: -15px;
            color: #999;
            cursor: pointer;
        }
        :global(.tab-route-icon:hover) {
            color: #444;
        }
        :global(.ivu-tabs-bar) {
            margin-bottom: 0;
        }
        :global(.ivu-btn) {
            min-width: 32px;
            padding: 5px;
            border: none;
        }
        :global(.ivu-btn:active) {
            border: none;
            box-shadow: none;
        }
        :global(.ivu-tabs-tab) {
            background: #fff !important;
            color: #666;
            border: none !important;
        }
        :global(.ivu-tabs-tab:hover) {
            color: #3388ff !important;
        }
        :global(.ivu-tabs-content) {
            display: none;
        }
        :global(.ivu-tabs-nav-scrollable) {
            padding: 0 20px !important;
        }
        :global(.ivu-tabs-tab-active) {
            border: none !important;
            color: #3388ff !important;
        }
        :global(.ivu-tabs-bar) {
            border: none;
        }
    }
}
</style>
