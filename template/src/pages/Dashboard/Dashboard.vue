<!--
 * @Description: 文件说明
 * @Date: 2019-10-10 16:50:38
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-10-21 18:07:16
 -->
<template>
  <div class="dashboard">
    <Row :gutter="16">
      <Col span="16">
        <div class="card-container">
          <Card>
            <p slot="title">相关文档</p>
            <div class="related-docs-container">
              <div v-zzm-auth="'index:doc'" class="related-docs-item">
                <div class="item-head">
                  <img src="../../assets/images/dashboard/icon2.png" />
                  <span>方舟操作手册</span>
                </div>
                <div class="item-content">
                  <p>分别阐述方舟服务配置的准备工作，具体操作和实现原理。</p>
                </div>
                <div class="item-footer">
                  <a
href="https://docs.qq.com/doc/DRldVR3dMd0tKRHdV"
target="_blank"
>点击查看</a>
                </div>
              </div>
              <div v-zzm-auth="'index:mailDoc'" class="related-docs-item">
                <div class="item-head">
                  <img src="../../assets/images/dashboard/icon2.png" />
                  <span>邮件/短信营销操作说明</span>
                </div>
                <div class="item-content">
                  <p>分别阐述邮件营销操作，短信营销操作和全局设置操作流程。</p>
                </div>
                <div class="item-footer">
                  <a
href="https://docs.qq.com/doc/DRXJvYkdDSWRhckhU"
target="_blank"
>点击查看</a>
                </div>
              </div>
              <div v-zzm-auth="'index:strategyDoc'" class="related-docs-item">
                <div class="item-head">
                  <img src="../../assets/images/dashboard/icon1.png" />
                  <span>策略配置对接文档</span>
                </div>
                <div class="item-content">
                  <p>对接策略配置具体的请求和下发字段说明</p>
                </div>
                <div class="item-footer">
                  <a
href="http://yapi.batmobi.cn/project/202/interface/api"
target="_blank"
>点击查看</a>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div class="card-container">
          <Card>
            <p slot="title">其它相关系统入口</p>
            <div class="other-system-container">
              <div v-zzm-auth="'index:portal'" class="other-system-item">
                <img src="../../assets/images/dashboard/Portal.png" />
                <div>
                  <div class="item-head">
                    <span>开发者平台（Portal）</span>
                  </div>
                  <div class="item-content">
                    <p>开发者用于应用注册管理，广告位配置管理等操作的平台。</p>
                  </div>
                  <div class="item-footer">
                    <a
href="http://www.batmobi.net/devLogin"
target="_blank"
>点击进入</a>
                  </div>
                </div>
              </div>
              <div v-zzm-auth="'index:batcloud'" class="other-system-item">
                <img src="../../assets/images/dashboard/Batcloud2.png" />
                <div>
                  <div class="item-head">
                    <span>运营后台（Batcloud）</span>
                  </div>
                  <div class="item-content">
                    <p>内部运营用于配置运营策略逻辑相关操作的后台。</p>
                  </div>
                  <div class="item-footer">
                    <a
href="http://push.manager.batcloud.io"
target="_blank"
>点击进入</a>
                  </div>
                </div>
              </div>
              <div v-zzm-auth="'index:batcloudOld'" class="other-system-item">
                <img src="../../assets/images/dashboard/Batcloud1.png" />
                <div>
                  <div class="item-head">
                    <span>原策略后台（Batcloud）</span>
                  </div>
                  <div class="item-content">
                    <p>原配置策略下发和A/B测试的操作后台。</p>
                  </div>
                  <div class="item-footer">
                    <a
href="http://login.batmobi.cn/login"
target="_blank"
>点击进入</a>
                  </div>
                </div>
              </div>
              <div v-zzm-auth="'index:UMK'" class="other-system-item">
                <img src="../../assets/images/dashboard/UMK.png" />
                <div>
                  <div class="item-head">
                    <span>用户激励系统（UMK）</span>
                  </div>
                  <div class="item-content">
                    <p>用于设置用户激励任务相关的配置后台。</p>
                  </div>
                  <div class="item-footer">
                    <a
href="http://umk-admin.moneycallflash.com/login"
target="_blank"
>点击进入</a>
                  </div>
                </div>
              </div>
              <div v-zzm-auth="'index:BI'" class="other-system-item">
                <img src="../../assets/images/dashboard/BI.png" />
                <div>
                  <div class="item-head">
                    <span>数据报表（BI）</span>
                  </div>
                  <div class="item-content">
                    <p>各业务事件指标分析的综合数据分析平台。</p>
                  </div>
                  <div class="item-footer">
                    <a
