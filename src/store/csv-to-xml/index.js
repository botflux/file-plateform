export const SET_FILE = 'setFile'
export const SET_HEADERS = 'setHeaders'
export const ADD_FIELD = 'addField'
export const REMOVE_FIELD = 'removeField'
export const UPDATE_FIELD = 'updateField'
export const INCREMENT_FIELD_ID = 'incrementFieldId'
export const ADD_XML_ATTRIBUTE = 'addXmlAttribute'
export const UPDATE_XML_ATTRIBUTE = 'updateXmlAttribute'
export const REMOVE_XML_ATTRIBUTE = 'removeXmlAttribute'
export const ADD_XML_DECLARATION = 'addXmlDeclaration'
export const UPDATE_XML_DECLARATION = 'updateXmlDeclaration'
export const REMOVE_XML_DECLARATION = 'removeXmlDeclaration'
export const INCREMENT_ATTRIBUTE_ID = 'incrementAttributeId'
export const INCREMENT_DECLARATION_ID = 'incrementDeclarationId'
export const CLEAR_CSV_TO_XML_STATE = 'clearCSVToXMLState'

const state = {
    file:           undefined,
    headers:        [],
    fields:         [],
    fieldId:        0,
    attributeId:    0,
    attributes:     [],
    declarationId:  0,
    declarations:   []
}

const mutations = {
    [SET_FILE] (state, newFile) {
        state.file = newFile
    },
    [SET_HEADERS] (state, headers) {
        state.headers = headers
    },
    [ADD_FIELD] (state, field) {
        state.fields = [...state.fields, ...[field]]
    },
    [REMOVE_FIELD] (state, field) {
        state.fields = state.fields.filter(f => f.id != field.id)
    },
    [INCREMENT_FIELD_ID] (state) {
        state.fieldId ++
    },
    [UPDATE_FIELD] (state, fieldToUpdate) {
        // const i = state.fields.findIndex(f => f.id === fieldToUpdate.id)
        // state.fields[i] = fieldToUpdate

        fieldToUpdate.columns = fieldToUpdate.columns.filter((c, i, self) => self.indexOf(c) == i)

        state.fields = ([
            ...state.fields.filter(f => f.id !== fieldToUpdate.id),
            fieldToUpdate
        ]).sort((f1, f2) => f1.id - f2.id)
    },
    [ADD_XML_ATTRIBUTE] (state, newAttribute) {
        state.attributes = [...state.attributes, ...[newAttribute]]
    },
    [REMOVE_XML_ATTRIBUTE] (state, attributeToRemove) {
        state.attributes = state.attributes.filter(a => a.id !== attributeToRemove.id)
    },
    [UPDATE_XML_ATTRIBUTE] (state, attributeToUpdate) {
        state.attributes = ([
            ...state.attributes.filter(a => a.id !== attributeToUpdate.id),
            attributeToUpdate
        ]).sort((f1, f2) => f1.id - f2.id)
    },
    [INCREMENT_ATTRIBUTE_ID] (state) {
        state.attributeId ++
    },
    [INCREMENT_DECLARATION_ID] (state) {
        state.declarationId ++
    },
    [ADD_XML_DECLARATION] (state, newDeclaration) {
        state.declarations = [...state.declarations, ...[newDeclaration]]
    },
    [REMOVE_XML_DECLARATION] (state, declarationToRemove) {
        state.declarations = state.declarations.filter(d => d.id !== declarationToRemove.id)
    },
    [UPDATE_XML_DECLARATION] (state, declarationToUpdate) {
        state.declarations = ([
            ...state.declarations.filter(d => d.id !== declarationToUpdate.id),
            declarationToUpdate
        ]).sort((i, j) => i.id - j.id)
    },
    [CLEAR_CSV_TO_XML_STATE] (state) {
        state.declarationId = 0
        state.attributeId = 0
        state.fieldId = 0
        state.file = undefined
        state.headers = []
        state.attributes = []
        state.declarations = []
        state.fields = []
    }
}

const actions = {
    [SET_FILE] ({ commit }, { file }) {
        commit(SET_FILE, file)
    },
    [SET_HEADERS] ({ commit }, { headers }) {
        commit(SET_HEADERS, headers)
    },
    [ADD_FIELD] ({ commit, state }, { field }) {
        field = {...field, id: state.fieldId}
        commit(INCREMENT_FIELD_ID)
        commit(ADD_FIELD, field)
    },
    [REMOVE_FIELD] ({ commit }, { field }) {
        commit(REMOVE_FIELD, field)
    },
    [UPDATE_FIELD] ({ commit }, { field }) {
        commit(UPDATE_FIELD, field)
    },
    [ADD_XML_ATTRIBUTE] ({ commit }, newAttribute) {
        newAttribute = { ...newAttribute, id: state.attributeId }

        commit(INCREMENT_ATTRIBUTE_ID)
        commit(ADD_XML_ATTRIBUTE, newAttribute)
    },
    [REMOVE_XML_ATTRIBUTE] ({ commit }, attributeToRemove) {
        commit(REMOVE_XML_ATTRIBUTE, attributeToRemove)
    },
    [UPDATE_XML_ATTRIBUTE] ({ commit }, attributeToUpdate) {
        commit(UPDATE_XML_ATTRIBUTE, attributeToUpdate)
    },
    [ADD_XML_DECLARATION] ({ commit }, newDeclaration) {
        newDeclaration = { ...newDeclaration, id: state.declarationId }
        commit(INCREMENT_DECLARATION_ID)
        // console.log('update')
        commit(ADD_XML_DECLARATION, newDeclaration)
    },
    [REMOVE_XML_DECLARATION] ({ commit }, declarationToRemove) {
        commit(REMOVE_XML_DECLARATION, declarationToRemove)
    },
    [UPDATE_XML_DECLARATION] ({ commit }, declarationToUpdate) {
        commit (UPDATE_XML_DECLARATION, declarationToUpdate)
    },
    [CLEAR_CSV_TO_XML_STATE] ({ commit }) {
        commit (CLEAR_CSV_TO_XML_STATE)
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