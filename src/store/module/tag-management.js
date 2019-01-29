import {
    postTag, deleteTag, putTag, getTag, getTags,
} from "@/api/tag";

export default {
    state: {
        tags: [],
        tag: {},
    },
    props: {},
    mutations: {
        setTag(state, data) {
            state.tag = data
        },
        setTags(state, data) {
            state.tags = data
        },
    },
    getters: {
        getTag: state => state.tag,
        getTags: state => state.tags,
    },
    actions: {
        getTagsAct({state, commit, rootGetters}, data) {
            return new Promise((resolve, reject) => {
                getTags(data).then(res => {
                    commit('setTags', res.data)
                    resolve(res)
                }).catch(err => {
                    commit('setTags', [])
                    reject(err)
                })
            })
        },
        getTagAct({state, commit, rootGetters}, data) {
            return new Promise((resolve, reject) => {
                getTag(data).then(res => {
                    commit('setTag', res.data)
                    resolve(res)
                }).catch(err => {
                    commit('setTag', {})
                    reject(err)
                })
            })
        },
        putTagAct({state, commit, rootGetters}, data) {
            return new Promise((resolve, reject) => {
                putTag(data).then(res => {
                    commit('setTag', res.data)
                    resolve(res)
                }).catch(err => {
                    commit('setTag', {})
                    reject(err)
                })
            })
        },
        postTagAct({state, commit, rootGetters}, data) {
            return new Promise((resolve, reject) => {
                postTag(data).then(res => {
                    // commit('setTag', res.data)
                    resolve(res)
                }).catch(err => {
                    // commit('setTag', {})
                    reject(err)
                })
            })
        },
    }
}
