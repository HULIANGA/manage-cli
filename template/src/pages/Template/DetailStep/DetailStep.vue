<template>
    <div class="common-detail-page-container">
        <Card :bordered="false" :dis-hover="true">
            <Row>
                <Col
                    :xs="24"
                    :sm="{ span: 20, offset: 2 }"
                    :md="{ span: 16, offset: 4 }"
                    :lg="{ span: 12, offset: 6 }"
                    :xl="{ span: 12, offset: 6 }"
                >
                    <div class="common-step-container">
                        <Steps :current="current">
                            <Step title="步骤一"></Step>
                            <Step title="步骤二"></Step>
                            <Step title="步骤三"></Step>
                            <Step title="完成"></Step>
                        </Steps>
                    </div>
                    <Form v-show="current === 0" ref="basiceForm1" :model="basicFormData1" :rules="basicRuleValidate1" :label-width="100">
                        <FormItem label="表单输入" prop="input1">
                            <Input v-model="basicFormData1.input1" placeholder="请输入" clearable maxlength="50"></Input>
                        </FormItem>
                    </Form>

                    <Form v-show="current === 1" ref="basiceForm2" :model="basicFormData2" :rules="basicRuleValidate2" :label-width="100">
                        <FormItem label="表单输入" prop="input1">
                            <Input v-model="basicFormData2.input1" placeholder="请输入" clearable maxlength="50"></Input>
                        </FormItem>
                    </Form>

                    <Form v-show="current === 2" ref="basiceForm3" :model="basicFormData3" :rules="basicRuleValidate2" :label-width="100">
                        <FormItem label="表单输入" prop="input1">
                            <Input v-model="basicFormData3.input1" placeholder="请输入" clearable maxlength="50"></Input>
                        </FormItem>
                    </Form>

                    <div v-show="current === 3">
                        <Result></Result>
                    </div>
                </Col>
            </Row>
        </Card>
        <div class="common-botfix-btn-container">
            <Button
                @click="function() {
                    closeCurTab();
                    $router.push({ path: '/template/list' });
                }"
            >返回</Button>
            <Button v-show="current > 0 && current < 3" @click="prev">上一步</Button>
            <Button v-show="current < 2" type="primary" @click="next">下一步</Button>
            <Button v-show="current === 2" type="primary" :loading="loading" @click="save">保存</Button>
        </div>
    </div>
</template>
<script>
import { Steps, Step } from 'view-design';
import Result from '@/components/common/Result';

export default {
  components: {
    Steps,
    Step,
    Result
  },
  data () {
    return {
      type: 'add',
      current: 0,
      loading: false,
      basicFormData1: {
        input1: ''
      },
      basicRuleValidate1: {
        input1: [
          { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      basicFormData2: {
        input1: ''
      },
      basicRuleValidate2: {
        input1: [
          { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      basicFormData3: {
        input1: ''
      },
      basicRuleValidate3: {
        input1: [
          { required: true, message: '请输入', trigger: 'change' }
        ]
      }
    };
  },
  created() {
  },
  mounted() {
    if (this.$route.query.id) {
      this.type = 'edit';
      this.getDetail(this.$route.query.id);
    } else if (this.$route.query.copy) {
      this.type = 'copy';
      this.getDetail(this.$route.query.copy);
    } else {
      this.type = 'add';
    }
  },
  methods: {
    getDetail(id) { // 查询详情
    },
    next() { // 下一步
      let formRef = '';
      if (this.current === 0) {
        formRef = 'basiceForm1';
      } else if (this.current === 1) {
        formRef = 'basiceForm2';
      }
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          this.current += 1;
        }
      });
    },
    prev() { // 上一步
      this.current -= 1;
    },
    save() {
      this.$refs.basiceForm3.validate((valid) => {
        if (valid) {
          this.loading = true;
          setTimeout(() => {
            // 成功
            this.zzmkeepUpdate('/template/list');
            this.current += 1;
          }, 1000);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>