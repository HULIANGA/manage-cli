<template>
    <div
        :class="[
            'logic-group',
            group.length > 1 && !single ? 'logic-group-multi' : ''
        ]"
    >
        <div>
            <LogicItem
                v-for="(item, idx) in group"
                :key="idx"
                :audiences="audiences"
                :value.sync="item"
                :idex="idx"
                :length="group.length"
                :single="single"
                :sub="sub"
                :title="title"
                :group-operator="operator"
                @remove="handleRemove"
                @item-change="handleItemChange"
            />
        </div>
        <Button v-if="!single" type="dashed" long @click="handleAdd">{{
            `添加“${operatorOpt.find(i => i.operator === operator).name}”条件组`
        }}</Button>
    </div>
</template>
<script>
// :operator="opts[idx]"
import { getAllAudiences, getAbAudiencesValuesByCode } from '@/server/ab.js';
const operatorOpt = [
  {
    operator: '||',
    name: '或'
  },
  {
    operator: '&&',
    name: '且'
  }
];
export default {
  name: 'LogicGroup',
  componentsName: 'LogicGroup',
  props: {
    single: Boolean,
    sub: {
      type: String,
      default: '如果需要用户在指定的情况下不匹配到方案中，请设置释放条件'
    },
    title: {
      type: String,
      default: '释放条件'
    },
    scoped: {
      type: Object,
      default: () => ({
        page_num: 1,
        page_size: 100000,
        status: 1
      })
    },
    value: {
      type: Array,
      default: () => this.single ? [] : [{ audience_group: 0, group_operator: this.operator || '||', audience_value: '' }]
    },
    operator: {
      type: [String, Number],
      default: () => '||'
    },
    audiencesFilter: { // 只显示某些受众条件
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      itemsValue: [],
      audiences: [],
      operatorOpt,
      group: [[{ audience_group: 0, group_operator: '||', audience_value: '' }]],
      // item级别的operator列表
      opts: []
    };
  },
  computed: {
    ruleName() {
      return this.group && this.group.length > 0 ? this.group.map(cur => {
        const items = cur.map(i => `(${i.audience_name}[${i.audience_code}] ${i.operator || '=='} ${i.audience_value})`);
        if (items.length <= 1) {
          return items.join('');
        } else {
          return '(' + items.join(' 且 ') + ')';
        }
      }).join(' 或 ') : '';
    }
  },
  watch: {
    value: {
      handler: function(val, oldVal) {
        // 如果value不符合要求使用默认的group
        if (val && val.length > 0) {
          this.fillPropsForGroup(this.transferLocalGroup('in', val), this.audiences);
        } else {
          this.group = this.single ? [[]] : this.group;
        }
      },
      immediate: true
    },
    audiences: {
      handler: function(val, oldVal) {
        this.fillPropsForGroup(this.group, val);
      },
      deep: true
    }

  },
  mounted() {
    getAllAudiences(this.scoped).then(res => {
      if (!res.data.code) {
        const audiences = res.data.data.items || [];
        if (this.audiencesFilter.length === 0) {
          this.audiences = audiences;
        } else {
          this.audiences = audiences.filter(obj => this.audiencesFilter.indexOf(obj.audience_code) > -1);
        }
      }
    });
  },
  methods: {
    async validate(fn) {
      const validators = ([].filter.call(this.$children, i => i.handleValidate)).map(i => i.handleValidate());
      const res = await Promise.all(validators);
      const valids = res.reduce((total, cur) => { total = total && cur; return total; }, true);
      fn.call(this, valids);
    },
    resetFields() {
      this.$children.forEach(i => i.handleReset && i.handleReset());
    },
    // group输入输出进行转换
    // 输出group二维数组转一维 audiuce_value值如果是数组逗号隔开，反之亦然
    transferLocalGroup(type, val) {
      // 从外部输入转换
      if (type === 'in') {
        if (!Array.isArray(val[0])) {
          const result = [];
          const opts = [];
          let pre = NaN;
          let curArr;
          (val || []).forEach(cur => {
            if (cur.audience_group === pre) {
              curArr.push(cur);
            } else {
              curArr = [cur];
              result.push(curArr);
              opts.push(cur.operator);
              pre = cur.audience_group;
            }
          });
          return result;
        } else {
          return val;
        }
      } else {
        const value = [];
        this.group.forEach(i => {
          i.forEach(e => {
            value.push({
              ...e,
              audience_value: Array.isArray(e.audience_value) && ['select', 'search_select'].includes(e.datasource_type)
                ? e.audience_value.join(',')
                : e.audience_value
              // group_operator: '||'
              // 所以的关系都变成了或
            });
          });
        });
        return value;
      }
    },
    async fillPropsForGroup(group, audiences) {
      let _group = JSON.parse(JSON.stringify(group));
      // 如果不是二维数组无需添加属性
      if (Array.isArray(_group[0]) && audiences.length > 0) {
        _group = _group.map((i, index) => {
          i = i.map((e, idx) => {
            if (e.audience_code) {
              const audience = audiences.find(
                v => v.audience_code === e.audience_code
              );
              if (audience) {
                this.handleSetItems(index, idx, audience.audience_code);
                e = {
                  ...e,
                  ...audience,
                  audience_value: e.audience_value && audience && ['select', 'search_select'].includes(audience.datasource_type) ? e.audience_value.toString().split(',') : e.audience_value,
                  audience_group: e.audience_group
                };
              } else {
                e.audience_code = '';
              }
              return e;
            } else {
              return e;
            }
          });
          return i;
        });
      }
      this.group = _group;
    },
    handleItemChange(index, value) {
      this.$set(this.group, index, value);
      let val = this.transferLocalGroup();
      val = val.map(i => {
        i = !i.audience_code ? [] : i;
        return i;
      });
      // console.log('//////', JSON.stringify(val));
      // console.log('item-change', this.transFerGroupOperate(val));
      this.$emit('on-change', this.transFerGroupOperate(val), this.ruleName);
    },
    handleSetItems(index, idx, code) {
      getAbAudiencesValuesByCode({ code }).then(res => {
        console.log('/////----', res);
        if (!res.data.code) {
          this.$set(this.group[index][idx], 'items', res.data.data.items);
        }
      });
    },
    handleAdd() {
      const group = JSON.parse(JSON.stringify(this.group));
      // const max = group && group.length > 0 ? Math.max.apply(this, group.map(i => i[0].audience_group || 0)) + 1 : 0;
      group.push([
        {
          audience_group: this.group.length,
          group_operator: this.operator
        }
      ]);
      this.group = group;
      const value = this.transferLocalGroup();
      console.log('add', this.transFerGroupOperate(value), this.ruleName);
      this.$emit('add', this.transFerGroupOperate(value), this.ruleName);
      this.$emit('on-change', this.transFerGroupOperate(value), this.ruleName);
    },

    handleRemove(index) {
      const group = JSON.parse(JSON.stringify(this.group));
      group.splice(index, 1);
      // 重新对audience_group保存的序号进行编号
      group.forEach((i, idx) => {
        if (idx >= index && i && i.length > 0) {
          i.forEach(i => {
            i.audience_group -= 1;
          });
        }
      });
      this.group = group;
      const value = this.transferLocalGroup();
      console.log('remove');
      this.$emit('remove', index, this.transFerGroupOperate(value), this.ruleName);
      this.$emit('on-change', this.transFerGroupOperate(value), this.ruleName);
    },
    transFerGroupOperate(val) {
      if (val && val.length > 0) {
        return val.map(i => { i.group_operator = '||'; return i; });
      } else {
        return val;
      }
    }

  }
};
</script>
<style lang="less" scoped>
.logic-group {
    position: relative;
}
.logic-group-multi {
    border-style: solid;
    border-width: 1px 0 1px 23px;
    border-image: url(../../../../assets/images/dashboard/cur2.png) 30 300
        stretch;
    padding-left: 0.5em;
}
.logic-group-multi::before {
    position: absolute;
    content: "或";
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    top: 50%;
    left: -60px;
    margin-top: -15px;
    background: grey;
    border-radius: 50%;
    color: #fff;
}
</style>
