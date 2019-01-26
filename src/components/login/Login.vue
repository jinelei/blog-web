<template>
    <div class="login-container">
        <template v-if="this.isLogin">
            <Dropdown class="user-setting-dropdown" transfer trigger="click">
                <a href="javascript:void(0)">
                    <Avatar icon="ios-person"/>
                    &nbsp;
                    {{getNickName}}
                    <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list" class="user-setting-dropdown-menu">
                    <DropdownItem>
                        <Button type="text">设置</Button>
                    </DropdownItem>
                    <DropdownItem>
                        <Button type="text" @click="userLogout">登出</Button>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </template>
        <template v-else>
            <Avatar @click="openModal" icon="ios-person"/>
            <Button ghost type="text" @click="openModal">登录</Button>
        </template>
        <Modal
                v-model="loginModal"
                title="用户登录"
                :closable="false"
                :mask-closable="false">
            <div slot="footer">
                <Button type="text" @click="loginCancel('loginForm')">取消</Button>
                <Button type="primary" size="large" @click="userLogin('loginForm')">确定</Button>
            </div>
            <Form ref="loginForm" :model="loginForm" :rules="loginFormRule">
                <FormItem prop="username">
                    <Input type="text" v-model="loginForm.username" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input @on-enter="userLogin('loginForm')" type="password" v-model="loginForm.password"
                           placeholder="密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "Login",
        data() {
            return {
                loginModal: false,
                loginForm: {
                    username: '',
                    password: ''
                },
                loginFormRule: {
                    username: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {type: 'string', min: 4, message: '密码最少4位', trigger: 'blur'}
                    ]
                }
            }
        },
        computed: {
            isLogin() {
                return this.getToken() == '' ? false : true;
            },
            getNickName() {
                return this.getCurrentUser().nickname;
            }
        },
        methods: {
            ...mapGetters([
                'getToken',
                'getCurrentUser',
            ]),
            ...mapActions([
                'setTokenAct',
                'removeTokenAct',
            ]),
            openModal() {
                this.loginModal = true
            },
            userLogin(name) {
                this.$refs[name].validate(validate => {
                    if (validate) {
                        let {username, password} = this.loginForm;
                        this.setTokenAct({username, password}).then(res => {
                            this.$Message.success(`欢迎回来，${res.data.nickname}!`)
                            this.$nextTick(() => {
                                this.$refs [name].fields.forEach(function (e) {
                                    if (e.prop == 'password') {
                                        e.resetField()
                                    }
                                })
                                this.loginModal = false
                                console.log(this.$route)
                                this.$router.push({path: '/'})
                            })
                        }).catch(err => {
                            this.$Message.error("登录失败，请重试!")
                        })
                    }
                })
            },
            loginCancel(name) {
                this.$nextTick(() => {
                    this.loginModal = false
                    this.$refs[name].resetFields()
                })
            },
            userLogout() {
                this.removeTokenAct().then(res => {
                    this.$router.replace({path: '/'})
                }).catch(err => {
                    this.$router.replace({path: '/'})
                });
            }
        }
    }
</script>

<style lang="less" scoped>

    .login-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        min-width: 180px;
        .tips {
            font-size: 1rem;
            padding-left: 0.5rem;
        }

        .user-setting-dropdown {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            a {
                color: #ff0;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                min-width: 100px;
            }
            .user-setting-dropdown-menu {
            }
        }
    }

</style>