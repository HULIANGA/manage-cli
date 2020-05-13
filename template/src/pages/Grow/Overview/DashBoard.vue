<template>
  <div>
    <div>
      <Card>
        <!-- <Tabs :active-key="activeKey" @on-click="handleTabsClick">
          <Tab-pane :key="0" label="国内"></Tab-pane>
          <Tab-pane :key="1" label="海外"></Tab-pane>
        </Tabs> -->
        <SearchBar ref="searchBar" v-model="searchParams" :active-key="activeKey"></SearchBar>
      </Card>
    </div>
    <div class="board_statis">
      <Row :gutter="16">
        <Col v-for="(indicator, index) in indicators" :key="indicator.key" :span="index === indicators.length - 1 ? 4 : 5">
          <Card>
            <div class="board_statis_item">
              <img src="../../../assets/images/overview_icon01.png" />
              <div class="info">
                <div class="title">
                  <span>{{ indicator.label }}</span>
                  <Tooltip :content="indicator.tooltip" placement="top">
                    <Icon type="ios-information-circle-outline" style="margin-left: 4px;" />
                  </Tooltip>
                </div>
                <div class="count">
                  <span v-if="indicator.before" class="small">{{ indicator.before }}</span>
                  <span>{{ indicator.fomat(indicatorData[indicator.key]) }}</span>
                  <span v-if="indicator.after" class="small">{{ indicator.after }}</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
    <Row
      class="card-container"
      type="flex"
      justify="space-around"
      :gutter="16"
    >
      <Col :span="12" style="min-height:400px">
        <ChannelCard :params="searchParams" />
      </Col>
      <Col :span="12" style="min-height:400px">
        <ProductCard :params="searchParams" />
      </Col>
    </Row>
    <Row
      class="card-container"
      type="flex"
      justify="space-around"
      :gutter="16"
    >
      <Col :span="12" style="min-height:500px">
        <ClickCard :params="searchParams" />
      </Col>
      <Col :span="12" style="min-height:500px">
        <ConversionCard :params="searchParams" />
      </Col>
    </Row>
    <Row
      class="card-container"
      type="flex"
      justify="space-around"
      :gutter="16"
    >
      <Col :span="12" style="min-height:500px">
        <CostCard :params="searchParams" />
      </Col>
      <Col :span="12" style="min-height:500px">
        <ActiveCard :params="searchParams" />
      </Col>
    </Row>
    <Row
      class="card-container"
      type="flex"
      justify="space-around"
      :gutter="16"
    >
      <Col :span="12" style="min-height:500px">
        <NewUserQualityCard :params="searchParams" />
      </Col>
      <Col :span="12" style="min-height:500px">
        <NewUserValueCard :params="searchParams" />
      </Col>
    </Row>
  </div>
</template>
<script>
import {
  getOVIndicator
} from '@/server/grow';
import SearchBar from './components/searchBar';
import ProductCard from './components/ProductCard';
import ChannelCard from './components/ChannelCard';
import ClickCard from './components/ClickCard';
import ConversionCard from './components/ConversionCard';
import CostCard from './components/CostCard';
import ActiveCard from './components/ActiveCard';
import NewUserQualityCard from './components/newUserQuality';
import NewUserValueCard from './components/newUserValue';
import {
  Tooltip
} from 'view-design';
export default {
  name: 'GrowDashBoard',
  components: {
    ChannelCard,
    ProductCard,
    ClickCard,
    ConversionCard,
    CostCard,
    ActiveCard,
    NewUserQualityCard,
    NewUserValueCard,
    SearchBar,
    Tooltip
  },
  data() {
    return {
      activeKey: 0,
      searchParams: {
        is_overseas: 0
      }, // 查询条件参数
      indicators: [
        { label: '点击数', key: 'ad_clicks', tooltip: '用户点击的次数（渠道为准）', fomat: value => value ? parseInt(value) : '···' },
        { label: '激活数', key: 'ad_converts', tooltip: '下载或安装应用的用户数（渠道为准）', fomat: value => value ? parseInt(value) : '···' },
        { label: '转化率', key: 'cvr_sort', after: '%', tooltip: '转化率=激活数/点击数*100%', fomat: value => value ? (parseFloat(value * 100).toFixed(2)) : '···' },
        { label: '花费', key: 'ad_cost', before: '￥', tooltip: '广告投放产生的支出', fomat: value => value ? (parseFloat(value).toFixed(2)) : '···' },
        { label: 'CPI', key: 'cpi', before: '￥', tooltip: 'CPI=花费/激活数', fomat: value => value ? (parseFloat(value).toFixed(2)) : '···' }
      ],
      indicatorData: {}
    };
  },
  watch: {
    activeKey(value) {
      this.$set(this.searchParams, 'channel_id', '');
      this.$set(this.searchParams, 'app_id', '');
      this.$set(this.searchParams, 'is_overseas', value);
    },
    searchParams: {
      handler(value) {
        // 更新指标版数据
        this.updateIndicatorData();
      },
      deep: true
    }
  },
  created() {
    this.getIndicator();
  },
  methods: {
    updateIndicatorData() {
      this.getIndicator();
    },
    async getIndicator() {
      // 查询 指标版数据
      const { data } = await getOVIndicator(this.searchParams);
      if (data.code === 0) {
        this.indicatorData = data.data;
      }
    },
    handleTabsClick(value) {
      // console.log('nnnnnnn', value === 1);
      this.activeKey = value;
      // tab切换后平台下拉重新加载数据
      this.$refs.searchBar.handleModeChange(value);
    }
  }
};
</script>

<style lang="scss" scoped>
.board_statis {
  margin: 16px 0;
}
.board_statis_item {
  padding: 4px 8px;
  display: flex;
  background-color: #fff;
  align-items: center;
  .info {
    .title {
      color: rgba(0, 0, 0, 0.62);
    }
    .count {
      box-sizing: border-box;
      font-size: 26px;
      color: rgba(0, 0, 0, 0.84);
      line-height: 26px;
      margin-top: 8px;
      display: flex;
      align-items: flex-end;
      .small {
        font-size: 16px;
        line-height: 22px;
      }
    }
  }
  img {
    width: 48px;
    height: 48px;
    margin-right: 12px;
  }
}
</style>
