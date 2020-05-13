<!--
 * @Description: 文件说明
 * @Date: 2019-10-15 16:48:15
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-11-21 19:05:26
 -->
<template>
    <header class="header">
        <Row>
            <Col span="18" class="breadcrumb">
                <Breadcrumb>
                    <span v-if="breadcrumbArr.length > 2" @click="goBack">
                        <Icon class="arrow-back" type="ios-arrow-back" />
                    </span>
                    <span
                        v-for="(item, index) in breadcrumbArr"
                        :key="item.path"
                    >
                        <BreadcrumbItem
                            v-if="
                                item.isLink &&
                                    index !== breadcrumbArr.length - 1
                            "
                            :to="item.path"
                        >
                            {{ item.module_name }}
                        </BreadcrumbItem>
                        <BreadcrumbItem v-else>
                            {{ item.module_name }}
                        </BreadcrumbItem>
                    </span>
                </Breadcrumb>
            </Col>
            <Col span="6">
                <div class="headerRight">
                    <!-- <Icon type="ios-search" />
                              <Icon type="ios-notifications-outline" />-->
                    <Dropdown
                        placement="bottom-start"
                        class="user-wrapper"
                        @on-click="ctrlHandle"
                    >
                        <span>
                            <Avatar
                                icon="ios-person"
                                size="small"
                                style="margin-right:8px"
                            />{{ user.username }}
                        </span>
                        <DropdownMenu slot="list">
                            <!-- <DropdownItem class="account-item" name="account">
                                账号信息
                            </DropdownItem> -->
                            <DropdownItem
                                v-if="user.user_type === 2"
                                class="account-item"
                                name="password"
                            >
                                修改密码
                            </DropdownItem>
                            <DropdownItem class="account-item" name="logout">
                                退出
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </Col>
            <Modal
                v-model="pwdModal"
                :title="passwordTitle"
                :loading="loading"
                @on-ok="changePassword"
                @on-cancel="pwdModal = false"
            >
                <Form
                    ref="pwdForm"
                    :model="pwdForm"
                    :rules="rules"
                    label-position="right"
                    :label-width="90"
                >
                    <FormItem label="旧密码" prop="old_password">
                        <Input
                            v-model="pwdForm.old_password"
                            type="password"
                            password
                            :placeholder="rules.old_password[0].message"
                            clearable
                        />
                    </FormItem>
                    <FormItem label="新密码" prop="new_password">
                        <Input
                            v-model="pwdForm.new_password"
                            type="password"
                            password
                            :placeholder="rules.new_password[0].message"
                            maxlength="20"
                            clearable
                        />
                    </FormItem>
                    <FormItem label="新密码确认" prop="repeat_new_password">
                        <Input
                            v-model="pwdForm.repeat_new_password"
                            type="password"
                            password
                            :placeholder="rules.repeat_new_password[0].message"
                            maxlength="20"
                            clearable
                        />
                    </FormItem>
                </Form>
            </Modal>
        </Row>
    </header>
</template>
<script type="text/babel">
import { mapState, mapActions } from 'vuex';
import { Dropdown, DropdownItem, DropdownMenu } from 'view-design';
import { putChagePassword } from '@/server/permission';
export default {
    components: {
        Dropdown,
        DropdownItem,
        DropdownMenu
    },
    data() {
        return {
            passwordTitle: '修改密码',
            loading: true,
            pwdModal: false,
            breadcrumbArr: [],
            pwdForm: {
                old_password: '',
                new_password: '',
                repeat_new_password: ''
            },
            rules: {
                old_password: [
                    {
                        required: true,
                        message: '请输入旧密码'
                    }
                ],
                new_password: [
                    {
                        required: true,
                        message: '请输入6-20位以内的密码'
                    },
                    { type: 'string', min: 6, message: '请输入6-20位以内的密码', trigger: 'blur' }
                ],
                repeat_new_password: [
                    {
                        required: true,
                        message: '请输入6-20位以内的密码'
                    },
                    { type: 'string', min: 6, message: '请输入6-20位以内的密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value !== this.pwdForm.new_password) {
                                callback(new Error('两次输入的密码不同'));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    computed: {
        ...mapState(['user'])
    },
    watch: {
        $route(from, to) {
            this.breadcrumbMath();
        }
    },
    created() {
        this.breadcrumbMath();
    },
    mounted() {
        if (this.user.user_type === 2 && !this.user.last_login_time) {
            this.passwordTitle = `欢迎您 ${this.user.username} ，在正式使用方舟前，请先修改您的密码。`;
            this.pwdModal = true;
        }
    },
    methods: {
        ...mapActions(['USER_SIGNOUT']),
        breadcrumbMath() {
            const pathArr = this.$route.matched;
            this.breadcrumbArr = [];
            for (var i = 0; i < pathArr.length; i++) {
                if (pathArr[i].meta && pathArr[i].meta.name) { // 取路由里设置的name
                    this.breadcrumbArr.push({
                        path: pathArr[i].path,
                        module_name: pathArr[i].meta.name
                    });
                    document.title = pathArr[i].meta.name;
                }
            }
        },
        async ctrlHandle(val) {
            switch (val) {
                case 'logout':
                    await this.USER_SIGNOUT();
                    //   this.$router.push('/login');
                    break;
                case 'account':
                    this.$router.push('/account/baseInfo');
                    break;
                case 'password':
                    this.pwdModal = true;
                    break;
                default:
                    break;
            }
        },
        changePassword() {
            this.$refs.pwdForm.validate(async valid => {
                if (valid) {
                    const { data } = await putChagePassword(this.user.id, this.pwdForm);
                    if (data.code === 0) {
                        this.$Message.success('密码修改成功，请重新登录');
                        this.pwdModal = false;
                        this.$router.push({ name: 'login', query: { type: 'developer' } });
                    }
                }
                this.closeLoading();
            });
        },
        goBack() {
            this.$router.go(-1);
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
<style lang="less" scoped>
.header {
    background: #fff;
    width: 100%;
    height: 100%;
    .headerRight {
        text-align: right;
        font-size: 20px;
        cursor: pointer;
        i {
            margin-right: 15px;
            cursor: pointer;
        }
        span {
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    :global(.ivu-breadcrumb a) {
        color: inherit;
    }
    :global(.ivu-breadcrumb a:hover) {
        color: #3388ff;
    }
    .account-item {
        padding: 10px 0;
        width: 150px;
        text-align: center;
    }
}
.breadcrumb {
    height: 57px;
}
.arrow-back {
    font-size: 20px;
    margin-top: -4px;
    cursor: pointer;
}
</style>