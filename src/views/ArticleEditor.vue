<template>
    <i-editor v-model="content"></i-editor>
</template>

<script>
    export default {
        name: "ArticleEditor",
        data() {
            return {
                content: ''
            }
        }
    }
</script>

<style scoped>

</style>