<template>
    <div>
        <div class="form-group">   
            <label>Nom</label>
            <input type="text" v-model="field.$model.name" class="form-control" :class="{ 'is-invalid': field.name.$invalid, 'is-valid': !field.name.$invalid }">
            <div class="invalid-feedback" v-if="field.name.$invalid">
                Vous devez spécifier un nom pour le champs !
            </div>
        </div>
        <div class="form-group">
            <label>Colonnes</label>
            <v-select v-model="field.$model.columns" :options="headers" multiple></v-select>
        </div>
        <div class="form-group" v-if="!hasColumn">
            <label>Valeur statique</label>
            <input type="text" v-model="field.$model.value" class="form-control" :class="{ 'is-invalid': field.value.$invalid, 'is-valid': !field.name.$invalid }">
            <div class="invalid-feedback" v-if="field.value.$invalid">
                Vous devez spécifiez une valeur pour ce champs.
            </div>
        </div>
        <div class="form-group" v-if="hasMultipleColumns">
            <label>Caractère de liaison</label>
            <input type="text" v-model="field.$model.linkingCharacter" class="form-control">
        </div>
        <div class="form-group">
            <label>Ajouter une transformation</label>
            <select class="custom-select" @change="addAfterFilter()" v-model="currentSelectedFilter">
                <option v-for="(filter, i) of filters" :value="filter" :key="`${i}-filter`">{{ filter.name }}</option>
            </select>
        </div>
        <div class="form-group" v-for="(filter, i) of field.$model.afterFilters" :key="`after-filter-${i}`">
            <label>{{ filter.name }}</label>
            <p><small>{{ filter.description.base }}</small></p>
            <div v-if="filter.args">
                <div class="form-group" v-for="(arg, i) of Object.keys(filter.args)" :key="`arg-${i}`">
                    <label>Nom: {{ arg }}</label>
                    <input type="text" class="form-control" v-model="filter.args[arg]">
                    <small class="helper-text">{{ filter.description.args[arg] }}</small>
                </div>
            </div>
            <b-button variant="danger" @click="deleteAfterFilter(filter)">Supprimer {{ filter.name }}</b-button>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('csvToXml')

export default {
    mounted () {
        console.log(this.field)
    },
    props: {
        field: Object,
        fieldId: Number,
    },
    data () {
        return {
            currentSelectedFilter: []
        }
    },
    computed: {
        ...mapState({
            headers: state => state.headers,
            filters: state => state.filters
        }),
        hasMultipleColumns () {
            return (this.field.$model.columns.length > 1)
        },
        hasColumn () {
            return (this.field.$model.columns.length != 0)
        },
    },
    methods: {
        addAfterFilter () {
            this.field.$model.afterFilters = [
                ...this.field.$model.afterFilters,
                this.currentSelectedFilter
            ]
        },
        deleteAfterFilter (filter) {
            this.field.$model.afterFilters = [
                ...this.field.$model.afterFilters.filter (f => f !== filter)
            ]
        }
    }
}
</script>
