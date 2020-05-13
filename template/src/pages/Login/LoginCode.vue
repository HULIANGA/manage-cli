<template>
  <div>{{ code }}</div>
</template>

<script>
  export default {
    data() {
      return {
        code: ''
      };
    },
    created() {
      this.code = this.$route.query.code;
    }
  };
</script>