<template>
    <div class="container">
        <div class="row">
            <a href="#" class="btn btn-primary" v-if="hasColumn && columnsAreValid">Suivant</a>
        </div>
        <div class="d-flex flex-column mb-5">
            <h2 class="mb-5">Définition de la configuration</h2>

            <p>Voici les en-têtes qui ont été détecté dans le fichier :</p>
            <csv-headers-container>
                <csv-header v-for="(header, i) in headers" :key="i" :header="header" />
            </csv-headers-container>
        </div>
        <div class="d-flex flex-column">
            <h3>Définition des champs du XML</h3>
            <button class="btn btn-success mr-auto" @click="addMapField()">Ajouter un champs</button>
            <div class="d-flex" v-for="(mapField, i) in mapFields" :key="`map-field-${i}`">
                <map-field :field="mapField" :field-id="i" />
                <button class="btn btn-danger" @click="deleteMapField(i)">Supprimer</button>
            </div>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as types from '@/stores/types'
import CSVHeader from '@/components/CSVHeader'
import CSVHeadersContainer from '@/components/CSVHeadersContainer'
import MapField from '@/components/MapField'

const { mapGetters, mapState } = createNamespacedHelpers('csvToXml')

export default {
    data () {
        return {
            mapFields: []
        }
    },
    components: {
        'csv-header': CSVHeader, 
        'csv-headers-container': CSVHeadersContainer,
        MapField
    },
    computed: {
        ...mapState({
            headers: state => state.headers
        }),
        ...mapGetters([
            types.CSV_TO_XML_FILE_IS_VALID,
            types.CSV_TO_XML_HEADERS_ARE_VALID
        ]),
        hasColumn () {
            return (this.mapFields.length > 0)
        },
        columnsAreValid () {
            return this.mapFields.reduce((prev, cur) => {
                if (Object.keys(cur.errors) > 0) return false

                return prev
            }, true)
        }
    },
    methods: {
        addMapField () {
            this.mapFields.push({
                name: '',
                columns: [],
                linkingCharacter: '',
                value: '',
                errors: {}
            })
        },
        deleteMapField (index) {
            // console.log('i', index)
            // eslint-disable-next-linefunction (index) {
            this.mapFields = this.mapFields.filter ((mf, i) => i != index)
        }
    },
    /* eslinl-disable */
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (!(vm[types.CSV_TO_XML_FILE_IS_VALID] && vm[types.CSV_TO_XML_HEADERS_ARE_VALID])) {
                next({ name: 'csv-to-xml' })
            }
        })
    }
}
</script>
