import * as types from './types'

const state = {
    file: {},
    headers: []
}
const mutations = {
    [types.SET_CSV_TO_XML_FILE]:    (state, file) => state.file = file,
    [types.SET_CSV_TO_XML_HEADERS]: (state, headers) => state.headers = headers
}
const actions = {
    [types.SET_CSV_TO_XML_FILE]:    ({ commit }, file) => commit(types.SET_CSV_TO_XML_FILE, file),
    [types.SET_CSV_TO_XML_HEADERS]: ({ commit }, headers) => commit(types.SET_CSV_TO_XML_HEADERS, headers)
}
const getters = {
    [types.CSV_TO_XML_FILE_IS_VALID]:       state => (state.file.name !== undefined),
    [types.CSV_TO_XML_HEADERS_ARE_VALID]:   state => (Array.isArray(state.headers) && state.headers.length > 0)
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}