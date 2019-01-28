<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">jinelei</div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            <router-link to="/"> 发现</router-link>
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            标签
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-paper"></Icon>
                            文章
                        </MenuItem>
                        <MenuItem name="4">
                            <Login/>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0 50px', minHeight: '500px'}">
                <router-view/>
            </Content>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
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
        computed: {},
        methods: {
            ...mapActions([
                'setTokenAct',
            ]),
        },
        destroyed() {
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
        /*display: flex;*/
        /*flex-direction: row;*/
        /*justify-content: space-between;*/
        /*align-items: center;*/
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
            .menu-item {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                color: #fff;
                padding: 0.5rem 1rem;
                margin: 0 0.5rem;
                font-size: 1rem;
                font-weight: bold;
                border-radius: 5px;
            }
        }
        .layout-footer-center {
            text-align: center;
        }
    }
</style>
