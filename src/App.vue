<template>
    <div id="app">
        <NavBar/>
        <router-view/>
    </div>
</template>

<script>
    import NavBar from '@/components/navbar'

    export default {
        components: {
            NavBar
        }
    }
</script>

<style lang="less">
    * {
        margin: 0;
        padding: 0;
    }
</style>
