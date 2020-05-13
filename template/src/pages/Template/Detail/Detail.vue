<template>
  <div class="common-detail-page-container">
    <div class="card-container">
      <Card>
        <Form ref="basiceForm1" :model="basicFormData1" :rules="basicRuleValidate1" :label-width="100">
          <Row type="flex" :gutter="24">
            <Col :xs="24" :sm="24" :md="12" :lg="8">
              <FormItem label="表单输入" prop="input1">
                <Input v-model="basicFormData1.input1" placeholder="请输入" clearable maxlength="50"></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="8">
              <FormItem label="表单输入" prop="input2">
                <Input v-model="basicFormData1.input2" placeholder="请输入" clearable maxlength="50"></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="8">
              <FormItem label="表单输入" prop="input3">
                <Input v-model="basicFormData1.input3" placeholder="请输入" clearable maxlength="50"></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
    <div class="card-container">
      <Card>
        <p slot="title">表单2</p>
        <Form ref="basiceForm2" :model="basicFormData2" :rules="basicRuleValidate2" :label-width="100">
          <Row type="flex" :gutter="24">
            <Col :xs="24" :sm="24" :md="12" :lg="8">
              <FormItem label="表单输入" prop="input1">
                <Input v-model="basicFormData2.input1" placeholder="请输入" clearable maxlength="50"></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="8">
              <FormItem label="表单输入" prop="input2">
                <Input v-model="basicFormData2.input2" placeholder="请输入" clearable maxlength="50"></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="8">
              <FormItem label="表单输入" prop="input3">
                <Input v-model="basicFormData2.input3" placeholder="请输入" clearable maxlength="50"></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
    <div class="common-botfix-btn-container">
      <Button
          @click="function() {
            closeCurTab();
            $router.push({ path: '/template/listNew' });
          }"
      >返回</Button>
      <Button type="primary" :loading="loading" @click="handleSubmit">保存</Button>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      loading: false,
      basicFormData1: {
        input1: '',
        input2: '',
        input3: ''
      },
      basicRuleValidate1: {
        input1: [
          { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      basicFormData2: {
        input1: '',
        input2: '',
        input3: ''
      },
      basicRuleValidate2: {
        input1: [
          { required: true, message: '请输入', trigger: 'change' }
        ]
      }
    };
  },
  created() {
  },
  methods: {
    handleSubmit() {
      this.$refs.basiceForm1.validate(valid => {
        if (valid) {
          this.$refs.basiceForm2.validate(valid => {
            if (valid) {
              this.loading = true;
              setTimeout(() => {
                this.$Message.success('保存成功');
                this.zzmkeepUpdate('/template/listNew');
                this.closeCurTab();
                this.$router.push({ path: '/template/listNew' });
                this.isLoading = false;
              }, 1000);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>