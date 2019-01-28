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
            <Form ref="articleForm"
                  :rules="articleFormDataRule" :model="articleFormData">
                <Row :gutter="32">
                    <Col span="24">
                        <FormItem prop="articleFormData.title">
                            <Input v-model="articleFormData.title"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="11">
                        <FormItem label="浏览权限:"
                                  prop="articleFormData.browsePrivilege">
                            <Select v-model="articleFormData.browsePrivilege" placeholder="请选择目录">
                                <Option v-for="item in articleBrowsePrivilegeList"
                                        :value="item" :key="item">{{
                                    item}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="11" offset="1">
                        <FormItem label="评论权限:"
                                  prop="articleFormData.commentPrivilege">
                            <Select v-model="articleFormData.commentPrivilege" placeholder="请选择目录">
                                <Option v-for="item in articleCommentPrivilegeList"
                                        :value="item" :key="item">{{
                                    item}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="8">
                        <FormItem label="目录:"
                                  prop="articleFormData.category">
                            <Select v-model="articleFormData.category" placeholder="请选择目录">
                                <Option v-for="item in getCategoriesList"
                                        :value="item.id" :key="item.id">{{
                                    item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="16">
                        <FormItem label="标签:"
                                  prop="articleFormData.tags">
                            <Select multiple
                                    v-model="articleFormData.tags" placeholder="请选择标签">
                                <Option v-for="item in getTagsList"
                                        :value="item.id" :key="item.id">{{
                                    item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="24">
                        <FormItem prop="articleFormData.content">
                            <i-editor :autosize="{ minRows: 15, maxRows: 20 }"
                                      :affix="true"
                                      :offset-top="30"
                                      v-model="articleFormData.content"></i-editor>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="editorDrawerFlag = false">取消</Button>
                <Button type="primary" @click="updateArticle('articleForm')">更新</Button>
            </div>
        </Drawer>
    </Row>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {DateFormat} from "@/libs/utils"

    export default {
        name: "Article",
        data() {
            return {
                editorDrawerFlag: false,
                articleBrowsePrivilegeList: [],
                articleCommentPrivilegeList: [],
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                articleFormData: {
                    accessTime: '',
                    articleId: '',
                    author: {},
                    browsePrivilege: '',
                    category: '',
                    commentPrivilege: '',
                    comments: [],
                    content: '',
                    createTime: '',
                    modifyTime: '',
                    tags: [],
                    title: '',
                },
                articleFormDataRule: {
                    content: [
                        {required: true, message: '文章内容不能为空', trigger: 'blur'}
                    ],
                    title: [
                        {required: true, message: '标题不能为空', trigger: 'blur'}
                    ],
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
            getTagsLength() {
                return this.getArticle().tags.length
            },
            getCommentsLength() {
                return this.getArticle().comments.length
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
            getArticleId() {
                return this.getArticle().articleId
            },
            getBrowsePrivilege() {
                return this.getArticle().browsePrivilege
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
            getTagsList() {
                let list = []
                if (!!this.getTags() && this.getTags().length > 0) {
                    for (let tag in this.getTags()) {
                        list.push({
                            id: this.getTags()[tag].tagId,
                            value: this.getTags()[tag].name,
                            desc: this.getTags()[tag].summary
                        })
                    }
                }
                return list
            },
            getCategoriesList() {
                let list = []
                if (!!this.getCategories() && this.getCategories().length > 0) {
                    for (let i in this.getCategories()) {
                        list.push({
                            id: this.getCategories()[i].categoryId,
                            value: this.getCategories()[i].name,
                            desc: this.getCategories()[i].summary
                        })
                    }
                }
                return list
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
            getCategoryName() {
                if (!!this.getArticle()
                    && !!this.getArticle().category
                    && !!this.getArticle().category.name) {
                    return this.getArticle().category.name;
                } else {
                    return ''
                }
            },
        },
        methods: {
            ...mapActions([
                'putArticleAct',
                'getArticleBrowsePrivilegeAct',
                'getArticleCommentPrivilegeAct',
                'getTagsAct',
                'getCategoriesAct',
            ]),
            ...mapGetters([
                'getArticle',
                'getCategories',
                'getTags',
                'getToken',
            ]),
            refreshData() {

            },
            openEditorDrawer() {
                this.editorDrawerFlag = true
                this.articleFormData = {...this.getArticle()}

                if (!!this.getArticle()
                    && !!this.getArticle().category
                    && !!this.getArticle().category.categoryId) {
                    this.articleFormData.category = this.getArticle().category.categoryId
                }
                this.articleFormData.tags = []
                for (let i in this.getArticle().tags) {
                    this.articleFormData.tags.push(this.getArticle().tags[i].tagId)
                }
                this.getArticleBrowsePrivilegeAct().then(res => {
                    this.articleBrowsePrivilegeList = res.data
                }).catch(err => {
                    console.error(err)
                })
                this.getArticleCommentPrivilegeAct().then(res => {
                    this.articleCommentPrivilegeList = res.data
                }).catch(err => {
                    console.error(err)
                })
                this.getTagsAct({page: 0, size: 100}).then(res => {
                }).catch(err => {
                    console.error(err)
                })
                this.getCategoriesAct({page: 0, size: 100}).then(res => {
                }).catch(err => {
                    console.error(err)
                })
            },
            updateArticle(name) {
                this.$refs[name].validate(valdate => {
                    if (valdate) {
                        let data = {...this.articleFormData}
                        data.tags = []
                        for (let i in this.articleFormData.tags) {
                            data.tags.push({
                                tagId: this.articleFormData.tags[i]
                            })
                        }
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