<!--
 * @Author: your name
 * @Date: 2019-12-20 15:47:49
 * @LastEditTime: 2020-02-26 16:49:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zzm-manage-h5\src\layouts\components\content\content.vue
 -->
<template>
    <div id="routerViewContainer" class="main">
        <div class="page-container page-component">
            <keep-alive>
                <router-view v-if="alive" />
            </keep-alive>
            <router-view v-if="!alive" />
        </div>
    </div>
</template>
<style>
@import 'content.css';
</style>
<script type="text/babel">
export default {
    name: 'VContent',
    components: {},
    data() {
        return {
            alive: false
        };
    },
    watch: {
        $route: {
            handler: function() {
                this.alive = !!(this.$route.meta && this.$route.meta.keepAlive);
            },
            immediate: true
        }
    }
};
</script>
