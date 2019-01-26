<template>
    <Row>
        <Col :lg="{ span: 20, pull: 2, push: 2 }">
            <Row type="flex" justify="center" align="middle">
                <Col span="24" class-name="article-title-container">
                    <div class="title">
                        {{getTitle}}
                    </div>
                    <div class="addtion-message">
                        <div class="create-time">
                            {{getCreateTime}}
                        </div>
                        <div class="author">
                            {{getAuthorName}}
                        </div>
                    </div>
                    <div class="content">
                        {{getContent}}
                    </div>
                </Col>
            </Row>
        </Col>
    </Row>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {DateFormat} from "@/libs/utils"

    export default {
        name: "Article",
        mounted() {
            this.refreshData()
        },
        computed: {
            getCreateTime() {
                return DateFormat(this.getCurrentArticle().createTime, "yyyy-MM-dd")
            },
            getTagsLength() {
                return this.getCurrentArticle().tags.length
            },
            getCommentsLength() {
                return this.getCurrentArticle().comments.length
            },
            getAuthorName() {
                return this.getCurrentArticle().author.nickname
            },
            getContent() {
                return this.getCurrentArticle().content
            },
            getTitle() {
                return this.getCurrentArticle().title
            },
            getArticleId() {
                return this.getCurrentArticle().articleId
            }
        },
        methods: {
            ...mapActions([]),
            ...mapGetters([
                'getCurrentArticle'
            ]),
            refreshData() {

            }
        }
    }
</script>

<style lang="less" scoped>

    .article-title-container {

        .title {
            font-size: 1.5rem;
            text-align: center;
        }
        .addtion-message {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            padding: 0.5rem 0 1rem;
            .create-time {
                padding: 0 0.5rem;
                color: #aaa;
            }
            .author {
                padding: 0 0.5rem;
                color: #aaa;
            }
        }
        .content {
            border-top: 1px solid #ccc;
            padding-top: 1.5rem;
            text-indent: 2em;
        }

    }

</style>