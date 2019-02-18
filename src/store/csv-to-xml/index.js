export const SET_FILE = 'setFile'
export const SET_HEADERS = 'setHeaders'
export const ADD_FIELD = 'addField'
export const REMOVE_FIELD = 'removeField'
export const UPDATE_FIELD = 'updateField'
export const INCREMENT_FIELD_ID = 'incrementFieldId'

const state = {
    file: undefined,
    headers: [],
    fields: [],
    fieldId: 0
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