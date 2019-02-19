export const SET_FILE = 'setFile'
export const SET_HEADERS = 'setHeaders'

const state = {
    file: undefined,
    headers: []
}

const mutations = {
    [SET_FILE] (state, newFile) {
        state.file = newFile
    },
    [SET_HEADERS] (state, headers) {
        state.headers = headers
    }
}

const actions = {
    [SET_FILE] ({ commit }, { file }) {
        commit(SET_FILE, file)
    },
    [SET_HEADERS] ({ commit }, { headers }) {
        commit(SET_HEADERS, headers)
    }
}

const getters = {}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}