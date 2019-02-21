<template>
    <div>
        <div class="form-group">   
            <label>Nom</label>
            <input type="text" v-model="field.name" class="form-control">
        </div>
        <div class="d-flex">
            <div class="form-group mr-4 custom-control custom-checkbox" v-for="(header, i) in headers" :key="`header-${fieldId}-${i}`">
                <input type="checkbox" v-model="field.columns" :id="header + '-' + fieldId" :value="header" class="custom-control-input">
                <label :for="header + '-' + fieldId" class="custom-control-label">{{ header }}</label>
            </div>
        </div>
        <div class="form-group" v-if="!hasColumn">
            <label>Valeur statique</label>
            <input type="text" v-model="field.value" class="form-control">
        </div>
        <div class="form-group" v-if="hasMultipleColumns">
            <label>Caractère de liaison</label>
            <input type="text" v-model="field.linkingCharacter" class="form-control">
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
