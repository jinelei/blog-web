<template>
    <Row class-name="tag-container">
        <Col span="24">
            <div class="tag-clouds">
                <template v-for="tag in getTagList">
                    <div class="tag-item"
                         @click="clickTagItem(tag.name)" :id="tag.tagId">
                        {{tag.name}}
                    </div>
                </template>
            </div>
        </Col>
        <Col span="24">
            <div class="tag-list">
                <template v-for="tag in tagList">
                    <div class="tag-article" :id="tag.tag.name" v-if="!!tag">
                        <div class="tag">
                            {{tag.tag.name}}
                        </div>
                        <template v-for="article in tag.articles">
                            <div class="article">
                                <div class="title">{{article.title}}</div>
                                <div class="category" v-if="!!article.category">{{article.category.name}}</div>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
        </Col>
    </Row>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "Tags",
        data() {
            return {
                tagList: [],
            }
        },
        components: {},
        mounted() {
            this.getTagsAct({page: 0, size: 100}).then(res => {
                this.tagList = new Array()
                let tags = res.data
                for (let i in tags) {
                    let tagId = tags[i].tagId
                    if (!!!this.tagList[tagId]) {
                        this.tagList[tagId] = {
                            tag: tags[i],
                        }
                    }
                    this.getArticlesAct({page: 0, size: 100, tags: tagId}).then(res => {
                        let data = this.tagList
                        data[tagId].articles = res.data
                        this.tagList = new Array()
                        this.tagList = data
                    }).catch(err => {
                        console.error(err)
                    })
                }
            }).catch(err => {
                console.error(err)
            })
        },
        computed: {
            getTagList() {
                return this.getTags()
            },
        },
        methods: {
            ...mapGetters([
                'getTags',
                'getArticles'
            ]),
            ...mapActions([
                'getTagsAct',
                'getArticlesAct'
            ]),
            clickTagItem(name) {
                window.location.href = "/tags#" + name
            },
        },
    }
</script>

<style lang="less" scoped>
    .tag-container {
        .tag-clouds {
            color: rgba(255, 255, 255, 1);
            min-height: 10rem;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 5px;
            background-color: rgba(0, 0, 0, 0.4);
            .tag-item {
                padding: 0.5em 1em;
                margin: 0.5em 1em;
                border: 1px solid rgb(100, 100, 100);
                border-radius: 5px;
                display: inline-block;
                &:hover {
                    background-color: rgb(120, 120, 120);
                }
            }
        }
        .tag-list {
            .tag-article {
                .tag {
                    color: #f00;
                    font-size: 1.3rem;
                    font-weight: bold;
                    width: 100%;
                    float: left;
                    clear: both;
                    margin-top: 3rem;
                }
                .article {
                    color: #fff;
                    font-size: 1rem;
                    font-weight: normal;
                    padding: 0.5rem 1rem;
                    margin: 0.5rem 1rem;
                    border-radius: 5px;
                    display: inline-block;
                    background-color: #ccc;
                    .title {
                        color: #222;
                    }
                    .category {
                        font-size: 0.7rem;
                        color: #aaa;
                    }
                }
            }
        }
    }
</style>