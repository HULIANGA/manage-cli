<template>
  <Select v-model="dataValue" v-bind="params">
    <Option v-for="item in databases" :key="item.value" :value="item.value">{{
      item.label
    }}</Option>
  </Select>
</template>
<script>
import { getDictByCode } from '@/server/product';
export default {
  props: {
    dataType: {
      default: '',
      type: String
    },
    value: {
      default: '',
      type: [String, Number, Array]
    },
    params: {
      default: () => ({}),
      type: Object
    }
  },
  data() {
    return {
      dictionary: {},
      databases: []
    };
  },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
        this.$emit('on-change', val);
      }
    }
  },
  created() {
    if (this.dataType) {
      this.dictionary = this.$store.state.dictionary;
      this.getDictOptions(this.dataType);
    }
  },
  methods: {
    // 获取字典数据
    async getDictOptions(code) {
      // if (!this.dictionary.hasOwnProperty(code)) {
      //     throw Error('not support parameters skip!!!');
      // } else {
      if (this.dictionary[code] && this.dictionary[code].length) {
        this.databases = this.dictionary[code];
      } else {
        const { data } = await getDictByCode(code);
        if (data.code === 0) {
          this.databases = data.data.map(obj => ({
            label: obj.val,
            value: obj.code
          }));
          this.$store.commit('dictionary.setState', {
            name: code,
            values: this.zzmDeepClone(this.databases)
          });
        } else {
          throw Error('can not find parameters from server skip!!!');
        }
        // }
      }
    }
  }
};
</script>
