import {
    postToken, deleteToken, getToken,
} from "@/api/user";

import {setTokenCookies, getTokenCookies} from "@/libs/utils";


export default {
    state: {
        token: '',
        currentUser: {},
    },
    props: {},
    mutations: {
        setToken(state, data) {
            state.token = data
            // setTokenCookies(data)
        },
        setCurrentUser(state, data) {
            state.currentUser = data
        }
    },
    getters: {
        getToken: state => !!getTokenCookies() ? getTokenCookies() : state.token,
        getCurrentUser: state => state.currentUser,
    },
    actions: {
        setTokenAct({state, commit, rootGetters}, data) {
            return new Promise((resolve, reject) => {
                /**
                 * 测试环境
                 *
                 */
                // commit('setToken', '9fbd76b02c874c709e245069342d211f');
                // getToken(1).then(res => {
                //     commit('setCurrentUser', res.data)
                //     resolve(res)
                // }).catch(err => {
                //     reject(err)
                // })

                postToken(data).then(res => {
                    if (res.status == 200) {
                        let authorization = res.headers.authorization
                        if (/^Bearer.*/.test(authorization)) {
                            let token = authorization.slice(7)
                            commit('setToken', token)
                            if (!!res.data)
                                commit('setCurrentUser', res.data)
                            console.log('login success: ' + token)
                        }
                        resolve(res)
                    } else {
                        commit('setToken', '')
                        commit('setCurrentUser', {})
                        reject(res)
                    }
                }).catch(err => {
                    console.log("login failed: " + JSON.stringify((err)))
                    commit('setToken', '')
                    commit('setCurrentUser', {})
                    reject(err)
                })
            })
        },
        removeTokenAct({state, commit, rootGetters}, data) {
            return new Promise((resolve, reject) => {
                deleteToken().then(res => {
                    console.log("logout success")
                    commit('setToken', '')
                    commit('setCurrentUser', {})
                    resolve("logout")
                }).catch(err => {
                    console.log("logout failed: user not login")
                    reject(err)
                })
            })
        },
        getCurrentUserAct({state, commit, rootGetters}, data) {
            return new Promise((resolve, reject) => {
                getUser(data.id).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            })
        },
    }
}
