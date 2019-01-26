import axios from '@/libs/api.request'
import store from '@/store'

export const getCategories = (data) => {
    return axios.request({
        url: '/categories',
        params: data,
        method: 'get'
    })
}

export const postCategory = (data) => {
    return axios.request({
        url: '/category',
        data: data,
        method: 'post'
    })
}

export const deleteCategory = (data) => {
    return axios.request({
        url: '/category',
        data: data,
        method: 'delete'
    })
}

export const putCategory = (data) => {
    return axios.request({
        url: '/category',
        data: data,
        method: 'put'
    })
}

export const getCategory = (data) => {
    return axios.request({
        url: '/category',
        params: data,
        method: 'get'
    })
}

