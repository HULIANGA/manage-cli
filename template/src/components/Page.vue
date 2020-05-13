<!--
 * @Description: 文件说明
 * @Date: 2019-10-22 10:18:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-12 11:59:07
 -->
<template>
    <Page
        show-elevator
        show-sizer
        show-total
        :current.sync="pagination.pageNum"
        :page-size.sync="pagination.pageSize"
        :total="parseInt(pagination.total)"
        :page-size-opts="[20, 50, 100, 200]"
        v-bind="$attrs"
        @on-change="handlePageChange"
        @on-page-size-change="handlePageSizeChange"
    />
</template>
<script>
import { Page } from 'view-design';
export default {
    components: {
        Page
    },
    props: {
        pagination: {
            type: Object,
            default: () => ({
                pageNum: 1, // 页码
                pageSize: 20, // 每页大小
                total: 0 // 全部数据条数
            })
        }
    },
    methods: {
        // 页码变化
        handlePageChange(pageNum) {
            this.$emit('update:pagination.pageNum', pageNum);
            // 页码发生变化
            this.$emit('on-change');
        },
        handlePageSizeChange(pageSize) {
            console.log('pageSize: ', pageSize);
            this.$emit('update:pagination', {
                pageNum: 1, // 页码
                pageSize: pageSize, // 每页大小
                total: this.pagination.total // 全部数据条数
            });
            this.$emit('on-change');
        }
    }
};
</script>