href="http://bi-new.bigdata.batmobi.cn/index"
target="_blank"
>点击进入</a>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Col>

      <Col span="8">
        <div class="card-container">
          <Card>
            <p slot="title">快速开始</p>
            <div class="quick-start-container">
              <router-link
                v-zzm-auth="'index:AB'"
                class="quick-start-item"
                to="/strategy/abtest/add"
              >新建A/B测试方案</router-link>
              <router-link
                v-zzm-auth="'index:meticulous'"
                class="quick-start-item"
                to="/strategy/meticulous/add"
              >新建精细化运营方案</router-link>
              <router-link
                v-zzm-auth="'index:marketing'"
                class="quick-start-item"
                to="/marketing/manage/add"
              >新建邮件/短信营销方案</router-link>
            </div>
          </Card>
        </div>

        <div class="card-container">
          <Card>
            <p slot="title">最近新建的A/B测试方案</p>
            <div class="list-container">
              <List>
                <ListItem
v-for="item in abTestList"
                  :key="item.id"
>
                  <div class="list-content">{{ item.expt_name }}</div>
                  <template slot="action">
                    <li>
                      <a @click="handleEditTest(item)">编辑</a>
                    </li>
                  </template>
                </ListItem>
              </List>
            </div>
          </Card>
        </div>

        <div class="card-container">
          <Card>
            <p slot="title">最近新建的精细化运营方案</p>
            <div class="list-container">
              <List>
                <ListItem
v-for="item in abMeticulousList"
                  :key="item.id"
>
                  <div class="list-content">{{ item.met_name }}</div>
                  <template slot="action">
                    <li>
                      <a @click="handleEditMeticulous(item)">编辑</a>
                    </li>
                  </template>
                </ListItem>
              </List>
            </div>
          </Card>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import {
  getAbExperiments,
  getAbMeticulous
} from '@/server/ab';

export default {
  data() {
    return {
      abTestList: [],
      abMeticulousList: []
    };
  },
  created() {
    this.getAbTestData();
    this.getAbMeticulousData();
  },
  methods: {
    async getAbTestData() {
      const res = await getAbExperiments({
        page_num: 1,
        page_size: 5,
        state: 6
      });
      if (res.data.code === 0) {
        this.abTestList = res.data.data.items;
      }
    },
    async getAbMeticulousData() {
      const res = await getAbMeticulous({
        page_num: 1,
        page_size: 5
      });
      if (res.data.code === 0) {
        this.abMeticulousList = res.data.data.items;
      }
    },
    // 编辑
    handleEditTest(item) {
      this.$router.push({
        path: `/strategy/abtest/detail?id=${item.id}&action=edit&edit=${item.state}`
      });
    },
    handleEditMeticulous(item) {
      this.$router.push({
        path: `/strategy/meticulous/detail?id=${item.id}&action=edit`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .dashboard {
    .card-container {
      margin-bottom: 16px;
    }
    // 相关文档
    .related-docs-container {
      display: flex;
      .related-docs-item {
        padding: 0 16px;
        border-right: 1px solid #E5E5E5;
        flex-basis: 33.33%;
        display: flex;
        flex-direction: column;
        &:first-child {
          padding-left: 0;
        }
        &:last-child {
          border-right: none;
          padding-right: 0;
        }
        .item-head {
          display: flex;
          align-items: center;
          font-weight: bold;
          img {
            width: 24px;
            margin-right: 8px;
          }
        }
        .item-content {
          padding: 8px 0;
          color: #666;
          font-size: 12px;
          line-height: 1.5;
          flex: 1;
        }
        .item-footer {
          text-align: right;
          // font-size: 12px;
        }
      }
    }
    // 其他系统入口
    .other-system-container {
      display: flex;
      flex-wrap: wrap;
      .other-system-item {
        flex-basis: 50%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
        &:nth-child(even) {
          border-right: none;
        }
        &:last-child {
          border-bottom: none;
        }
        img {
          width: 100px;
        }
        >div {
          flex: 1;
          padding: 16px;
          .item-head {
            font-weight: bold;
          }
          .item-content {
            padding: 8px 0;
            color: #666;
            font-size: 12px;
            line-height: 1.5;
            flex: 1;
            min-height: 52px;
          }
          .item-footer {
            text-align: right;
            // font-size: 12px;
          }
        }
      }
    }
    // 快速开始
    .quick-start-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .quick-start-item {
        margin-right: 16px;
        padding: 8px 0;
      }
    }
    // list
    .list-container {
      margin: -16px 0;
      .list-content {
        flex: 1;
      }
    }
  }
</style>
