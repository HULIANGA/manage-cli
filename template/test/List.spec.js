/*
 * @Description: 文件说明
 * @Date: 2019-10-12 16:02:20
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-10-12 16:02:20
 */
import { shallowMount } from '@vue/test-utils';
import List from '@/components/List.vue';

describe('List.vue', () => {
    it('renders li for each item in props.items', () => {
        const items = ['1', '2'];
        const wrapper = shallowMount(List, {
            propsData: { items },
        });
        expect(wrapper.findAll('li')).toHaveLength(items.length);
    });

    it('matches snapshot', () => {
        const items = ['item 1', 'item 2'];
        const wrapper = shallowMount(List, {
            propsData: { items },
        });
        expect(wrapper.html()).toMatchSnapshot();
    });
});