import axios from '@/libs/api.request'
import store from '@/store'

export const postToken = ({username, password}) => {
    return axios.request({
        url: '/token',
        params: {
            username,
            password
        },
        method: 'post'
    })
}

export const deleteToken = () => {
    return axios.request({
        url: '/token',
        method: 'delete'
    })
}

export const getToken = (id) => {
    return axios.request({
        url: '/user',
        params: {
            id: id
        },
        method: 'get'
    })
}
