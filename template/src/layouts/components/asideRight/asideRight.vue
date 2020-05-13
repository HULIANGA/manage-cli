<!--  -->
<template>
  <div class="asideRightWrap">
    侧边栏
    <Icon
      type="md-reorder"
      class="collapseIcon"
      @click="$emit('hideRightAside')"
    />
  </div>
</template>

<script>
export default {

  components: {},
  data () {
    return {
    };
  },

  computed: {},

  mounted () {},

  methods: {}
};

</script>
<style lang='scss' scoped>
.asideRightWrap{
    position: relative;
    background: #fff;
    padding: 18px;
    height: 100%;
    border-left: 1px solid #FFE7E7E7;
    .collapseIcon{
        position: absolute;
        right: 18px;
        top: 16px;
        font-size: 22px;
    }
}
</style>
