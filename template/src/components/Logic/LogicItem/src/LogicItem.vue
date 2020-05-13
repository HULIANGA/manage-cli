<template>
  <Card dis-hover class="logic-item">
    <a v-if="length > 1" class="logic-delete" @click="handleRemove">
      <Icon type="ios-trash-outline" style="color:red;font-size:22px" />
    </a>
    <div class="logic-title">
      <Icon
        type="ios-funnel"
        style="color:#2D8cF0;margin-right:5px;font-size:22px"
      />
      <span style="font-weight:600">
        {{ !single ? `筛选目标条件.${idex + 1}` : title }}
      </span>
      <span v-if="single" style="font-size:11px;color:grey;margin-left:5px">
        {{ sub }}
      </span>
    </div>
    <div
      :class="[
        'logic-form',
        formDynamic.items.length > 1 ? 'logic-form-multi' : ''
      ]"
    >
      <Checkbox
        v-if="
          !single && (this.$route.query.id || this.$route.query.copy) && hasNot
        "
        v-model="hasNotNow"
      >
        非
      </Checkbox>
      <Row style="position:relative">
        <Col span="4">
          <div></div>
        </Col>
        <Col
          style="margin-left: 36px"
          :class="formDynamic.items.length > 1 ? 'logic-formDynamic-multi' : ''"
          span="22"
        >
          <Form ref="formDynamic" :model="formDynamic">
            <div
              v-for="(item, index) in formDynamic.items"
              :key="item.index"
              style="width:100%;display:flex;align-items:center"
            >
              <div style="width:450px">
                <Row :gutter="12">
                  <Col span="9">
                    <FormItem
                      :prop="'items.' + index + '.audience_code'"
                      :rules="{
                        required: true,
                        message: '请选择条件',
                        trigger: 'change'
                      }"
                      style="margin:10px 0"
                    >
                      <Select
                        v-model="item.audience_code"
                        placeholder="请选择条件"
                        filterable
                        clearable
                        @on-change="
                          value => {
                            handleAudienceChange(value, index);
                          }
                        "
                      >
                        <Option
                          v-for="(audience, idx) in audiences"
                          :key="idx"
                          :value="audience.audience_code"
                          :label="
                            `${audience.audience_name} [${
                              audience.audience_code
                            }]`
                          "
                        ></Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <!-- text类型 -->
                  <Col span="6">
                    <FormItem
                      :prop="'items.' + index + '.operator'"
                      :rules="{
                        required: true,
                        message: '请选择操作符',
                        trigger: 'change'
                      }"
                      style="margin:10px 0"
                    >
                      <Select v-model="item.operator" filterable>
                        <Option
                          v-for="(condition, idx) in conditions"
                          :key="idx"
                          :disabled="
                            item.audience_code !== 'productversioncode'
                              ? item.data_type === 'date'
                                ? condition.code === 'in' ||
                                  condition.code === 'notin'
                                : condition.code === 'between' ||
                                  (!numTypes.includes(item.data_type) &&
                                    condition.code !== 'in' &&
                                    condition.code !== 'notin')
                              : false
                          "
                          :value="condition.code"
                          :label="condition.name"
                        ></Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col
                    v-if="
                      item.datasource_type === 'text' || !item.datasource_type
                    "
                    span="9"
                  >
                    <FormItem
                      v-if="item.data_type === 'date'"
                      :prop="'items.' + index + '.audience_value'"
                      :rules="{
                        required: true,
                        message: '请选择时间',
                        trigger: 'change'
                      }"
                      style="margin:10px 0"
                    >
                      <DatePicker
                        :value="
                          item.operator === 'between'
                            ? item.audience_value.split('~')
                            : item.audience_value
                        "
                        :type="
                          item.operator === 'between' ? 'datetimerange' : 'date'
                        "
                        format="yyyy-MM-dd"
                        placeholder="请选择"
                        separator="~"
                        style="width: 100%"
                        @on-change="
                          value => {
                            formDynamic.items[index].audience_value =
                              item.operator === 'between'
                                ? value.join('~')
                                : value;
                          }
                        "
                      ></DatePicker>
                    </FormItem>
                    <FormItem
                      v-else
                      :prop="'items.' + index + '.audience_value'"
                      :rules="{
                        required: true,
                        message: '请输入条件值',
                        trigger: 'change'
                      }"
                      style="margin:10px 0"
                    >
                      <Input
                        v-model="item.audience_value"
                        placeholder="输入条件值"
                      />
                    </FormItem>
                  </Col>
                  <!-- select类型 -->
                  <Col v-if="item.datasource_type === 'select'" span="9">
                    <FormItem
                      :prop="'items.' + index + '.audience_value'"
                      :rules="{
                        type: 'array',
                        required: true,
                        message: '请输入条件值',
                        trigger: 'change'
                      }"
                      style="margin:10px 0"
                    >
                      <Select v-model="item.audience_value" filterable multiple>
                        <Option
                          v-for="(audienceValue, idx) in item.items"
                          :key="idx"
                          :value="audienceValue.code"
                          :label="audienceValue.name"
                        ></Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <!-- 其他类型 -->
                  <Col v-if="item.datasource_type === 'search_select'" span="9">
                    <FormItem
                      :prop="'items.' + index + '.audience_value'"
                      :rules="{
                        type: 'array',
                        required: true,
                        message: '请输入条件值',
                        trigger: 'change'
                      }"
                      style="margin:10px 0"
                    >
                      <Select v-model="item.audience_value" filterable multiple>
                        <Option
                          v-for="(audienceValue, idx) in item.items"
                          :key="idx"
                          :value="audienceValue.code"
                          :label="audienceValue.name"
                        ></Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <a
                v-if="!single ? formDynamic.items.length > 1 : true"
                class="logic-delete"
                style="margin-left:15px"
                @click="
                  () => {
                    handleRemoveItem(index);
                  }
                "
              >
                <Icon
                  type="ios-close-circle-outline"
                  class="logic-delete-icon"
                />
              </a>
            </div>
          </Form>
          <div v-if="formDynamic.items.length < 21" style="margin-top:12px">
            <a class="logic-item-add" @click="handleAdd">
              <Icon type="ios-add-circle-outline" class="logic-item-add-icon" />
              <span class="logic-item-add-name">添加筛选条件</span>
            </a>
          </div>
        </Col>
      </Row>
    </div>
  </Card>
