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
                <!-- <div class="d-flex flex-column">
                    <h3 class="mb-3">Définition des champs du XML</h3>
                    <button class="btn btn-success mr-auto mb-3" @click="addMapField()">Ajouter un champs</button>
                    <div class="d-flex align-items-start py-3 border-bottom border-top" v-for="(mapField, i) in $v.mapFields.$each.$iter" :key="`map-field-${i}`">
                        <map-field :field="mapField" :field-id="Number.parseInt(i)" />
                        <button class="btn btn-danger ml-3" @click="deleteMapField(i)">Supprimer</button>
                    </div>
                </div> -->

                <map-field-container></map-field-container>

                <xml-tags></xml-tags>

                <xml-attribute-container></xml-attribute-container>

                <!-- <div class="d-flex flex-column mt-5">
                    <h3 class="mb-3">Définition des attributs de l'élément global</h3>
                    <button class="btn btn-success mr-auto mb-4" @click="addAttribute()">Ajouter un attribut</button>
                    <div class="py-3 border-bottom border-top" v-for="(attribute, i) in attributes" :key="`attribute-${i}`">
                        <xml-attribute :attribute="attribute" :attributeId="i" />
                        <button class="btn btn-danger" @click="removeAttribute(i)">Supprimer</button>
                    </div>
                </div> -->

                <xml-declaration-container></xml-declaration-container>

                <!-- <div class="d-flex flex-column mt-5">
                    <h3 class="mb-3">Définition des déclarations du fichier XML</h3>
                    <button class="btn btn-success mr-auto mb-3" @click="addDeclaration()">Ajouter une déclaration</button>
                    <div class="py-3 border-bottom border-top" v-for="(declaration, i) in declarations" :key="`declaration-${i}`">
                        <xml-declaration :declaration="declaration" :declarationId="i" />
                        <button class="btn btn-danger" @click="removeDeclaration(i)">Supprimer</button>
                    </div>
                </div> -->
            </div>
            <div class="col-md-6">
                <xml-preview class="sticky-top my-5"></xml-preview>
            </div>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as types from '@/stores/types'
import CSVHeader from '@/components/CSVHeader'
import CSVHeadersContainer from '@/components/CSVHeadersContainer'
import XMLPreview from '@/components/XMLPreview'
import XMLDeclarationContainer from '@/components/XMLDeclarationContainer'
// import config from '@/config.js'
import MapFieldContainer from '@/components/MapFieldContainer'
import XMLAttributeContainer from '@/components/XMLAttributeContainer.vue'
import XMLTags from '@/components/XMLTags'

// eslint-disable-next-line
const { mapGetters, mapState, mapActions } = createNamespacedHelpers('csvToXml')

export default {
    components: {
        'csv-header': CSVHeader, 
        'csv-headers-container': CSVHeadersContainer,
        'xml-preview': XMLPreview,
        'xml-tags': XMLTags,
        'xml-declaration-container': XMLDeclarationContainer,
        'xml-attribute-container': XMLAttributeContainer,
        MapFieldContainer
    },
    computed: {
        ...mapState({
            headers: state => state.headers,
            file: state => state.file,
            fields: state => state.fields
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
        addAttribute () {
            this.attributes.push({
                name: '',
                value: ''
            })
        },
        removeAttribute (index) {
            this.attributes = this.attributes.filter ((a, i) => i != index)
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
    // beforeRouteEnter (to, from, next) {
    //     next(vm => {
    //         if (!(vm[types.CSV_TO_XML_FILE_IS_VALID] && vm[types.CSV_TO_XML_HEADERS_ARE_VALID])) {
    //             next({ name: 'csv-to-xml' })
    //         }
    //     })
    // },
    // beforeRouteLeave (to, from, next) {
    //     if (to.name == 'csv-to-xml-download') {
    //         const dataConverterConfig = {
    //             documentRoot: this.globalTag,
    //             collectionRoot: this.collectionTag,
    //             documentAttributes: this.attributes.reduce((prev, cur) => {
    //                 return {
    //                     ...prev,
    //                     [cur.name]: cur.value
    //                 }
    //             }, {}),
    //             documentDeclaration: this.declarations.reduce((prev, cur) => {
    //                 return {
    //                     ...prev,
    //                     [cur.name]: cur.value
    //                 }
    //             }, {}),
    //             // fields: this.mapFields
    //         }

    //         const formData = new FormData()
    //         formData.append('map', JSON.stringify(dataConverterConfig))
    //         formData.append('file', this.file)

    //         fetch (config.backendRoot+'/csv-to-xml', {
    //             method: 'post',
    //             body: formData
    //         })
    //         .then(res => res.json())
    //         .then(o => {
    //             this[types.SET_CSV_TO_XML_GLOBAL_TAG] (this.globalTag)
    //             this[types.SET_CSV_TO_XML_COLLECTION_TAG] (this.collectionTag)
    //             this[types.SET_CSV_TO_XML_ATTRIBUTES] (this.attributes)
    //             this[types.SET_CSV_TO_XML_DECLARATIONS] (this.declarations)
    //             // this[types.SET_CSV_TO_XML_FIELDS] (this.mapFields)
    //             this[types.SET_CSV_TO_XML_DOWNLOAD] (o.body.file)
    //             console.log(o.body.file)

    //             // return this.dataAreValid
    //             return true
    //         })
    //         .then(isValid => {
    //             if (isValid) {
    //                 next()
    //             } else {
    //                 console.log('prob')
    //             }
    //         })

    //     }

    //     next()
    // }
}
</script>
