<template>
    <div class="login-container">
        <template v-if="this.isLogin">
            <div class="tips">logout</div>
        </template>
        <template v-else>
            <Avatar @click="openModal" icon="ios-person"/>
            <Button type="text" @click="openModal">登录</Button>
        </template>
        <Modal
                v-model="loginModal"
                title="用户登录"
                :closable="false"
                :mask-closable="false">
            <div slot="footer">
                <Button type="text" @click="loginModal=false">取消</Button>
                <Button type="primary" size="large" @click="userLogin">确定</Button>
            </div>
            <Form ref="loginForm" :model="loginForm" :rules="loginFormRule">
                <FormItem prop="user">
                    <Input type="text" v-model="loginForm.username" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="loginForm.password" placeholder="密码">
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
            }
        },
        methods: {
            ...mapGetters(['getToken']),
            ...mapActions([
                'login',
                'logout',
                'getUser',
            ]),
            openModal() {
                this.loginModal = true
            },
            userLogin() {
                this.$refs['loginForm'].validate(res => {
                    console.log(res)
                })
                // this.loginModal = false
            },
            loginCancel() {
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
        color: #f00;
        .tips {
            font-size: 1rem;
            padding-left: 0.5rem;
        }
    }

</style>