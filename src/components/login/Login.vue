<template>
    <div>
        <template v-if="this.isLogin">
            <div>logout</div>
        </template>
        <template v-else>
            <div>login</div>
        </template>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "Login",
        computed: {
            isLogin() {
                return this.getToken() == '' ? false : true;
            }
        },
        methods: {
            ...mapGetters(['getToken']),
            ...mapActions([])
        }
    }
</script>

<style scoped>

</style>