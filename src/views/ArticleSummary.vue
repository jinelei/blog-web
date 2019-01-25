<template>
    <Row>
        <Col :lg="{ span: 20, pull: 2, push: 2 }">
            <Button @click="refreshData">refresh</Button>
            文章列表
            <Row :gutter="16" type="flex" justify="space-between" align="top">
                <template v-for="article in articles">
                    <ArticleSummaryItem :article="article"/>
                </template>
            </Row>
        </Col>
    </Row>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import ArticleSummaryItem from '@/components/article-summary-item'

    export default {
        name: "ArticleSummary",
        components: {
            ArticleSummaryItem
        },
        props: {
            loginUserId: ''
        },
        data() {
            return {
                formFilter: {
                    page: 0,
                    size: 10
                },
                articles: []
            }
        },
        mounted() {
            // console.log("login user id: " + this.loginUserId)
            // this.refreshData()
        },
        computed: {},
        methods: {
            ...mapGetters([]),
            ...mapActions([
                'getArticles'
            ]),
            refreshData() {
                let {page, size} = this.formFilter
                this.getArticles({page, size}).then(res => {
                    this.articles = res.data
                }).catch(err => {
                    console.err(err)
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../common.less";

</style>