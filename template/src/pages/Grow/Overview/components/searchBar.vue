<template>
  <div>
    <Form :model="form" inline>
      <FormItem>
        <Button
          :type="active === 0 ? 'primary' : 'text'"
          @click="handleActiveChange(0)"
        >
          今日
        </Button>
      </FormItem>
      <FormItem>
        <Button
          :type="active === 1 ? 'primary' : 'text'"
          @click="handleActiveChange(1)"
        >
          昨日
        </Button>
      </FormItem>
      <FormItem>
        <Button
          :type="active === 7 ? 'primary' : 'text'"
          @click="handleActiveChange(7)"
        >
          近七天
        </Button>
      </FormItem>
      <FormItem>
        <DatePicker
          :value="[form.begin_time, form.end_time]"
          type="daterange"
          format="yyyy-MM-dd"
          style="width: 200px"
          :clearable="false"
          :options="options"
          @on-change="handleDatePickChange"
        ></DatePicker>
      </FormItem>
      <FormItem>
        <Select
          v-model="form.platform_id"
          style="width: 200px"
          placeholder="请选择渠道"
          filterable
          clearable
          @on-change="handleChannelChange"
        >
          <Option
            v-for="item in channelOptions"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></Option>
        </Select>
      </FormItem>
      <FormItem>
        <Select
          v-model="form.app_id"
          filterable
          clearable
          style="width:200px"
          placeholder="请选择产品"
        >
          <Option
            v-for="item in appOptions"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></Option>
        </Select>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import moment from 'moment';
import * as api from '@/server/grow';
import { getPlatformPutinDict } from '@/server/global';
export default {
  props: {
    value: {
      type: [Object],
      default: () => ({})
    },
    activeKey: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      active: 0, // 0：今日;1：昨日:7：近七天
      form: this.value || {},
      options: {
        // 日期组件配置
        disabledDate(current) {
          return (
            current &&
            (current > moment().endOf() ||
              current <
                moment()
                  .subtract(1, 'months')
                  .endOf())
          );
        }
      },
      appOptions: [],
      channelOptions: [] // 平台列表
    };
  },
  watch: {
    form: {
      handler(value) {
        console.log('///', value);
        this.$emit('change', value);
        // this.$emit('input', value);
      },
      deep: true
    }
  },
  created() {
    if (!(this.form && this.form.begin_time && this.form.end_time)) {
      this.handleActiveChange(0);
    }
    this.getChannels();
    this.getAppOptions();
  },
  methods: {
    // value 0 国内 1海外
    handleModeChange(value) {
      this.getChannels(value);
    },
    handleActiveChange(key) {
      this.active = key;
      var begin = moment()
        .subtract(key, 'days')
        .startOf()
        .format('YYYY-MM-DD');
      var end = moment()
        .subtract(key === 1 ? 1 : 0, 'days')
        .endOf()
        .format('YYYY-MM-DD');
      this.$set(this.form, 'begin_time', begin);
      this.$set(this.form, 'end_time', end);
    },
    handleDatePickChange(value) {
      this.$set(this.form, 'begin_time', value[0]);
      this.$set(this.form, 'end_time', value[1]);
      // console.log('......', value);
    },
    async handleChannelChange(value) {
    },
    // mode 0 国内 1海外
    async getChannels() {
      const { data } = await getPlatformPutinDict({ is_overseas: this.activeKey });
      if (data.code === 0) {
        this.channelOptions =
          data.data.items.map(obj => ({
            label: obj.platform_name,
            value: obj.platform_code,
            is_overseas: obj.is_overseas
          })) || [];
      }
    },
    async getAppOptions() {
      api.getAdPlanList({ put_area: 1 }).then(({ data }) => {
        if (data.code === 0) {
          this.appOptions = data.data && data.data.length > 0 ?
          data.data.map(i => ({
            value: i.app_id,
            label: i.app_name
          })) : [];
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ivu-form-item {
  margin-bottom: 0;
}
</style>
