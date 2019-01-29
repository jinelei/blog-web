<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <router-link to="/">jinelei</router-link>
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon size="20" type="ios-navigate"/>
                            <router-link to="/"> 发现</router-link>
                        </MenuItem>
                        <MenuItem v-if="isLogin" name="2">
                            <Icon size="20" type="md-pricetag"/>
                            <router-link to="/tags">标签</router-link>
                        </MenuItem>
                        <MenuItem name="3">
                            <Login/>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{minHeight: '500px'}">
                <router-view/>
            </Content>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {Login} from '@/components/login'
    import Link from "iview/src/mixins/link";

    export default {
        components: {
            Link,
            Login
        },
        data() {
            return {}
        },
        computed: {
            isLogin() {
                return this.getToken() == '' ? false : true;
            },
        },
        methods: {
            ...mapGetters([
                'getToken',
            ]),
            ...mapActions([
                'setTokenAct',
            ]),
        },
        destroyed() {
            console.log('destroyed')
            this.setTokenAct()
        }
    }
</script>

<style lang="less">
    @import "common";

    * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        .layout-logo {
            float: left;
            color: #fff;
            font-size: 2.2rem;
            width: 3em;
            left: 3rem;
            top: 0;
        }
        .layout-nav {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            a {
                color: #ccc;
                font-size: 0.9rem;
            }
        }
        .layout-footer-center {
            text-align: center;
        }
    }
</style>
