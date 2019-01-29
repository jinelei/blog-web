<template>
    <div class="layout">
        <header class="header">
            <NavBar/>
        </header>
        <main class="main">
            <router-view/>
        </main>
        <footer class="footer">
            2011-2016 &copy; TalkingData
        </footer>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {Login} from '@/components/login'
    import Link from "iview/src/mixins/link"
    import NavBar from "@/components/navbar/NavBar"

    export default {
        components: {
            NavBar,
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
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        .header {
            background-color: @default-nav-background;
            height: 3rem;
            position: fixed;
            width: 100%;
            z-index: 999999;
        }
        .main {
            margin-top: 4rem;
            min-height: 30rem;
        }
        .footer {
            text-align: center;
        }
    }
</style>
