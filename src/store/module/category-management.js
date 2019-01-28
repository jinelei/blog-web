import {
    postCategory, deleteCategory, putCategory, getCategory, getCategories,
} from "@/api/category";

export default {
    state: {
        categories: [],
        category: {},
    },
    props: {},
    mutations: {
        setCategory(state, data) {
            state.category = data
        },
        setCategories(state, data) {
            state.categories = data
        },
    },
    getters: {
        getCategory: state => state.category,
        getCategories: state => state.categories,
    },
    actions: {
        getCategoriesAct({state, commit, rootGetters}, data) {
            return new Promise((resolve, reject) => {
                getCategories(data).then(res => {
                    commit('setCategories', res.data)
                    resolve(res)
                }).catch(err => {
                    commit('setCategories', [])
                    reject(err)
                })
            })
        },
        getCategoryAct({state, commit, rootGetters}, data) {
            return new Promise((resolve, reject) => {
                getCategory(data).then(res => {
                    commit('setCategory', res.data)
                    resolve(res)
                }).catch(err => {
                    commit('setCategory', {})
                    reject(err)
                })
            })
        },
        putCategoryAct({state, commit, rootGetters}, data) {
            return new Promise((resolve, reject) => {
                putCategory(data).then(res => {
                    commit('setCategory', res.data)
                    resolve(res)
                }).catch(err => {
                    commit('setCategory', {})
                    reject(err)
                })
            })
        },
    }
}
