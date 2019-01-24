<template>
    <div class="nav-container">
        asdf
        <Login/>
    </div>

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
            let username = "username20"
            let password = "test"
            this.login({username, password}).then(res => {
                this.getUser({id: 3}).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
            })
            setTimeout(this.logout, 9000)
        }
        ,
        methods: {
            ...
                mapGetters([
                    'getToken',
                ]),
            ...
                mapActions([
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
        background: rgba(0, 0, 0, 0.2);
    }
</style>
