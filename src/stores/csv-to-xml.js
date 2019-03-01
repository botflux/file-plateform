import * as types from './types'
import { getField, updateField } from 'vuex-map-fields'

const state = {
    file: {},
    headers: [],
    filters: [],
    attributes: [],
    declarations: [ { name: 'version', value: '1.0' }, { name: 'encoding', value: 'iso-8859-1' } ],
    fields: [ { name: 'Champs', value: 'Valeur statique', columns: [], linkCharacter: '', afterFilters: [] } ],
    globalTag: 'Elements',
    collectionTag: 'Element',
    download: '',

    // validation state
    declarationsValidations: {},
    attributesValidations: {},
    tagsValidations: {},
    fieldsValidations: {}
}
const mutations = {
    [types.SET_CSV_TO_XML_ATTRIBUTES_VALIDATION]: (state, validations) => state.attributesValidations = validations,
    [types.SET_CSV_TO_XML_DECLARATIONS_VALIDATION]: (state, validations) => state.declarationsValidations = validations,
    [types.SET_CSV_TO_XML_TAGS_VALIDATION]: (state, validations) => state.tagsValidations = validations,
    [types.SET_CSV_TO_XML_MAP_FIELDS_VALIDATION]: (state, validations) => state.fieldsValidations = validations,
    [types.SET_CSV_TO_XML_FILE]: (state, file) => state.file = file,
    [types.SET_CSV_TO_XML_HEADERS]: (state, headers) => state.headers = headers,
    [types.SET_CSV_TO_XML_ATTRIBUTES]: (state, attributes) => state.attributes = attributes,
    [types.SET_CSV_TO_XML_DECLARATIONS]: (state, declarations) => state.declarations = declarations,
    [types.SET_CSV_TO_XML_GLOBAL_TAG]: (state, globalTag) => state.globalTag = globalTag,
    [types.SET_CSV_TO_XML_COLLECTION_TAG]: (state, collectionTag) => state.collectionTag = collectionTag,
    [types.SET_CSV_TO_XML_FIELDS]: (state, fields) => state.fields = fields,
    [types.SET_CSV_TO_XML_DOWNLOAD]: (state, download) => state.download = download,
    [types.SET_CSV_TO_XML_FILTERS]: (state, filters) => state.filters = filters,
    [types.CSV_TO_XML_CLEAN]: state => {
        state.file = {}
        state.headers = []
        state.filters = []
        state.attributes = []
        state.declarations = [ { name: 'version', value: '1.0' }, { name: 'encoding', value: 'iso-8859-1' } ]
        state.fields = [ { name: 'Champs', value: 'Valeur statique', columns: [], linkCharacter: '', afterFilters: [] } ]
        state.globalTag = 'Elements'
        state.collectionTag = 'Element'
        state.download = ''
        state.declarationsValidations = {},
        state.attributesValidations = {},
        state.tagsValidations = {},
        state.fieldsValidations = {}
    },
    updateField
}
const actions = {
    [types.SET_CSV_TO_XML_FILE]: ({ commit }, file) => commit(types.SET_CSV_TO_XML_FILE, file),
    [types.SET_CSV_TO_XML_HEADERS]: ({ commit }, headers) => commit(types.SET_CSV_TO_XML_HEADERS, headers),
    [types.SET_CSV_TO_XML_ATTRIBUTES]: ({ commit }, attributes) => commit (types.SET_CSV_TO_XML_ATTRIBUTES, attributes),
    [types.SET_CSV_TO_XML_DECLARATIONS]: ({ commit }, declarations) => commit (types.SET_CSV_TO_XML_DECLARATIONS, declarations),
    [types.SET_CSV_TO_XML_GLOBAL_TAG]: ({ commit }, globalTag) => commit (types.SET_CSV_TO_XML_GLOBAL_TAG, globalTag),
    [types.SET_CSV_TO_XML_COLLECTION_TAG]: ({ commit }, collectionTag) => commit(types.SET_CSV_TO_XML_COLLECTION_TAG, collectionTag),
    [types.SET_CSV_TO_XML_FIELDS]: ({ commit }, fields) => commit(types.SET_CSV_TO_XML_FIELDS, fields),
    [types.SET_CSV_TO_XML_DOWNLOAD]: ({ commit }, download) => commit(types.SET_CSV_TO_XML_DOWNLOAD, download),
    [types.CSV_TO_XML_CLEAN]: ({ commit }) => commit(types.CSV_TO_XML_CLEAN),
    [types.SET_CSV_TO_XML_ATTRIBUTES_VALIDATION]: ({ commit }, validations) => commit(types.SET_CSV_TO_XML_ATTRIBUTES_VALIDATION, validations),
    [types.SET_CSV_TO_XML_TAGS_VALIDATION]: ({ commit }, validations) => commit(types.SET_CSV_TO_XML_TAGS_VALIDATION, validations),
    [types.SET_CSV_TO_XML_DECLARATIONS_VALIDATION]: ({ commit }, validations) => commit(types.SET_CSV_TO_XML_DECLARATIONS_VALIDATION, validations),
    [types.SET_CSV_TO_XML_MAP_FIELDS_VALIDATION]: ({ commit }, validations) => commit(types.SET_CSV_TO_XML_MAP_FIELDS_VALIDATION, validations),
    [types.SET_CSV_TO_XML_FILTERS]: ({ commit }, filters) => commit(types.SET_CSV_TO_XML_FILTERS, filters)
}
const getters = {
    [types.CSV_TO_XML_FILE_IS_VALID]:       state => (state.file !== undefined && state.file !== null && state.file.name !== null && state.file.name !== undefined),
    [types.CSV_TO_XML_HEADERS_ARE_VALID]:   state => (Array.isArray(state.headers) && state.headers.length > 0),
    [types.CSV_TO_XML_ATTRIBUTES_ARE_VALID]:state => (Array.isArray(state.attributes)),
    [types.CSV_TO_XML_DECLARATIONS_ARE_VALID]: state => (Array.isArray(state.declarations)),
    [types.CSV_TO_XML_GLOBAL_TAG_IS_VALID]: state => (state.globalTag !== ''),
    [types.CSV_TO_XML_COLLECTION_TAG_IS_VALID]: state => (state.collectionTag !== ''),
    [types.CSV_TO_XML_FIELDS_ARE_VALID]:    state => (Array.isArray(state.fields) && state.fields.length > 0),
    [types.CSV_TO_XML_DOWNLOAD_IS_VALID]:   state => (state.download !== ''),
    [types.CSV_TO_XML_ATTRIBUTES_VIEW_IS_VALID]: state => (Object.keys(state.attributesValidations).length > 0 && !state.attributesValidations.$invalid),
    [types.CSV_TO_XML_DECLARATIONS_VIEW_IS_VALID]: state => (Object.keys(state.declarationsValidations).length > 0 && !state.declarationsValidations.$invalid),
    [types.CSV_TO_XML_TAGS_VIEW_IS_VALID]: state => (Object.keys(state.tagsValidations).length > 0 && !state.tagsValidations.$invalid),
    [types.CSV_TO_XML_MAP_FIELDS_VIEW_IS_VALID]: state => (Object.keys(state.fieldsValidations).length > 0 && !state.fieldsValidations.$invalid),
    getField
}

export default {
    strict: true,
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}