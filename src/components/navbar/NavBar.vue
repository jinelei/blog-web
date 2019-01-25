<template>
    <Row justify="center" type="flex" class="nav-container">
        <Col span="2" offset="2">
            <img alt="logo" :src="logo">
        </Col>
        <Col span="2">
            jinelei
        </Col>
        <Col span="2" offset="2" pull="2">
            <Login/>
        </Col>
    </Row>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {Login} from '@/components/login'
    import logo from '@/assets/logo.png'

    export default {
        name: 'NavBar',
        props: {},
        data() {
            return {
                logo: logo
            }
        },
        components: {
            Login,
        },
        mounted() {
        }
        ,
        methods: {
            ... mapGetters([]),
            ... mapActions([])
        }
        ,
    }
</script>

<style scoped lang="less">
    .nav-container {
        padding: 0;
        margin: 0;
        background: rgba(0, 0, 0, 0.7);
        height: 4em;
        color: #fff;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>
