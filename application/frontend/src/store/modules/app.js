import Cookies from 'js-cookie'

// noinspection JSUnresolvedReference
const state = {
    sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false
    },
    device: 'desktop'
}

const mutations = {
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        // noinspection JSUnresolvedReference
        Cookies.set('sidebarStatus', state.sidebar.opened ? 1 : 0)
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        // noinspection JSUnresolvedReference
        Cookies.set('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
        state.device = device
    }
}

const actions = {
    toggleSideBar({commit}) {
        commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({commit}, {withoutAnimation}) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({commit}, device) {
        commit('TOGGLE_DEVICE', device)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
