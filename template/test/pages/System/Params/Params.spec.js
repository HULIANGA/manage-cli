/*
 * @Description: 文件说明
 * @Date: 2019-11-01 16:06:09
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-11-01 17:44:05
 */
import { shallowMount } from '@vue/test-utils';
import { Card } from 'view-design';
import SystemParams from '@/src/pages/System/Params/Params.vue';

describe('test SystemParams', () => {
    it('表格数据初始值为空数组', () => {
        const wrapper = shallowMount(SystemParams, {
            stubs: ['Card'],
        });
        expect(wrapper.vm.tableData.length).toBe(0);
    });
});