export default [
    {
        path: '/',
        name: 'waterFall',
        component: () => import('../views/WaterFall.vue')
    },
    {
        path: '/tags',
        name: 'tags',
        component: () => import('../views/Tags.vue')
    },
    {
        path: '/timeline',
        name: 'timeline',
        component: () => import('../views/Timeline.vue')
    },
    {
        path: '/article',
        name: 'articleDetail',
        component: () => import('../views/Article.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue')
    }
]
