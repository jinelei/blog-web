<template>
    <Col span="7" class-name="container">
        <div class="container-inner" @click="enterArticle">
            <div class="content-wrapper">
                <div class="content">
                    {{getContent}}
                </div>
                <div class="title">
                    {{getTitle}}
                </div>
                <div class="footer">
                    <div class="create-time">
                        {{getCreateTime}}
                    </div>
                    <div class="author">
                        {{getAuthorName}}
                    </div>
                </div>
            </div>
        </div>
    </Col>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {DateFormat} from "@/libs/utils"
    import develop from '@/assets/develop.png'

    export default {
        name: "ArticleCard",
        data() {
            return {
                defaultImage: develop,
            }
        },
        props: {
            article: Object
        },
        computed: {
            getCreateTime() {
                return DateFormat(this.article.createTime, "yyyy-MM-dd")
            },
            getTagsLength() {
                return this.article.tags.length
            },
            getCommentsLength() {
                return this.article.comments.length
            },
            getAuthorName() {
                return this.article.author.nickname
            },
            getContent() {
                return !!this.article.content && this.article.content.length > 40
                    ? this.article.content.substring(0, 40) + '...'
                    : this.article.content;
            },
            getTitle() {
                return this.article.title
            }
        },
        methods: {
            ...mapActions([
                'getArticleAct',
            ]),
            enterArticle() {
                this.getArticleAct({id: this.article.articleId}).then(res => {
                    this.$router.push({
                        path: "/article"
                    })
                }).catch(err => {
                    this.$Message.error("获取文章内容失败！" + JSON.stringify(err))
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .container {
        margin: 1rem;
        .container-inner {
            display: flex;
            justify-content: flex-end;
            flex-direction: column;
            margin: 0;
            width: 100%;
            min-height: 350px;
            border-radius: 5px;
            background: url("../../assets/develop.png");
            background-clip: content-box;
            background-origin: padding-box;
            background-position: center;
            /*background-attachment: fixed;*/
            background-repeat: no-repeat;
            /*border: 1px rgb(220,220,220) solid;*/
            /*box-shadow: 0px 0px 5px rgba(150, 150, 150, 0.5);*/
            padding: 0;
            &:hover {
                transform: scale(1.01);
                box-shadow: 0px 0px 36px rgba(150, 150, 150, 0.5);
                & .content-wrapper {
                    /*border: 1px rgb(180,180,180) solid;*/
                    /*transform: scale(1.01);*/
                    background-repeat: no-repeat;
                    background: linear-gradient(15deg, rgba(255, 255, 255, 1) 39%, rgba(0, 0, 0, 0.3) 40%),
                    linear-gradient(-10deg, rgba(0, 0, 0, 0.7) 39%, rgba(0, 0, 0, 0.3) 40%);
                    & .content {
                        top: 3%;
                        opacity: 1;
                        transition-delay: 50ms;
                        transition-duration: 500ms;
                    }
                }
            }
            .content-wrapper {
                padding: 0;
                border-radius: 5px;
                /*border: 1px #aaa solid;*/
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
                justify-content: flex-end;
                align-items: flex-start;
                flex-direction: column;
                background-clip: content-box;
                background-origin: padding-box;
                background-position: center;
                /*background-attachment: fixed;*/
                background-repeat: no-repeat;
                background: linear-gradient(15deg, rgba(255, 255, 255, 1) 39%, rgba(0, 0, 0, 0) 40%),
                linear-gradient(-10deg, rgba(0, 0, 0, 0.7) 39%, rgba(0, 0, 0, 0) 40%);
                .content {
                    position: absolute;
                    top: 10%;
                    padding: 1rem 1.5rem;
                    font-size: 0.9rem;
                    align-items: center;
                    opacity: 0;
                    color: #fff;
                }
                .title {
                    font-size: 1rem;
                    font-weight: bold;
                    margin: 0 1rem 1rem 1rem;
                    text-align: center;
                    background: linear-gradient(
                            30deg,
                            rgba(0, 0, 0, 0.5) 0%,
                            rgba(0, 0, 0, 0.5) 40%,
                    );
                    background: #fff;
                }
                .footer {
                    width: 100%;
                    padding: 0.3rem 0.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 0.2rem;
                    border-top: 1px solid #eee;
                    .create-time {
                        color: #ccc;
                        font-size: 0.4rem;
                    }
                    .author {
                        color: #aaa;
                    }
                }
            }
        }
    }

</style>