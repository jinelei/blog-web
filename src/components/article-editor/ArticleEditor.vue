<template>
    <div class="article-editor">
        <Form ref="articleEditorForm"
              :rules="articleEditorFormRule"
              :model="articleEditorFormData">
            <Row :gutter="32">
                <Col span="24">
                    <Tooltip :style="{width: '100%'}" transfer>
                        <FormItem prop="title">
                            <Input v-model="articleEditorFormData.title"/>
                        </FormItem>
                        <div slot="content">
                            <p>请输入文章标题</p>
                            <p><i>文章标题不能为空</i></p>
                        </div>
                    </Tooltip>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">
                    <Tooltip placement="top" :style="{width: '100%'}">
                        <FormItem prop="browsePrivilege">
                            <Select v-model="articleEditorFormData.browsePrivilege"
                                    placeholder="请选择浏览权限">
                                <Option v-for="item in articleBrowsePrivilegeList"
                                        :value="item" :key="item"
                                >{{item}}
                                </Option>
                            </Select>
                        </FormItem>
                        <div slot="content">
                            <p>请选择浏览权限</p>
                        </div>
                    </Tooltip>
                </Col>
                <Col span="12">
                    <Tooltip placement="top" :style="{width: '100%'}">
                        <FormItem prop="commentPrivilege">
                            <Select v-model="articleEditorFormData.commentPrivilege"
                                    placeholder="请选择评论权限">
                                <Option v-for="item in articleCommentPrivilegeList"
                                        :value="item" :key="item"
                                >{{item}}
                                </Option>
                            </Select>
                        </FormItem>
                        <div slot="content">
                            <p>请选择评论权限</p>
                        </div>
                    </Tooltip>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="7">
                    <Tooltip placement="top" :style="{width: '100%'}">
                        <FormItem prop="category">
                            <Select v-model="articleEditorFormData.category" placeholder="请选择目录">
                                <Option v-for="item in getCategoriesList"
                                        :value="item.id" :key="item.id"
                                >{{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <div slot="content">
                            <p>请选择目录</p>
                        </div>
                    </Tooltip>
                </Col>
                <Col span="1" pull="1">
                    <Tooltip>
                        <Button type="info" shape="circle" icon="md-add"
                                @click="addCategoryModalFlag=true"></Button>
                        <div slot="content">
                            <p>添加目录</p>
                        </div>
                    </Tooltip>
                </Col>
                <Col span="14">
                    <Tooltip placement="top" :style="{width: '100%'}">
                        <FormItem prop="tags">
                            <Select multiple
                                    v-model="articleEditorFormData.tags" placeholder="请选择标签">
                                <Option v-for="item in getTagsList"
                                        :value="item.id" :key="item.id"
                                >{{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <div slot="content">
                            <p>请选择标签</p>
                        </div>
                    </Tooltip>
                </Col>
                <Col span="1" pull="1">
                    <Tooltip>
                        <Button type="info" shape="circle" icon="md-add"
                                @click="addTagModalFlag=true"></Button>
                        <div slot="content">
                            <p>添加标签</p>
                        </div>
                    </Tooltip>
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
        <Modal v-model="addTagModalFlag"
               title="添加标签"
               :mask-closable="false">
            <Form ref="addTagModal" :model="addTagModalData"
                  :rules="addTagCategoryFormRule" label-position="left" :label-width="60">
                <Tooltip placement="top" :style="{width: '100%'}">
                    <FormItem label="名称:" prop="name">
                        <Input v-model="addTagModalData.name" placeholder="请输入标签名"></Input>
                    </FormItem>
                    <div slot="content">
                        <p>请输入标签名</p>
                    </div>
                </Tooltip>
                <Tooltip placement="top" :style="{width: '100%'}">
                    <FormItem label="说明:" prop="summary">
                        <Input type="textarea" :rows="4" placeholder="请输入标签说明"
                               v-model="addTagModalData.summary"></Input>
                    </FormItem>
                    <div slot="content">
                        <p>请输入标签说明</p>
                    </div>
                </Tooltip>
            </Form>
            <div slot="footer">
                <Button type="text" @click="addTagCancel">取消</Button>
                <Button type="primary" @click="addTagConfirm">添加</Button>
            </div>
        </Modal>
        <Modal v-model="addCategoryModalFlag"
               title="添加目录"
               ok-text="添加"
               @on-ok="addCategoryConfirm"
               @on-cancel="addCategoryCancel"
               cancel-text="取消">
            <Form ref="addCategoryModal" :model="addCategoryModalData"
                  :rules="addTagCategoryFormRule" label-position="left" :label-width="60">
                <Tooltip placement="top" :style="{width: '100%'}">
                    <FormItem label="名称:" prop="name">
                        <Input v-model="addCategoryModalData.name" placeholder="请输入目录名"></Input>
                    </FormItem>
                    <div slot="content">
                        <p>请输入目录名</p>
                    </div>
                </Tooltip>
                <Tooltip placement="top" :style="{width: '100%'}">
                    <FormItem label="说明:" prop="summary">
                        <Input type="textarea" :rows="4" placeholder="请输入目录说明"
                               v-model="addCategoryModalData.summary"></Input>
                    </FormItem>
                    <div slot="content">
                        <p>请输入目录说明</p>
                    </div>
                </Tooltip>
            </Form>
            <div slot="footer">
                <Button type="text" @click="addCategoryCancel">取消</Button>
                <Button type="primary" @click="addCategoryConfirm">添加</Button>
            </div>
        </Modal>
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
                addTagModalFlag: false,
                addCategoryModalFlag: false,
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
                },
                addTagModalData: {
                    name: '',
                    summary: '',
                },
                addCategoryModalData: {
                    name: '',
                    summary: '',
                },
                addTagCategoryFormRule: {
                    name: [
                        {required: true, message: '名称不能为空', trigger: 'blur'}
                    ],
                    summary: [
                        {required: true, message: '说明不能为空', trigger: 'blur'}
                    ],
                },
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
                'postTagAct',
                'postCategoryAct',
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
            },
            addTagConfirm() {
                this.$refs['addTagModal'].validate(valid => {
                    if (valid) {
                        let data = {...this.addTagModalData}
                        this.postTagAct(data).then(res => {
                            console.log(res)
                            this.addTagModalFlag = false
                            this.$Message.success(res)
                            this.refreshData()
                        }).catch(err => {
                            this.$Message.error(err)
                        })
                    }
                })
            },
            addTagCancel() {
                this.$refs['addTagModal'].resetFields()
                this.addTagModalFlag = false
            },
            addCategoryConfirm() {
                this.$refs['addCategoryModal'].validate(valid => {
                    if (valid) {
                        let data = {...this.addCategoryModalData}
                        this.postCategoryAct(data).then(res => {
                            console.log(res)
                            this.addCategoryModalFlag = false
                            this.$Message.success(res)
                            this.refreshData()
                        }).catch(err => {
                            this.$Message.error(err)
                        })
                    }
                })
            },
            addCategoryCancel() {
                this.addCategoryModalFlag = false
                this.$refs['addCategoryModal'].resetFields()
            },
        }
    }
</script>

<style lang="less" scoped>

    .form-label {
        color: #f00;
    }

</style>