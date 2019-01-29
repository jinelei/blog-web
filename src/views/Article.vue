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
                            {{getBrowsePrivilegeString}}
                        </div>
                    </div>
                    <div class="content">
                        {{getContent}}
                    </div>
                </Col>
            </Row>
        </Col>
        <Affix v-if="isLogin" :offset-top="20">
            <div @click="openEditorDrawer" class="editor-float-btn">
                <Icon type="md-create"/>
            </div>
        </Affix>
        <Drawer
                title="修改文章"
                v-model="editorDrawerFlag"
                width="720"
                :mask-closable="false"
                :styles="styles">
            <ArticleEditor ref="articleEditor" :articleRef="getArticle()"/>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="editorDrawerFlag = false">取消</Button>
                <Button type="primary" @click="updateArticle('articleForm')">更新</Button>
            </div>
        </Drawer>
    </Row>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {ArticleEditor} from '@/components/article-editor'
    import {DateFormat} from "@/libs/utils"

    export default {
        name: "Article",
        components: {
            ArticleEditor
        },
        data() {
            return {
                editorDrawerFlag: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
            }
        },
        mounted() {
            this.refreshData()
        },
        computed: {
            isLogin() {
                return this.getToken() == '' ? false : true;
            },
            getCreateTime() {
                return DateFormat(this.getArticle().createTime, "yyyy-MM-dd")
            },
            getAuthorName() {
                if (!!this.getArticle().author && !!this.getArticle().author.nickname)
                    return this.getArticle().author.nickname
                else
                    return ''
            },
            getContent() {
                return this.getArticle().content
            },
            getTitle() {
                return this.getArticle().title
            },
            getBrowsePrivilegeString() {
                let browsePrivilege = this.getArticle().browsePrivilege
                switch (browsePrivilege) {
                    case 'ALLOW_ALL':
                        return '公开'
                    case 'ALLOW_MYSELF':
                        return '私有'
                    default:
                        return '未知'
                }
            },
            getCategoryId() {
                if (!!this.getArticle()
                    && !!this.getArticle().category
                    && !!this.getArticle().category.categoryId) {
                    return this.getArticle().category.categoryId;
                } else {
                    return ''
                }
            },
        },
        methods: {
            ...mapActions([
                'putArticleAct',
            ]),
            ...mapGetters([
                'getArticle',
                'getToken',
            ]),
            refreshData() {

            },
            openEditorDrawer() {
                this.$refs['articleEditor'].refreshData()
                this.editorDrawerFlag = true
            },
            updateArticle() {
                this.$refs['articleEditor'].validateFormData().then(valdate => {
                    if (valdate) {
                        let data = {...this.$refs['articleEditor'].getFormData()}
                        let tags = []
                        for (let i in data.tags) {
                            tags.push({
                                tagId: data.tags[i]
                            })
                        }
                        data.tags = tags
                        if (!!data.category) {
                            data.category = {
                                categoryId: data.category
                            }
                        }
                        this.putArticleAct(data).then(res => {
                            this.editorDrawerFlag = false
                            this.$Message.success('修改文章成功')
                        }).catch(err => {
                            this.$Message.error(err)
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>

    @import "../common";

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

    .editor-float-btn {
        float: right;
        font-size: 2rem;
        width: 3rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: @default-nav-background;
        &:hover {
            color: #ccc;
        }
    }

</style>