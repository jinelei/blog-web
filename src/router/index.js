import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import routers from './routers'

Vue.use(Router)

const HOME_PAGE_NAME = 'articleList'

const index = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routers: routers
})

const checkToken = () => {
    console.log(!!store.getToken)
    return !!store.getToken
}

index.beforeEach((to, from, next) => {
    if (!!!from.name && to.path !== '/') {
        // 如果初始目标地址不是/，重定向到/
        next({
            path: '/'
        })
    } else {
        next()
    }
})

export default index
