<template>
    <div class="container">
        <div class="row">
            <button class="btn btn-primary" v-if="hasColumn && columnsAreValid" @click="convert()">Suivant</button>
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
        <div class="row">
            <div class="col-md-6">
                <div>
                    <h3>Définition des balises</h3>
                    <div class="form-group">
                        <label>Nom de la balise globale</label>
                        <input type="text" v-model="globalTag">
                    </div>
                    <div class="form-group">
                        <label>Nom de la balise d'entité</label>
                        <input type="text" v-model="collectionTag">
                    </div>
                </div>

                <div class="d-flex flex-column">
                    <h3>Définition des attributs de l'élément global</h3>
                    <button class="btn btn-success mr-auto" @click="addAttribute()">Ajouter un attribut</button>
                    <div class="d-flex" v-for="(attribute, i) in attributes" :key="`attribute-${i}`">
                        <xml-attribute :attribute="attribute" :attributeId="i" />
                        <button class="btn btn-danger" @click="deleteAttribute(i)">Supprimer</button>
                    </div>
                </div>

                <div class="d-flex flex-column">
                    <h3>Définition des déclarations du fichier XML</h3>
                    <button class="btn btn-success mr-auto" @click="addDeclaration()">Ajouter une déclaration</button>
                    <div class="d-flex" v-for="(declaration, i) in declarations" :key="`declaration-${i}`">
                        <xml-declaration :declaration="declaration" :declarationId="i" />
                        <button class="btn btn-danger" @click="deleteDeclaration(i)">Supprimer</button>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="jumbotron">
                    <div>{{declarationTag|surround}}</div>
                    <div>{{ globalOpeningTag | surround }}</div>
                    <div class="ml-3">{{ collectionTag | surround }}</div>
                    <div class="ml-5" v-for="(mapField, i) in mapFields" :key="`preview-${i}`">{{ mapField.name | surround }}Value{{ mapField.name | addSlash | surround }}</div>
                    <div class="ml-3">{{ collectionTag | addSlash | surround }}</div>
                    <div>{{ globalTag | addSlash | surround }}</div>
                </div>
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
import XMLAttribute from '@/components/XMLAttribute'
import XMLDeclaration from '@/components/XMLDeclaration'
import config from '@/config'

const { mapGetters, mapState } = createNamespacedHelpers('csvToXml')

export default {
    data () {
        return {
            mapFields:      [],
            attributes:     [],
            declarations:   [],
            globalTag:      'Elements',
            collectionTag:  'Element'
        }
    },
    components: {
        'csv-header': CSVHeader, 
        'csv-headers-container': CSVHeadersContainer,
        MapField,
        'xml-attribute': XMLAttribute,
        'xml-declaration': XMLDeclaration
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
        },
        globalOpeningTag () {
            const attrString = this.attributes.reduce((prev, cur) => {
                return `${prev} ${cur.name}="${cur.value}"`
            }, '')

            return this.globalTag + attrString
        },
        declarationTag () {
            const declarationString = this.declarations.reduce((prev, cur) => {
                return `${prev} ${cur.name}="${cur.value}"`
            }, '')

            return `?xml ${declarationString}?`
        }
    },
    filters: {
        surround (value) {
            if (!value) return ''
            return `<${value}>`
        },
        addSlash (value) {
            if (!value) return ''
            return `/${value}`
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
        addDeclaration () {
            this.declarations.push({
                name: '',
                value: ''
            })
        },
        removeDeclaration (index) {
            this.declarations = this.declarations.filter ((d, i) => i != index)
        },
        addAttribute () {
            this.attributes.push({
                name: '',
                value: ''
            })
        },
        removeAttribute (index) {
            this.attributes = this.attributes.filter ((a, i) => i != index)
        },
        deleteMapField (index) {
            // eslint-disable-next-line
            this.mapFields = this.mapFields.filter ((mf, i) => i != index)
        },
        convert () {
            fetch (config.backendRoot+'/csv-to-xml', {
                method: 'post'
            })
            .then(res => res.json())
            .then(o => {
                
            })
        }
    },
    /* eslinl-disable */
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (!(vm[types.CSV_TO_XML_FILE_IS_VALID] && vm[types.CSV_TO_XML_HEADERS_ARE_VALID])) {
                next({ name: 'csv-to-xml' })
            }
        })
    },
}
</script>
