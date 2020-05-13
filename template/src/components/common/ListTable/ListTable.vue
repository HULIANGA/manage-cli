<template>
    <div class="list-table-container">
        <Spin v-show="loading" fix></Spin>
        <div class="table-head">
            <Row :gutter="gutter">
                <Col v-for="(column, i) in columns" :key="i" :span="column.span">{{ column.title }}</Col>
            </Row>
        </div>
        <div :class="['table-body', data.length === 0 ? 'empty-table' : '']">
            <div class="table-content">
                <div v-if="data.length === 0" class="empty-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="41" viewBox="0 0 64 41">
                        <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                            <ellipse fill="#F5F5F5" cx="32" cy="33" rx="32" ry="7" />
                            <g fill-rule="nonzero" stroke="#D9D9D9">
                            <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
                            <path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#FAFAFA" />
                            </g>
                        </g>
                    </svg>
                    <p>暂无数据</p>
                </div>
                <div v-for="(source, i) in data" :key="i" class="table-tr">
                    <div class="tr-head">
                        <Row :gutter="gutter" type="flex" justify="space-between">
                            <Col v-for="(column, j) in subColumns" :key="j" :span="column.span" :style="{ textAlign: column.align || 'left' }">{{ column.title }}：<Column :record="source" :column="column" :index="i"></Column></Col>
                        </Row>
                    </div>
                    <div class="tr-body">
                        <Row :gutter="gutter" type="flex" align="middle">
                            <Col v-for="(column, j) in columns" :key="j" :span="column.span" :style="{ textAlign: column.align || 'left' }">
                                <Column :record="source" :column="column" :index="i"></Column>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>

        <div class="table-page-container">
            <Page
                :pagination.sync="pagination"
                @on-change="handlePageChange"
            />
        </div>
    </div>
</template>
<script>
import Page from '@/components/Page.vue';
import { Spin } from 'view-design';
import Column from './Column';

export default {
    components: {
        Page,
        Column,
        Spin
    },
    props: {
        pagination: {
            type: Object,
            default: () => ({
                pageNum: 1,
                pageSize: 20,
                total: 0
            })
        },
        data: {
            type: Array,
            required: true
        },
        gutter: {
            type: Number,
            default: 24
        },
        subColumns: {
            type: Array,
            required: true
        },
        columns: {
            type: Array,
            required: true
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        };
    },
    methods: {
        handlePageChange() {
            this.$emit('update:pagination', this.pagination);
            this.$emit('change');
        }
    }
};
</script>

<style lang="less" scoped>
    @import '../../../assets/lib/custom.less';
    .list-table-container {
        position: relative;
        font-size: @font-size-small;
        line-height: @line-height-base;

        .table-head {
            font-weight: bold;
            background: @table-thead-bg;
            padding: @padding-sm;
            margin-bottom: @padding-sm;
            border: 1px solid @border-color-base;
        }

        .table-body {
            border-top: 1px solid @border-color-base;
            border-bottom: 1px solid @border-color-base;
            &.empty-table {
                border-top: none;
            }
            .table-tr {
                border: 1px solid @border-color-base;
                word-break: break-all;

                .tr-head {
                    padding: @padding-sm;
                    background: @table-thead-bg;
                    border-bottom: 1px solid @border-color-base;
                }

                .tr-body {
                    padding: @padding-sm;
                    transition: background-color .3s ease-in-out;
                    &:hover {
                        background: @table-td-hover-bg;
                    }
                }

                margin-bottom: @padding-sm;
            }
            .table-content {
                .table-tr:last-of-type {
                    margin-bottom: 0;
                    border-bottom: none;
                }
                .table-tr:first-of-type {
                    border-top: none;
                    border-bottom: 1px solid @border-color-base;
                }
            }
        }

        .empty-info {
            padding: @padding-md 0;
            text-align: center;
            color: rgba(0, 0, 0, 0.25);
            p {
                font-size: @font-size-small;
            }
        }

        .table-page-container {
            text-align: center;
        }
        :global(.ivu-list-vertical .ivu-list-item-extra) {
            flex-basis: 50%;
        }
        :global(.ivu-list-vertical .ivu-list-item-main) {
            flex-basis: 50%;
        }
    }
</style>