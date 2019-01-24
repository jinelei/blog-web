import Vue from 'vue'
import Vuex from 'vuex'

import {login, logout, getUser} from "@/api/index";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: ''
    },
    mutations: {
        login(state, token) {
            state.token = token;
        },
        logout(state) {
            state.token = '';
        }
    },
    getters: {
        getToken: state => state.token,
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
                            console.log('login success: ' + token)
                        }
                    }
                    resolve(res)
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
        }
    }
})
