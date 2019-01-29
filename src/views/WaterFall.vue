<template>
    <Row>
        <Col :lg="{ span: 24 }"
             :md="{ span: 22, push: 1, pull: 1 }"
             :sm="{ span: 22, push: 1, pull: 1 }"
             :xs="{ span: 22, push: 1, pull: 1 }">
            <Button @click="refreshData">refresh</Button>
            <Row :gutter="16" type="flex" justify="space-between" align="top">
                <template v-for="article in getArticleList">
                    <ArticleCard :article="article"/>
                </template>
            </Row>
        </Col>
    </Row>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {DateFormat} from "@/libs/utils"
    import ArticleCard from '@/components/article-card'

    export default {
        name: "WaterFall",
        components: {
            ArticleCard
        },
        props: {},
        data() {
            return {
                formFilter: {
                    page: 0,
                    size: 10
                },
            }
        },
        mounted() {
            console.log("login user id: " + this.loginUserId)
            this.refreshData()
        },
        computed: {
            getArticleList() {
                return this.getArticles()
            }
        },
        methods: {
            ...mapGetters([
                'getArticles'
            ]),
            ...mapActions([
                'getArticlesAct'
            ]),
            refreshData() {
                let {page, size} = this.formFilter
                this.getArticlesAct({page, size}).then(res => {
                    this.articles = res.data
                }).catch(err => {
                    console.error(err)
                })
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../common.less";

</style>