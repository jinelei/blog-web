<template>
    <div class="navbar-container">
        <div class="navbar-logo">
            <router-link to="/">jinelei</router-link>
        </div>
        <div class="navbar-menu">
            <ul class="navbar-menu-list">
                <li class="navbar-menu-item">
                    <router-link to="/">
                        <Icon type="ios-paper"/>
                    </router-link>
                </li>
                <li class="navbar-menu-item" v-if="!!getToken()">
                    <router-link to="/tags">
                        <Icon type="md-pricetags"/>
                    </router-link>
                </li>
            </ul>
            <Login/>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {Login} from '@/components/login'

    export default {
        name: "NavBar",
        components: {Login},
        methods: {
            ...mapGetters(['getToken'])
        }
    }
</script>

<style lang="less" scoped>
    .navbar-container {
        padding: 0 1rem;
        height: 3rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .navbar-logo {
            a {
                font-size: 1.2rem;
                font-weight: bold;
                color: #fff;
            }
            a:visited {
                color: #fff;
            }
        }
        .navbar-menu {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .navbar-menu-list {
                list-style: none;
                .navbar-menu-item {
                    float: left;
                    color: #fff;
                    font-size: 1rem;
                    margin: 0 0.5rem;
                    a {
                        font-size: 1.3rem;
                        color: #fff;
                    }
                    a:visited {
                        color: #fff;
                    }
                }
            }
        }
    }
</style>