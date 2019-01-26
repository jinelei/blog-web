import Vue from 'vue'
import Vuex from 'vuex'

import userManagement from './module/user-management'
import articleManagement from './module/article-management'
// import tagManagement from './module/tag-management'
// import categoryManagement from './module/category-management'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        userManagement,
        articleManagement,
        // tagManagement,
        // categoryManagement,
    }
})