<template>
    <div class="container">
        <div class="row">
            <router-link class="btn btn-primary" :to="{ name: 'csv-to-xml-download' }">Suivant</router-link>
        </div>
        <div class="d-flex flex-column mb-5">
            <h2 class="mb-5">Définition de la configuration</h2>

            <p>Voici les en-têtes qui ont été détecté dans le fichier :</p>
            <csv-headers-container>
                <csv-header v-for="(header, i) in headers" :key="i" :header="header" />
            </csv-headers-container>
        </div>
        <div class="row mt-5">
            <div class="col-md-6">
                <div class="d-flex flex-column">
                    <h3 class="mb-3">Définition des champs du XML</h3>
                    <button class="btn btn-success mr-auto mb-3" @click="addMapField()">Ajouter un champs</button>
                    <div class="d-flex align-items-start py-3 border-bottom border-top" v-for="(mapField, i) in mapFields" :key="`map-field-${i}`">
                        <map-field :field="mapField" :field-id="i" />
                        <button class="btn btn-danger ml-3" @click="deleteMapField(i)">Supprimer</button>
                    </div>
                </div>

                <div>
                    <h3 class="mb-3">Définition des balises</h3>
                    <div class="form-group mb-4">
                        <label>Nom de la balise globale</label>
                        <input type="text" v-model="globalTag" class="form-control" :class="{ 'is-invalid': $v.globalTag.$invalid }">
                        <div class="invalid-feedback" v-if="$v.globalTag.$invalid">
                            Ce champs ne peut pas être vide !
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Nom de la balise d'entité</label>
                        <input type="text" v-model="collectionTag" class="form-control" :class="{ 'is-invalid': $v.collectionTag.$invalid }">
                        <div class="invalid-feedback" v-if="$v.collectionTag.$invalid">
                            Ce champs ne peut pas être vide !
                        </div>
                    </div>
                </div>

                <div class="d-flex flex-column mt-5">
                    <h3 class="mb-3">Définition des attributs de l'élément global</h3>
                    <button class="btn btn-success mr-auto mb-4" @click="addAttribute()">Ajouter un attribut</button>
                    <div class="py-3 border-bottom border-top" v-for="(attribute, i) in attributes" :key="`attribute-${i}`">
                        <xml-attribute :attribute="attribute" :attributeId="i" />
                        <button class="btn btn-danger" @click="removeAttribute(i)">Supprimer</button>
                    </div>
                </div>

                <div class="d-flex flex-column mt-5">
                    <h3 class="mb-3">Définition des déclarations du fichier XML</h3>
                    <button class="btn btn-success mr-auto mb-3" @click="addDeclaration()">Ajouter une déclaration</button>
                    <div class="py-3 border-bottom border-top" v-for="(declaration, i) in declarations" :key="`declaration-${i}`">
                        <xml-declaration :declaration="declaration" :declarationId="i" />
                        <button class="btn btn-danger" @click="removeDeclaration(i)">Supprimer</button>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="jumbotron sticky-top my-5 py-4">
                    <div>{{declarationTag|surround}}</div>
                    <div>{{ globalOpeningTag | surround }}</div>
                    <div class="ml-3">{{ collectionTag | surround }}</div>
                    <div class="ml-5" v-for="(mapField, i) in mapFields" :key="`preview-${i}`">{{ mapField.name | surround }}{{ mapField.columns.length == 0 ? mapField.value : mapField.columns.join(' + ') }}{{ mapField.name | addSlash | surround }}</div>
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
import config from '@/config.js'
import { required } from 'vuelidate/lib/validators'

const { mapGetters, mapState, mapActions } = createNamespacedHelpers('csvToXml')

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
    validations: {
        globalTag: {
            required
        },
        collectionTag: {
            required
        },
        mapFields: {
            required,
            $each: {
                name: {
                    required
                }
            }
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
            headers: state => state.headers,
            file: state => state.file
        }),
        ...mapGetters([
            types.CSV_TO_XML_FILE_IS_VALID,
            types.CSV_TO_XML_HEADERS_ARE_VALID,
            types.CSV_TO_XML_FIELDS_ARE_VALID,
            types.CSV_TO_XML_GLOBAL_TAG_IS_VALID,
            types.CSV_TO_XML_COLLECTION_TAG_IS_VALID,
            types.CSV_TO_XML_DECLARATIONS_ARE_VALID,
            types.CSV_TO_XML_ATTRIBUTES_ARE_VALID,
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
        },
        dataAreValid () {
            return (
                this[types.CSV_TO_XML_FIELDS_ARE_VALID] &&
                this[types.CSV_TO_XML_GLOBAL_TAG_IS_VALID] &&
                this[types.CSV_TO_XML_COLLECTION_TAG_IS_VALID] &&
                this[types.CSV_TO_XML_DECLARATIONS_ARE_VALID] &&
                this[types.CSV_TO_XML_ATTRIBUTES_ARE_VALID]
            )
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
        ...mapActions([
            types.SET_CSV_TO_XML_GLOBAL_TAG,
            types.SET_CSV_TO_XML_COLLECTION_TAG,
            types.SET_CSV_TO_XML_ATTRIBUTES,
            types.SET_CSV_TO_XML_DECLARATIONS,
            types.SET_CSV_TO_XML_FIELDS,
            types.SET_CSV_TO_XML_DOWNLOAD
        ])
    },
    /* eslinl-disable */
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (!(vm[types.CSV_TO_XML_FILE_IS_VALID] && vm[types.CSV_TO_XML_HEADERS_ARE_VALID])) {
                next({ name: 'csv-to-xml' })
            }
        })
    },
    beforeRouteLeave (to, from, next) {
        if (to.name == 'csv-to-xml-download') {
            const dataConverterConfig = {
                documentRoot: this.globalTag,
                collectionRoot: this.collectionTag,
                documentAttributes: this.attributes.reduce((prev, cur) => {
                    return {
                        ...prev,
                        [cur.name]: cur.value
                    }
                }, {}),
                documentDeclaration: this.declarations.reduce((prev, cur) => {
                    return {
                        ...prev,
                        [cur.name]: cur.value
                    }
                }, {}),
                fields: this.mapFields
            }

            const formData = new FormData()
            formData.append('map', JSON.stringify(dataConverterConfig))
            formData.append('file', this.file)

            fetch (config.backendRoot+'/csv-to-xml', {
                method: 'post',
                body: formData
            })
            .then(res => res.json())
            .then(o => {
                this[types.SET_CSV_TO_XML_GLOBAL_TAG] (this.globalTag)
                this[types.SET_CSV_TO_XML_COLLECTION_TAG] (this.collectionTag)
                this[types.SET_CSV_TO_XML_ATTRIBUTES] (this.attributes)
                this[types.SET_CSV_TO_XML_DECLARATIONS] (this.declarations)
                this[types.SET_CSV_TO_XML_FIELDS] (this.mapFields)
                this[types.SET_CSV_TO_XML_DOWNLOAD] (o.body.file)
                console.log(o.body.file)

                // return this.dataAreValid
                return true
            })
            .then(isValid => {
                if (isValid) {
                    next()
                } else {
                    console.log('prob')
                }
            })

        }

        next()
    }
}
</script>
