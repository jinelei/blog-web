<template>
    <Row justify="center" type="flex" class="nav-container">
        <Col span="2" offset="2">
        </Col>
        <Col span="2" offset="2" pull="2">
            <Login/>
        </Col>
    </Row>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {Login} from '@/components/login'

    export default {
        name: 'NavBar',
        props: {},
        components: {
            Login,
        },
        mounted() {
            // let username = "username20"
            // let password = "test"
            // this.login({username, password}).then(res => {
            //     this.getUser({id: 3}).then(res => {
            //         console.log(res)
            //     }).catch(err => {
            //         console.log(err)
            //     })
            // }).catch(err => {
            // })
            // setTimeout(this.logout, 9000)
        }
        ,
        methods: {
            ... mapGetters([
                'getToken',
            ]),
            ... mapActions([
                'login',
                'logout',
                'getUser',
            ])
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
