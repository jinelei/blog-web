import axios from '@/libs/api.request'
import store from '@/store'

export const getTags = (data) => {
    return axios.request({
        url: '/tags',
        params: data,
        method: 'get'
    })
}

export const postTag = (data) => {
    return axios.request({
        url: '/tag',
        data: data,
        method: 'post'
    })
}

export const deleteTag = (data) => {
    return axios.request({
        url: '/tag',
        data: data,
        method: 'delete'
    })
}

export const putTag = (data) => {
    return axios.request({
        url: '/tag',
        data: data,
        method: 'put'
    })
}

export const getTag = (data) => {
    return axios.request({
        url: '/tag',
        params: data,
        method: 'get'
    })
}

