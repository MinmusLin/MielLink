import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'

const service = axios.create({
    baseURL: 'http://43.156.142.179:9090'
})

service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['Authorization'] = getToken()
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 200) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
