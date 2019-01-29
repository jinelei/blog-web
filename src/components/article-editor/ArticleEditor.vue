<template>
    <div class="article-editor">
        <Form ref="articleEditorForm"
              :rules="articleEditorFormRule"
              :model="articleEditorFormData">
            <Row :gutter="32">
                <Col span="24">
                    <FormItem prop="title">
                        <Input v-model="articleEditorFormData.title"/>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="11">
                    <FormItem label="浏览权限:"
                              prop="browsePrivilege">
                        <Select v-model="articleEditorFormData.browsePrivilege" placeholder="请选择目录">
                            <Option v-for="item in articleBrowsePrivilegeList"
                                    :value="item" :key="item"
                            >{{item}}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="11" offset="1">
                    <FormItem label="评论权限:"
                              prop="commentPrivilege">
                        <Select v-model="articleEditorFormData.commentPrivilege" placeholder="请选择目录">
                            <Option v-for="item in articleCommentPrivilegeList"
                                    :value="item" :key="item"
                            >{{item}}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="8">
                    <FormItem label="目录:"
                              prop="category">
                        <Select v-model="articleEditorFormData.category" placeholder="请选择目录">
                            <Option v-for="item in getCategoriesList"
                                    :value="item.id" :key="item.id"
                            >{{item.value}}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="16">
                    <FormItem label="标签:"
                              prop="tags">
                        <Select multiple
                                v-model="articleEditorFormData.tags" placeholder="请选择标签">
                            <Option v-for="item in getTagsList"
                                    :value="item.id" :key="item.id"
                            >{{item.value}}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="24">
                    <FormItem prop="content">
                        <i-editor :autosize="{ minRows: 15, maxRows: 20 }"
                                  :affix="true"
                                  :offset-top="30"
                                  v-model="articleEditorFormData.content"></i-editor>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "ArticleEditor",
        props: {
            articleRef: Object,
            confirmFunc: Function,
            cancelFunc: Function,
        },
        data() {
            return {
                editorDrawerFlag: false,
                articleBrowsePrivilegeList: [],
                articleCommentPrivilegeList: [],
                articleEditorFormData: {
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
                articleEditorFormRule: {
                    title: [
                        {required: true, message: '标题不能为空', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted() {
            this.refreshData()
        },
        computed: {
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
        },
        methods: {
            ...mapActions([
                'getArticleBrowsePrivilegeAct',
                'getArticleCommentPrivilegeAct',
                'getTagsAct',
                'getCategoriesAct',
            ]),
            ...mapGetters([
                'getCategories',
                'getTags',
            ]),
            refreshData() {
                this.$refs['articleEditorForm'].resetFields()
                if (!!this.articleRef) {
                    this.articleEditorFormData = {...this.articleRef}
                    if (!!this.articleRef.category
                        && !!this.articleRef.category.categoryId) {
                        this.articleEditorFormData.category = this.articleRef.category.categoryId
                    }
                    this.articleEditorFormData.tags = []
                    for (let i in this.articleRef.tags) {
                        this.articleEditorFormData.tags.push(this.articleRef.tags[i].tagId)
                    }
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
            validateFormData() {
                return this.$refs['articleEditorForm'].validate();
            },
            getFormData() {
                return this.articleEditorFormData
            }
        }
    }
</script>

<style lang="less" scoped>

</style>