<template>
  <div class="list-filter-container">
    <Form ref="filterForm" :model="formData" label-position="right" :label-width="100">
      <Row type="flex" :gutter="24">
        <Col v-for="(item, index) in configShow" :key="index" :xs="24" :sm="24" :md="12" :lg="8">
          <FormItem :label="item.label" :prop="item.key">
            <Input
              v-if="item.type === 'input'"
              v-model="formData[item.key]"
              :placeholder="item.placeholder || '请输入'"
              clearable
              v-bind="item.params"
              @on-enter="handleSubmit"
            />
            <dictionarySelect
              v-if="item.type === 'dictSelect'"
              v-model="formData[item.key]"
              :data-type="item.dataType"
              :params="{
                clearable: true,
                ...item.params
              }"
            ></dictionarySelect>
            <Select
              v-if="item.type === 'select'"
              v-model="formData[item.key]"
              :placeholder="item.placeholder || '请选择'"
              clearable
              v-bind="item.params"
              filterable
            >
              <Option v-for="option in item.options" :key="option.value" :value="option.value">{{ option.label }}</Option>
            </Select>
            <DatePicker
              v-if="item.type === 'datePicker'"
              :key="item.key"
              v-model="formData[item.key]"
              :type="!item.params?'datetimerange':(item.params.type||defaultDataPick)"
              :format="!item.params?'yyyy-MM-dd HH:mm:ss':(item.params.format||dateDataPickFormat)"
              :placeholder="item.placeholder || '请选择'"
              style="width: 100%"
              v-bind="item.params"
              @on-change="dateChange($event, item)"
            ></DatePicker>
            <!-- 级联选择 -->
            <!-- cascaderKeys:级联的key值比如['platform_id', 'account_id', 'sub_channel']-->
            <Cascader
              v-if="item.type === 'cascader'"
              v-model="formData[item.key]"
              change-on-select
              filterable
              clearable
              v-bind="item.params"
              @on-change="(value, selectedData)=>{ handelCascaderChange(value,selectedData,item.cascaderKeys||[])}"
            ></Cascader>
          </FormItem>
        </Col>
      </Row>
      <Row type="flex" :gutter="24">
        <Col :sm="24">
          <FormItem label>
            <Button type="primary" @click="handleSubmit">查询</Button>
            <Button @click="handleReset">重置</Button>
            <a v-if="config.length > maxFormItem" style="margin-left: 10px" @click="toggleMore">
              {{ showMore ? '收起' : '展开' }}
              <Icon :type="showMore ? 'ios-arrow-up' : 'ios-arrow-down'"></Icon>
            </a>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
var moment = require('moment');
export default {
  props: {
    config: {
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      defautDateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
      defaultDataPick: 'datetimerange',
      maxFormItem: 3,
      formData: {},
      defaultFormData: {}, // 默认数据
      cascader: [],
      showMore: false,
      deleteKeys: [], // 传给列表页面需要删除的key，即v-modal绑定的数据格式和实际接口传参不同，需要手动赋值的key。如datepicker返回的是Array，传给接口需要传两个字段
      toStrKeys: [], // 传给列表页面需要将Array转成字符串的key，使用|分隔。如多选select
      accountParentOptions: [], // 平台账号级联平台options
      accountChildOptions: [] // 平台账号级联账号options
    };
  },
  computed: {
    configShow() {
      return this.config.filter(
        (obj, index) => index < this.maxFormItem || this.showMore
      );
    }
  },
  created() {
    const deleteKeys = this.deleteKeys.concat();
    const toStrKeys = this.toStrKeys.concat();
    this.config.forEach(obj => {
      if (obj.type === 'datePicker' || obj.type === 'cascader') {
        deleteKeys.push(obj.key);
      }
      if ((obj.type === 'select' || obj.type === 'dictSelect') && obj.params && obj.params.multiple) {
        toStrKeys.push(obj.key);
      }
    });
    this.deleteKeys = deleteKeys;
    this.toStrKeys = toStrKeys;
    this.initFilterData(this.config);
    this.handleSubmit('init');
  },
  methods: {
    // 根据params.default默认值初始化数据
    initFilterData(config) {
      // dosometing
      this.config.forEach(obj => {
        if (obj.params && obj.params.default) {
          if (obj.type === 'datePicker') {
            // 日期格式初始化数据
            var values = obj.params.default;
            if (Array.isArray(values)) {
              this.dateChange(values, obj);
            }
          } else if (obj.type === 'cascader') {
            this.handelCascaderChange(obj.params.default, null, obj);
          } else {
            this.formData[obj.key] = obj.params.default;
          }
        }
      });
      this.defaultFormData = { ...this.formData };
    },
    toggleMore() {
      // 展开/收起
      this.showMore = !this.showMore;
    },
    handleReset() {
      // 重置表单
      /**
            没有用resetFields()。formData的初始值是从父组件传来的，使用resetFields重置不了。你有好的办法可以改。
         */
      this.formData = { ...this.defaultFormData };
      this.handleSubmit();
    },
    handleSubmit(type) {
      // 查询
      const formData = {
        ...this.formData
      };
      for (const key in formData) {
        if (this.toStrKeys.indexOf(key) > -1) {
          formData[key] = formData[key].join('|');
        }
        if (
          this.deleteKeys.indexOf(key) > -1 ||
          (!formData[key] && formData[key] !== 0)
        ) {
          delete formData[key];
        }
      }
      if (type === 'init') {
        this.$emit('on-init', formData);
      } else {
        this.$emit('submit', formData);
      }
    },
    formatDefautDatePickRangeValues(values, conf) {
      return values.map(date =>
        moment(date).format(conf.params.format || this.dateDataPickFormat)
      );
    },
    dateChange(value, item) {
      // 选择日期时期的格式
      if (value) {
        if (value[1].indexOf('00:00:00')) {
          value[1] = value[1].replace('00:00:00', '23:59:59');
        }
        this.formData[item.startKey] = value[0];
        this.formData[item.endKey] = value[1];
        this.formData[item.key] = value;
      }
    },
    // 设置级联的key对应的值
    async handelCascaderChange(value, selectedData, keys) {
      if (value && Array.isArray(value)) {
        keys.forEach((i, index) => {
          this.formData[i] = value[index] || '';
        });
        // 触发级联动态加载数据时的写入
        this.$emit('input', value);
      }
    }
  }
};
</script>

<style lang="less">
@import '../../../assets/lib/custom.less';
.list-filter-container {
  .ivu-form-item {
    margin-bottom: @padding-md;
  }
}
</style>
<style lang="less" scoped>
@import '../../../assets/lib/custom.less';
.list-filter-container {
  border-bottom: 1px solid @border-color-base;
}
</style>