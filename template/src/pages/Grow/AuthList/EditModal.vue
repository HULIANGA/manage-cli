<template>
  <Modal
    v-model="modal"
    :title="(authId ? '编辑' : '新建') + '授权账号'"
    :loading="loading"
    :closable="false"
    ok-text="开始授权"
    @on-ok="handleOk"
    @on-visible-change="handleVisibleChange"
  >
    <Form ref="basicForm" :model="basicFormData" :rules="ruleValidate" :label-width="80">
      <FormItem label="平台" prop="platform_id">
        <Select v-model="basicFormData.platform_id" placeholder="请选择平台" filterable @on-change="handlePlatformChange">
          <Option v-for="(option, index) in putInOptions" :key="index" :value="option.value">{{ option.label }}</Option>
        </Select>
      </FormItem>

      <FormItem label="帐号名称" prop="ad_account_name">
        <Select v-model="basicFormData.ad_account_name" allow-create placeholder="请选择或输入账号名称" filterable @on-create="handleCreateName" @on-change="handleNameChange">
          <Option v-for="(option, index) in accountNameOptions" :key="index" :value="option.value">{{ option.label }}</Option>
        </Select>
      </FormItem>

      <FormItem label="帐号ID" prop="ad_account_id">
        <Select v-model="basicFormData.ad_account_id" allow-create placeholder="请选择或输入账号ID" filterable @on-create="handleCreateId" @on-change="handleIdChange">
          <Option v-for="(option, index) in accountIdOptions" :key="index" :value="option.value">{{ option.label }}</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
  import { getPutin, getAccount } from '@/server/product';
  import { putAuthModify } from '@/server/grow';
  export default {
    name: '',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      authId: {
        type: String
      },
      formData: {
        type: Object
      }
    },
    data() {
      return {
        putInOptions: [],
        loading: true,
        ruleValidate: {
          platform_id: [
            { required: true, message: '请选择平台', trigger: 'change' }
          ],
          ad_account_name: [
            { required: true, message: '请选择或输入账号名称', trigger: 'change' }
          ],
          ad_account_id: [
            { required: true, message: '请选择或输入账号ID', trigger: 'change' }
          ]
        },
        basicFormData: {},
        accountData: [],
        platformCode: '' // PD202002240018:今日头条
      };
    },
    computed: {
      accountIdOptions() { // 账号名称选项
        return this.accountData.filter(obj => obj.ext_infos && obj.ext_infos.account_id).map(obj => ({
          label: obj.ext_infos.account_id,
          value: obj.ext_infos.account_id
        }));
      },
      accountNameOptions() { // 账号ID选项
        return this.accountData.map(obj => ({
          label: obj.account_name,
          value: obj.account_name
        }));
      },
      modal: { // 弹窗显示
        get() {
          return this.visible;
        },
        set(val) {
          this.$emit('update:visible', val);
        }
      }
    },
    created() {
      this.getPutinOptions();
    },
    methods: {
      handleNameChange(val) { // 选择账号名称联动账号ID
        const selectData = this.accountData.filter(obj => obj.account_name === val);
        if (selectData.length > 0) {
          this.$set(this.basicFormData, 'ad_account_id', selectData[0].ext_infos ? selectData[0].ext_infos.account_id : null);
          this.$set(this.basicFormData, 'account_id', selectData[0].id);
        }
      },
      handleIdChange(val) { // 选择账号ID联动账号名称
        const selectData = this.accountData.filter(obj => obj.ext_infos && obj.ext_infos.account_id === val);
        if (selectData.length > 0) {
          this.$set(this.basicFormData, 'ad_account_name', selectData[0].account_name);
        }
      },
      handleCreateName(val) { // 创建账号名称
        if (this.accountNameOptions.filter(obj => obj.value === val).length === 0) {
          this.accountNameOptions.push({
            value: val,
            label: val
          });
          this.$set(this.basicFormData, 'ad_account_name', val);
          this.$set(this.basicFormData, 'ad_account_id', null);
        }
      },
      handleCreateId(val) { // 创建账号ID
        if (this.accountIdOptions.filter(obj => obj.value === val).length === 0) {
          this.accountIdOptions.push({
            value: val,
            label: val
          });
          this.$set(this.basicFormData, 'ad_account_id', val);
        }
      },
      handleOk() { // 确定
        this.$refs.basicForm.validate(async valid => {
          if (valid) {
            if (this.platformCode === 'PD202002240018') {
              const { data } = await putAuthModify(this.basicFormData);
              if (data.code === 0) {
                this.modal = false;
                this.$emit('on-success', this.authId ? 'edit' : 'add', this.basicFormData.ad_account_id); // 新增或编辑成功
              }
              this.closeLoading();
            } else {
              this.$Notice.error({
                title: '所选平台暂不支持授权'
              });
              this.closeLoading();
            }
          } else {
            this.closeLoading();
          }
        });
      },
      handleVisibleChange(value) {
        if (value) { // 显示时初始化内容
          if (this.authId) {
            this.basicFormData = { ...this.formData };
            this.handlePlatformChange(this.formData.platform_id, false);
          } else {
            this.$set(this.basicFormData, 'platform_id', '140');
            this.handlePlatformChange('140', false);
          }
        } else { // 隐藏时清空
          this.basicFormData = {};
          this.$refs.basicForm.resetFields();
          this.accountData = [];
        }
      },
      async handlePlatformChange(value, choose = true) { // 选择平台查询平台下账号，默认choose为true，初始化时传false，不清空账号名称和ID
        if (!value) {
          return;
        }

        if (choose) {
          this.$set(this.basicFormData, 'ad_account_id', undefined);
          this.$set(this.basicFormData, 'ad_account_name', undefined);
        }

        const selectData = this.putInOptions.filter(obj => obj.value === value);
        if (selectData.length > 0) {
          this.$set(this.basicFormData, 'platform_name', selectData[0].label);
          this.platformCode = selectData[0].platformCode;
        }

        const requestParams = {
          page_num: 1,
          page_size: 9999,
          account_type: 1,
          is_enable: 1,
          platform_id: value
        };
        const result = await getAccount(requestParams);
        const { data } = result;
        if (data.code === 0) {
          this.accountData = data.data.items;
        }
      },
      async getPutinOptions() { // 平台选项
        const { data } = await getPutin({
          page_num: 1,
          page_size: 9999
        });
        if (data.code === 0) {
          this.putInOptions = data.data.items.map(obj => ({
            label: obj.platform_name,
            value: obj.id,
            platformCode: obj.platform_code
          }));
        }
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