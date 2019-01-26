import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'articleSummary',
            component: () => import('./views/ArticleSummary.vue')
        },
        {
            path: '/article',
            name: 'articleDetail',
            component: () => import('./views/Article.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue')
        }
    ]
})
