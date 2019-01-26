import Vue from 'vue'
import Vuex from 'vuex'

import {
    login, logout,
    getUser,
    getArticles,
    getArticle,
} from "@/api/index";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        loginUser: {},
        articles: [],
        currentArticle: {},
    },
    mutations: {
        login(state, token) {
            state.token = token
        },
        setLoginUser(state, user) {
            state.loginUser = user
        },
        logout(state) {
            state.token = ''
        },
        setArticles(state, data) {
            state.articles = data
        },
        setCurrentArticle(state, data) {
            state.currentArticle = data
        }
    },
    getters: {
        getToken: state => state.token,
        getLoginUser: state => state.loginUser,
        getArticles: state => state.articles,
        getCurrentArticle: state => state.currentArticle,
    },
    actions: {
        login({state, commit}, data) {
            return new Promise((resolve, reject) => {
                login(data).then(res => {
                    if (res.status == 200) {
                        let authorization = res.headers.authorization
                        if (/^Bearer.*/.test(authorization)) {
                            let token = authorization.slice(7)
                            commit('login', token)
                            if (!!res.data)
                                commit('setLoginUser', res.data)
                            console.log('login success: ' + token)
                        }
                        resolve(res)
                    } else {
                        reject(res)
                    }
                }).catch(err => {
                    console.log("login failed: " + JSON.stringify((err)))
                    reject(err)
                })
            })
        },
        logout({state, commit}, data) {
            return new Promise((resolve, reject) => {
                logout().then(res => {
                    console.log("logout success")
                    commit('logout')
                    commit('setLoginUser', {})
                    resolve("logout")
                }).catch(err => {
                    console.log("logout failed: user not login")
                    reject(err)
                })
            })
        },
        getUser({state, commit}, data) {
            return new Promise((resolve, reject) => {
                getUser(data.id).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            })
        },
        getArticles({state, commit}, data) {
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
        getArticle({state, commit}, data) {
            return new Promise((resolve, reject) => {
                getArticle(data).then(res => {
                    commit('setCurrentArticle', res.data)
                    resolve(res)
                }).catch(err => {
                    commit('setCurrentArticle', {})
                    reject(err)
                })
            })
        },
    }
})
