/*
 * @Description: 文件说明
 * @Date: 2019-10-23 16:34:50
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-11-14 15:31:21
 */
export default {
  data() {
    return {
      mixTableHeight: 300,
      mixTableHeightNotPage: 300
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.mixGetTableHeight();
      window.addEventListener('resize', this.mixGetTableHeight);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.mixGetTableHeight);
  },
  methods: {
    // 获取表格高度
    mixGetTableHeight() {
      const elem = document.querySelector('.list-page-table') || document.querySelector('.list-table-container');
      const elemTop = this.getElementTop(elem);
      const windowHeight = this.getViewport().height;
      const mixTableHeight = windowHeight - elemTop - 12 - 56 - 6;
      this.mixTableHeight = mixTableHeight > this.mixTableHeight ? mixTableHeight : this.mixTableHeight;
      this.mixTableHeightNotPage = this.mixTableHeight > this.mixTableHeightNotPage ? this.mixTableHeight + 56 : this.mixTableHeightNotPage;
    },
    // 获取节点相对浏览器的顶部绝对距离
    getElementTop(element) {
      if (!element) {
        return 0;
      }
      var actualTop = element.offsetTop;
      var current = element.offsetParent;

      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }

      return actualTop;
    },
    // 获取浏览器高度
    getViewport() {
      if (document.compatMode === 'BackCompat') {
        return {
          width: document.body.clientWidth,
          height: document.body.clientHeight
        };
      } else {
        return {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight
        };
      }
    }
  }
};