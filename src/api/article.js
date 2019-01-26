import axios from '@/libs/api.request'
import store from '@/store'

export const getArticles = (data) => {
    return axios.request({
        url: '/articles',
        params: data,
        method: 'get'
    })
}

export const postArticle = (data) => {
    return axios.request({
        url: '/article',
        data: data,
        method: 'post'
    })
}

export const deleteArticle = (data) => {
    return axios.request({
        url: '/article',
        data: data,
        method: 'delete'
    })
}

export const putArticle = (data) => {
    return axios.request({
        url: '/article',
        data: data,
        method: 'put'
    })
}

export const getArticle = (data) => {
    return axios.request({
        url: '/article',
        params: data,
        method: 'get'
    })
}

