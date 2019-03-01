<template>
    <div>
        <h3 class="mb-3">Définition des champs du XML</h3>
        <button class="btn btn-success mr-auto mb-3" @click="addMapField()">Ajouter un champs</button>
        <div class="py-3 border-bottom border-top" v-for="(mapField, i) in $v.mapFields.$each.$iter" :key="`map-field-${i}`">
            <map-field :field="mapField" :field-id="Number.parseInt(i)" />
            <button class="btn btn-danger" @click="deleteMapField(mapField.$model)">Supprimer</button>
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
    mounted () {
        this.$v.mapFields.$touch()
    },
    methods: {
        addMapField () {
            this[types.SET_CSV_TO_XML_FIELDS] ([
                ...this.mapFields, {
                    name: '',
                    columns: [],
                    linkingCharacter: '',
                    value: '',
                    afterFilters: []
                }
            ])
        },
        deleteMapField (mapField) {
            this[types.SET_CSV_TO_XML_FIELDS] (this.mapFields.filter ((mf) => mf != mapField))
        },
        ...mapActions([
            types.SET_CSV_TO_XML_FIELDS,
            types.SET_CSV_TO_XML_MAP_FIELDS_VALIDATION
        ])
    },
    computed: {
        ...mapState({
            headers: state => state.headers,
            mapFields: state => state.fields
        }),
        validationState () {
            return (this.$v)
        }
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
        mapFields: {
            handler (v) {
                this[types.SET_CSV_TO_XML_FIELDS] (v)
            },
            deep: true
        },
        validationState: {
            handler (v) {
                this[types.SET_CSV_TO_XML_MAP_FIELDS_VALIDATION] (v)
                console.log('state updated')
            },
            deep: true
        }
    }
}
</script>
