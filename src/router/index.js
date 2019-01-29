import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import routes from './routers'

Vue.use(Router)

const HOME_PAGE_NAME = 'articleList'

const checkToken = () => {
    console.log(!!store.getToken)
    return !!store.getToken
}

const index = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: routes,
})


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
