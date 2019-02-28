<template>
    <div>
        <h3 class="mb-3">Définition des champs du XML</h3>
        <button class="btn btn-success mr-auto mb-3" @click="addMapField()">Ajouter un champs</button>
        <div class="py-3 border-bottom border-top" v-for="(mapField, i) in $v.mapFields.$each.$iter" :key="`map-field-${i}`">
            <map-field :field="mapField" :field-id="Number.parseInt(i)" />
            <button class="btn btn-danger" @click="deleteMapField(i)">Supprimer</button>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as types from '@/stores/types'
import { required, requiredIf } from 'vuelidate/lib/validators'
import MapField from './MapField'

const { mapState, mapActions } = createNamespacedHelpers('csvToXml')

export default {
    methods: {
        addMapField () {
            this.mapFields.push({
                name: '',
                columns: [],
                linkingCharacter: '',
                value: ''
            })
        },
        deleteMapField (index) {
            // eslint-disable-next-line
            this.mapFields = this.mapFields.filter ((mf, i) => i != index)
        },
        ...mapActions([
            types.SET_CSV_TO_XML_FIELDS
        ])
    },
    computed: {
        ...mapState({
            headers: state => state.headers,
            mapFields: state => state.fields
        }),
    },
    validations: {
        mapFields: {
            required,
            $each: {
                name: {
                    required
                },
                value: {
                    required: requiredIf (function (model) {
                        return model.columns.length == 0
                    })
                }
            }
        }
    },
    components: {
        MapField
    },
    watch: {
        // eslint-disable-next-line
        mapFields: {
            handler (v) {
                this[types.SET_CSV_TO_XML_FIELDS] (v)
            },
            deep: true
        }
    }
}
</script>
