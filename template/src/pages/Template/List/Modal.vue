<template>
  <Modal
    v-model="value"
    title="弹窗"
    :loading="loading"
    @on-ok="handleOk"
  >
  </Modal>
</template>

<script>
  export default {
    name: '',
    components: {
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        loading: true
      };
    },
    computed: {
      value: {
        get() {
          return this.visible;
        },
        set(val) {
          this.$emit('update:visible', val);
        }
      }
    },
    methods: {
      handleOk() {
        setTimeout(() => {
          this.value = false;
          this.closeLoading();
          this.$emit('on-ok');
        }, 2000);
      },
      closeLoading() {
        this.loading = false;
        this.$nextTick(() => {
          this.loading = true;
        });
      }
    }
  };
</script>

<style lang="less" scoped></style>