</template>

<script>
import { getAbAudiencesValuesByCode } from '@/server/ab.js';
export default {
  name: 'LogicItem',
  props: {
    title: String,
    single: Boolean,
    audiences: {
      type: Array,
      default: () => []
    },
    groupOperator: String,
    sub: String,
    length: Number,
    idex: Number,
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      ref: null,
      numTypes: ['integer', 'number', 'string.version'],
      conditions: [
        {
          code: 'in',
          name: '包含'
        },
        {
          code: 'notin',
          name: '不包含'
        },
        {
          code: '<',
          name: '小于'
        },
        {
          code: '<=',
          name: '小于等于'
        },
        {
          code: '==',
          name: '等于'
        },
        {
          code: '!=',
          name: '不等于'
        },
        {
          code: '>',
          name: '大于'
        },
        {
          code: '>=',
          name: '大于等于'
        },
        {
          code: 'between',
          name: '区间'
        }
      ],
      hasNot: false,
      hasNotNow: this.hasNot,
      formDynamic: { items: this.value }
    };
  },
  computed: {
    _logicGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options._componentTag !== 'LogicGroup') {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    }
  },
  watch: {
    value: {
      handler: function(val, oldVal) {
        if (JSON.stringify(this.formDynamic.items) !== JSON.stringify(val)) {
          console.log('/////////-------');
          this.formDynamic.items = val;
          this.hasNotNow = this.hasNot = this.formDynamic.items.some(
            i => i.group_operator === '!'
          );
        }
      },
      immediate: true
    },
    formDynamic: {
      handler: function(val, oldVal) {
        this.$emit('item-change', this.idex, val.items);
        this.$emit('update:value', val.items);
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    handleAudienceChange(audienceCode, index) {
      if (audienceCode) {
        const audience = this.audiences.find(
          i => i.audience_code === audienceCode
        );
        if (audience) {
          this.$set(this.formDynamic.items, index, {
            ...this.formDynamic.items[index],
            ...audience,
            audience_id: audience.id,
            audience_group: this.idex,
            group_operator: this.groupOperator,
            operator: ''
          });
          getAbAudiencesValuesByCode({ code: audience.audience_code }).then(
            res => {
              if (!res.code) {
                this.$set(this.formDynamic.items, index, {
                  ...this.formDynamic.items[index],
                  items: res.data.data ? res.data.data.items : [],
                  audience_value: ''
                });
              }
            }
          );
        }
      } else {
        this.$set(this.formDynamic.items, index, {
          ...this.formDynamic.items[index],
          audience_group: this.idex,
          group_operator: this.groupOperator,
          operator: '',
          audience_value: ''
        });
      }
    },
    handleValidate() {
      const that = this;
      return new Promise(function(resolve, reject) {
        that.$refs.formDynamic.validate(valid => {
          if (that.hasNotNow && !that.single) {
            that.$Message.error('非逻辑不再兼容，请取消非的勾选');
            resolve(false);
          } else {
            resolve(valid);
          }
        });
      });
    },
    handleReset() {
      this.$refs.formDynamic.resetFields();
    },
    checkboxChange(val) {
      this.hasNotNow = val;
    },
    handleRemove() {
      this._logicGroup.handleRemove(this.idex);
    },
    handleRemoveItem(idx) {
      this.formDynamic.items.splice(idx, 1);
    },
    handleAdd() {
      this.formDynamic.items.push({
        audience_group: this.idex,
        audience_value: '',
        group_operator: this.groupOperator
      });
    }
  }
};
</script>

<style lang="less" scoped>
.logic-item {
  margin-bottom: 16px;
}
.logic-title {
  padding-bottom: 10px;
}
.logic-delete {
  float: right;
  .logic-delete-icon {
    color: red;
    font-size: 16px;
  }
}
.logic-item-name {
  width: 30px;
  height: 30px;
  background: grey;
  border-radius: 50%;
  padding: 5px;
}
.logic-form {
  position: relative;
}
.logic-formDynamic-multi {
  border-style: solid;
  border-width: 1px 0 1px 20px;
  border-image: url('../../../../assets/images/dashboard/cur2.png') 1 300
    stretch;
  padding-left: 0.5em;
}
.logic-form-multi::before {
  position: absolute;
  content: '且';
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  top: 50%;
  margin-top: -15px;
  background: grey;
  border-radius: 50%;
  color: #fff;
}
.logic-item-add {
  display: flex;
  align-items: center;
}
.logic-item-add-icon {
  color: rgb(45, 140, 240);
  font-size: 16px;
}
.logic-item-add-name {
  margin-left: 5px;
  font-size: 12px;
}
</style>
