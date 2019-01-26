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
                        <div class="browse-privilege">
                            {{getBrowsePrivilege}}
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
                return DateFormat(this.getArticle().createTime, "yyyy-MM-dd")
            },
            getTagsLength() {
                return this.getArticle().tags.length
            },
            getCommentsLength() {
                return this.getArticle().comments.length
            },
            getAuthorName() {
                return this.getArticle().author.nickname
            },
            getContent() {
                return this.getArticle().content
            },
            getTitle() {
                return this.getArticle().title
            },
            getArticleId() {
                return this.getArticle().articleId
            },
            getBrowsePrivilege() {
                let browsePrivilege = this.getArticle().browsePrivilege
                switch (browsePrivilege) {
                    case 'ALLOW_ALL':
                        return '公开'
                    case 'ALLOW_MYSELF':
                        return '私有'
                    default:
                        return '未知'
                }
            }
        },
        methods: {
            ...mapActions([]),
            ...mapGetters([
                'getArticle'
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
            & div {
                padding: 0 0.5rem;
                color: #aaa;
            }
            .create-time {
            }
            .author {
            }
        }
        .content {
            border-top: 1px solid #ccc;
            padding-top: 1.5rem;
            text-indent: 2em;
            user-select: text;
        }

    }

</style>