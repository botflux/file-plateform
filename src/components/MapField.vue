<template>
    <div>
        <div class="form-group">   
            <label>Nom</label>
            <input type="text" v-model="field.$model.name" class="form-control" :class="{ 'is-invalid': field.name.$invalid, 'is-valid': !field.name.$invalid }">
            <div class="invalid-feedback" v-if="field.name.$invalid">
                Vous devez spécifier un nom pour le champs !
            </div>
        </div>
        <div class="d-flex flex-wrap">
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
    computed: {
        ...mapState({
            headers: state => state.headers
        }),
        hasMultipleColumns () {
            return (this.field.$model.columns.length > 1)
        },
        hasColumn () {
            return (this.field.$model.columns.length != 0)
        }
    },
    watch: {
        
    }
}
</script>
