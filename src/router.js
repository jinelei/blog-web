import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import {getTokenCookies} from "./libs/utils"
import {mapGetters, mapActions} from 'vuex'

Vue.use(Router)

const HOME_PAGE_NAME = 'articleList'

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'articleList',
            component: () => import('./views/ArticleList.vue')
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

const checkTokenAndGetUser = () => {
    if (!!getTokenCookies()) {
        console.log('get token: ' + getTokenCookies())
    }
}

router.beforeEach((to, form, next) => {
    checkTokenAndGetUser()
    next();
})


export default router
