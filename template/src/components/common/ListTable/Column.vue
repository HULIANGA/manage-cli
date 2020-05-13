<script>
/**
    表格列渲染组件，根据传入的render函数显示内容
 */
import Vue from 'vue';
export default Vue.component('Column', {
    props: {
        column: {
            type: Object,
            required: true
        },
        record: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data() {
        return {};
    },
    render: function (createElement) {
        const { column, record, index } = this;
        if (column.render) {
            return column.render(createElement, record[column.key], record, index);
        } else {
            return createElement(
                'span', // 标签名称
                [
                    record[column.key] || '-',
                    this.$slots.default
                ] // 子节点数组
            );
        }
    }
});
</script>