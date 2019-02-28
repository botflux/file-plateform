import * as types from './types'

const state = {
    file: {},
    headers: [],
    attributes: [],
    declarations: [],
    fields: [],
    globalTag: '',
    collectionTag: '',
    download: ''
}
const mutations = {
    [types.SET_CSV_TO_XML_FILE]:    (state, file) => state.file = file,
    [types.SET_CSV_TO_XML_HEADERS]: (state, headers) => state.headers = headers,
    [types.SET_CSV_TO_XML_ATTRIBUTES]: (state, attributes) => state.attributes = attributes,
    [types.SET_CSV_TO_XML_DECLARATIONS]: (state, declarations) => state.declarations = declarations,
    [types.SET_CSV_TO_XML_GLOBAL_TAG]: (state, globalTag) => state.globalTag = globalTag,
    [types.SET_CSV_TO_XML_COLLECTION_TAG]: (state, collectionTag) => state.collectionTag = collectionTag,
    [types.SET_CSV_TO_XML_FIELDS]: (state, fields) => state.fields = fields,
    [types.SET_CSV_TO_XML_DOWNLOAD]: (state, download) => state.download = download,
    [types.CSV_TO_XML_CLEAN]:       state => {
        state.download = ''
        state.collectionTag = ''
        state.globalTag = ''
        state.headers = []
        state.attributes = []
        state.declarations = []
        state.fields = []
        state.file = {}
    }
}
const actions = {
    [types.SET_CSV_TO_XML_FILE]:    ({ commit }, file) => commit(types.SET_CSV_TO_XML_FILE, file),
    [types.SET_CSV_TO_XML_HEADERS]: ({ commit }, headers) => commit(types.SET_CSV_TO_XML_HEADERS, headers),
    [types.SET_CSV_TO_XML_ATTRIBUTES]: ({ commit }, attributes) => commit (types.SET_CSV_TO_XML_ATTRIBUTES, attributes),
    [types.SET_CSV_TO_XML_DECLARATIONS]: ({ commit }, declarations) => commit (types.SET_CSV_TO_XML_DECLARATIONS, declarations),
    [types.SET_CSV_TO_XML_GLOBAL_TAG]: ({ commit }, globalTag) => commit (types.SET_CSV_TO_XML_GLOBAL_TAG, globalTag),
    [types.SET_CSV_TO_XML_COLLECTION_TAG]: ({ commit }, collectionTag) => commit(types.SET_CSV_TO_XML_COLLECTION_TAG, collectionTag),
    [types.SET_CSV_TO_XML_FIELDS]: ({ commit }, fields) => commit(types.SET_CSV_TO_XML_FIELDS, fields),
    [types.SET_CSV_TO_XML_DOWNLOAD]: ({ commit }, download) => commit(types.SET_CSV_TO_XML_DOWNLOAD, download),
    [types.CSV_TO_XML_CLEAN]:       ({ commit }) => commit(types.CSV_TO_XML_CLEAN),
}
const getters = {
    [types.CSV_TO_XML_FILE_IS_VALID]:       state => (state.file !== undefined && state.file !== null && state.file.name !== null && state.file.name !== undefined),
    [types.CSV_TO_XML_HEADERS_ARE_VALID]:   state => (Array.isArray(state.headers) && state.headers.length > 0),
    [types.CSV_TO_XML_ATTRIBUTES_ARE_VALID]:state => (Array.isArray(state.attributes)),
    [types.CSV_TO_XML_DECLARATIONS_ARE_VALID]: state => (Array.isArray(state.declarations)),
    [types.CSV_TO_XML_GLOBAL_TAG_IS_VALID]: state => (state.globalTag !== ''),
    [types.CSV_TO_XML_COLLECTION_TAG_IS_VALID]: state => (state.collectionTag !== ''),
    [types.CSV_TO_XML_FIELDS_ARE_VALID]:    state => (Array.isArray(state.fields) && state.fields.length > 0),
    [types.CSV_TO_XML_DOWNLOAD_IS_VALID]:   state => (state.download !== '')
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}