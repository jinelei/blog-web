<template>
    <div class="layout">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%', 'z-index':'99999'}">
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">jinelei</div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <router-link to="/">index</router-link>
                        </MenuItem>
                        <MenuItem name="2">
                            <router-link to="/about">about</router-link>
                        </MenuItem>
                        <MenuItem name="3">
                            <Login/>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
                <router-view/>
            </Content>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>
<!--<NavBar/>-->

<script>
    import {mapActions} from 'vuex'
    import {Login} from '@/components/login'

    export default {
        components: {
            Login
        },
        data() {
            return {
                isCollapsed: false
            }
        },
        computed: {
            rotateIcon() {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses() {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            ...mapActions([
                'logout',
            ]),
            collapsedSider() {
                this.$refs.side1.toggleCollapse();
            }
        },
        destroyed() {
            this.logout()
        }
    }
</script>

<style lang="less">
    * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .layout {
        /*border: 1px solid #d7dde4;*/
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;

        .layout-logo {
            width: 100px;
            /*height: 30px;*/
            /*background: #5b6270;*/
            /*border-radius: 3px;*/
            float: left;
            position: relative;
            /*top: 15px;*/
            left: 20px;
            color: #fff;
            font-size: 1rem;
            text-align: center;
        }

        .layout-nav {
            width: 420px;
            margin: 0 auto;
            margin-right: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
        }

        .layout-footer-center {
            text-align: center;
        }
    }
</style>
