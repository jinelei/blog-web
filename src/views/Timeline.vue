<template>
    <Row>
        <Col :lg="{ span: 20, pull: 2, push: 2 }">
            <template v-for="article in getArticleList">
                {{isCurrentDate(article.createTime)}}
                <div v-if="isCurrentDate(article.createTime)" class="publish-date">
                    {{getFormatDate(article.createTime,"yyyy-MM")}}
                </div>
                <div class="publish-item">
                    <div class="title">
                        {{article.title}}
                    </div>
                    <div class="date">
                        <span>发布于：</span>
                        <span>{{getFormatDate(article.createTime,"yyyy-MM-dd")}}</span>
                    </div>
                </div>
            </template>
        </Col>
    </Row>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {DateFormat} from "@/libs/utils"

    export default {
        name: "Timeline",
        data() {
            return {
                formFilter: {
                    page: 0,
                    size: 10
                },
                currentDate: '',
            }
        },
        mounted() {
            // console.log("login user id: " + this.loginUserId)
            this.refreshData()
        },
        computed: {
            getArticleList() {
                return this.getArticles()
            },
        },
        methods: {
            ...mapGetters([
                'getArticles'
            ]),
            ...mapActions([
                'getArticlesAct'
            ]),
            isCurrentDate(time) {
                let d = DateFormat(time, "MM-dd")
                if (this.currentDate != d) {
                    this.currentDate = d
                    console.log('true')
                    return true
                } else {
                    console.log('false')
                    return false
                }
            },
            getFormatDate(time, fmt) {
                let d = DateFormat(time, fmt)
                return d
            },
            refreshData() {
                let {page, size} = this.formFilter
                let descBy = 'createTime'
                this.getArticlesAct({page, size, descBy}).then(res => {
                    this.articles = res.data
                }).catch(err => {
                    console.error(err)
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .publish-date {
        font-size: 1.5rem;
        color: rgba(255, 0, 0, 0.7);
    }

    .publish-item {
        border-radius: 5px;
        width: 200px;
        height: 80px;
        padding: 0.5rem;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.3);
        &:hover {
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
        }
        .title {
            font-size: 1.1rem;
            text-align: center;
        }
        .date {
            padding: 0 0.7rem;
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            color: #777;
        }
    }
</style>