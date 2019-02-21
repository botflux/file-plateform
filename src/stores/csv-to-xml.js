import * as types from './types'

const state = {
    file: {},
    headers: [],
    attributes: [],
    declarations: [],
    fields: [],
    globalTag: '',
    collectionTag: ''
}
const mutations = {
    [types.SET_CSV_TO_XML_FILE]:    (state, file) => state.file = file,
    [types.SET_CSV_TO_XML_HEADERS]: (state, headers) => state.headers = headers,
    [types.SET_CSV_TO_XML_ATTRIBUTES]: (state, attributes) => state.attributes = attributes,
    [types.SET_CSV_TO_XML_DECLARATIONS]: (state, declarations) => state.declarations = declarations,
    [types.SET_CSV_TO_XML_GLOBAL_TAG]: (state, globalTag) => state.globalTag = globalTag,
    [types.SET_CSV_TO_XML_COLLECTION_TAG]: (state, collectionTag) => state.collectionTag = collectionTag
}
const actions = {
    [types.SET_CSV_TO_XML_FILE]:    ({ commit }, file) => commit(types.SET_CSV_TO_XML_FILE, file),
    [types.SET_CSV_TO_XML_HEADERS]: ({ commit }, headers) => commit(types.SET_CSV_TO_XML_HEADERS, headers),
    [types.SET_CSV_TO_XML_ATTRIBUTES]: ({ commit }, attributes) => commit (types.SET_CSV_TO_XML_ATTRIBUTES, attributes),
    [types.SET_CSV_TO_XML_DECLARATIONS]: ({ commit }, declarations) => commit (types.SET_CSV_TO_XML_DECLARATIONS, declarations),
    [types.SET_CSV_TO_XML_GLOBAL_TAG]: ({ commit }, globalTag) => commit (types.SET_CSV_TO_XML_GLOBAL_TAG, globalTag),
    [types.SET_CSV_TO_XML_COLLECTION_TAG]: ({ commit }, collectionTag) => commit(types.SET_CSV_TO_XML_COLLECTION_TAG, collectionTag)
}
const getters = {
    [types.CSV_TO_XML_FILE_IS_VALID]:       state => (state.file.name !== undefined),
    [types.CSV_TO_XML_HEADERS_ARE_VALID]:   state => (Array.isArray(state.headers) && state.headers.length > 0),
    [types.CSV_TO_XML_ATTRIBUTES_ARE_VALID]:state => (Array.isArray(state.attributes) && state.attributes.length > 0),
    [types.CSV_TO_XML_DECLARATIONS_ARE_VALID]: state => (Array.isArray(state.declarations) && state.declarations.length > 0),
    [types.CSV_TO_XML_GLOBAL_TAG_IS_VALID]: state => (state.globalTag !== ''),
    [types.CSV_TO_XML_COLLECTION_TAG_IS_VALID]: state => (state.collectionTag !== '')
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}