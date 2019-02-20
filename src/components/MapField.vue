<template>
    <div>
        <div class="form-group">   
            <label>Nom</label>
            <input type="text" v-model="field.name">
        </div>
        <div class="d-flex">
            <div class="form-group mr-4" v-for="(header, i) in headers" :key="`header-${fieldId}-${i}`">
                <input type="checkbox" v-model="field.columns" :id="header + '-' + fieldId" :value="header">
                <label :for="header + '-' + fieldId">{{ header }}</label>
            </div>
        </div>
        <div class="form-group" v-if="!hasColumn">
            <label>Valeur statique</label>
            <input type="text" v-model="field.value">
        </div>
        <div class="form-group" v-if="hasMultipleColumns">
            <label>Caractère de liaison</label>
            <input type="text" v-model="field.linkingCharacter">
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('csvToXml')

export default {
    props: {
        field: Object,
        fieldId: Number,
    },
    computed: {
        ...mapState({
            headers: state => state.headers
        }),
        hasMultipleColumns () {
            return (this.field.columns.length > 1)
        },
        hasColumn () {
            return (this.field.columns.length != 0)
        }
    },
    watch: {
        // eslint-disable-next-line
        field (newValue, oldValue) {
            console.log('m')
            if (newValue.columns.length == 1) {
                this.field.linkingCharacter = ''
            }
        }
    },
}
</script>
