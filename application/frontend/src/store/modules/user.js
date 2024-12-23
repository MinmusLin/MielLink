import {login, logout, getInfo, register} from '@/api'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
        userType: ''
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_USERTYPE: (state, userType) => {
        state.userType = userType
    },
}

const actions = {
    login({commit}, userInfo) {
        const {username, password} = userInfo
        const formData = new FormData()
        formData.append('username', username.trim())
        formData.append('password', password)
        return new Promise((resolve, reject) => {
            login(formData).then(response => {
                // noinspection JSUnresolvedReference
                commit('SET_TOKEN', response.jwt)
                // noinspection JSUnresolvedReference
                setToken(response.jwt)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    register({commit}, userInfo) {
        const {username, password, userType} = userInfo
        const formData = new FormData()
        formData.append('username', username.trim())
        formData.append('password', password)
        formData.append('userType', userType)
        return new Promise((resolve, reject) => {
            register(formData).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    getInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const {username} = response
                const {userType} = response
                if (!username) {
                    return reject('Verification failed, please Login again.')
                }
                commit('SET_NAME', username)
                commit('SET_USERTYPE', userType)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    logout({commit, state}) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken()
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    resetToken({commit}) {
        return new Promise(resolve => {
            removeToken()
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
