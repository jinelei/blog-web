<template>
    <Row class-name="editor">
        <Col>
            <i-editor :autosize="{ minRows: 25, maxRows: 30 }"
                      :affix="true"
                      :offset-top="30"
                      v-model="content"></i-editor>
        </Col>

    </Row>
</template>

<script>
    export default {
        name: "ArticleEditor",
        data() {
            return {
                content: '',
            }
        }
    }
</script>

<style lang="less" scoped>

    .editor {
    }

</style>