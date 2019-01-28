import {
    postArticle, deleteArticle, putArticle, getArticle, getArticles,
    getArticleBrowsePrivilege, getArticleCommentPrivilege,
} from "@/api/article";

export default {
    state: {
        articles: [],
        article: {},
    },
    props: {},
    mutations: {
        setArticle(state, data) {
            state.article = data
        },
        setArticles(state, data) {
            state.articles = data
        },
    },
    getters: {
        getArticle: state => state.article,
        getArticles: state => state.articles,
    },
    actions: {
        getArticlesAct({state, commit, rootGetters}, data) {
            return new Promise((resolve, reject) => {
                getArticles(data).then(res => {
                    commit('setArticles', res.data)
                    resolve(res)
                }).catch(err => {
                    commit('setArticles', [])
                    reject(err)
                })
            })
        },
        getArticleAct({state, commit, rootGetters}, data) {
            return new Promise((resolve, reject) => {
                getArticle(data).then(res => {
                    commit('setArticle', res.data)
                    resolve(res)
                }).catch(err => {
                    commit('setArticle', {})
                    reject(err)
                })
            })
        },
        putArticleAct({state, commit, rootGetters}, data) {
            return new Promise((resolve, reject) => {
                putArticle(data).then(res => {
                    commit('setArticle', res.data)
                    resolve(res)
                }).catch(err => {
                    commit('setArticle', {})
                    reject(err)
                })
            })
        },
        getArticleBrowsePrivilegeAct({state, commit, rootGetters}, data) {
            return new Promise((resolve, reject) => {
                getArticleBrowsePrivilege(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getArticleCommentPrivilegeAct({state, commit, rootGetters}, data) {
            return new Promise((resolve, reject) => {
                getArticleCommentPrivilege(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}
