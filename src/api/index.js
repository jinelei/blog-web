import axios from '@/libs/api.request'
import store from '@/store'

export const login = ({username, password}) => {
    return axios.request({
        url: '/token',
        params: {
            username,
            password
        },
        method: 'post'
    })
}

export const logout = () => {
    return axios.request({
        url: '/token',
        method: 'delete'
    })
}

export const getUser = (id) => {
    return axios.request({
        url: '/user',
        params: {
            id: id
        },
        method: 'get'
    })
}

export const getArticles = (data) => {
    return axios.request({
        url: '/articles',
        params: data,
        method: 'get'
    })
}

export const getArticle = (data) => {
    return axios.request({
        url: '/article',
        params: data,
        method: 'get'
    })
}
