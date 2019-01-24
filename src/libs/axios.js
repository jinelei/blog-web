import axios from 'axios'
import store from '@/store'

class HttpRequest {
    constructor(baseUrl = baseURL) {
        this.baseUrl = baseUrl
        this.queue = {}
    }

    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {},
            timeout: 5000,
        }
        return config
    }

    destroy(url) {
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {
            // Spin.hide()
        }
    }

    interceptors(instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            if (!Object.keys(this.queue).length) {
            }
            if (store.state.token != '') {
                config.headers['Authorization'] = `Bearer ${store.state.token}`
            }
            this.queue[url] = true
            return config
        }, error => {
            return Promise.reject(error)
        })
        // 响应拦截
        // instance.interceptors.response.use(res => {
        //     console.log(url)
        //     this.destroy(url)
        //     console.log(res)
        //     const {data, status, data: {code}} = res
        //     if (data === '')
        //         return Promise.reject("服务器错误")
        //     if (msg != 'success') {
        //         return Promise.reject(msg)
        //     } else {
        //         return {data, status}
        //     }
        // }, error => {
        //     this.destroy(url)
        //     let errorInfo = error.response
        //     if (!errorInfo) {
        //         const {request: {statusText, status}, config} = JSON.parse(JSON.stringify(error))
        //         errorInfo = {
        //             statusText,
        //             status,
        //             request: {responseURL: config.url}
        //         }
        //     }
        //     console.error(errorInfo)
        //     return Promise.reject(error)
        // })
    }

    request(options) {
        const instance = axios.create()
        instance.defaults.headers.common['Content-Type'] = 'application/json'
        // instance.defaults.headers.post['Content-Type'] = 'application/json'
        // instance.defaults.headers.options['Content-Type'] = 'application/json'
        // instance.defaults.headers.delete['Content-Type'] = 'application/json'
        // instance.defaults.headers.put['Content-Type'] = 'application/json'
// instance.defaults.headers['Content-Type'] = 'application/json';
// instance.defaults.headers['Content-Type'] = 'application/json';
//         instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// instance.defaults.withCredentials = true;
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}

export default HttpRequest
