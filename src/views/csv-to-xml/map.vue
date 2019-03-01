<template>
    <b-container>
        <b-row v-if="viewIsValid">
            <b-button variant="primary" @click="next()">Suivant</b-button>
        </b-row>
        <div class="mb-5">
            <h2 class="mb-5">Définition de la configuration</h2>

            <p>Voici les en-têtes qui ont été détecté dans le fichier :</p>
            <csv-headers-container>
                <csv-header v-for="(header, i) in headers" :key="i" :header="header" />
            </csv-headers-container>
        </div>
        <b-row class="mt-5">
            <b-col md="6">
                <map-field-container v-on:validation-state-changed="handleValidation"></map-field-container>
                <xml-tags v-on:component-error-change="handle(errorState)"></xml-tags>
                <xml-attribute-container v-on:component-error-change="handle(errorState)"></xml-attribute-container>
                <xml-declaration-container v-on:component-error-change="handle(errorState)"></xml-declaration-container>
            </b-col>
            <b-col md="6">
                <xml-preview class="sticky-top my-5"></xml-preview>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as types from '@/stores/types.js'

import CSVHeader from '@/components/CSVHeader'
import CSVHeadersContainer from '@/components/CSVHeadersContainer'

import XMLPreview from '@/components/XMLPreview'
import XMLDeclarationContainer from '@/components/XMLDeclarationContainer'
import MapFieldContainer from '@/components/MapFieldContainer'
import XMLAttributeContainer from '@/components/XMLAttributeContainer.vue'
import XMLTags from '@/components/XMLTags'
// import { nextTick } from 'vue';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('csvToXml')

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
            fields: state => state.fields,
            attributes: state => state.attributes,
            declarations: state => state.declarations,
            globalTag: state => state.globalTag,
            collectionTag: state => state.collectionTag
        }),
        ...mapGetters([
            types.CSV_TO_XML_FILE_IS_VALID,
            types.CSV_TO_XML_HEADERS_ARE_VALID,
            types.CSV_TO_XML_TAGS_VIEW_IS_VALID,
            types.CSV_TO_XML_ATTRIBUTES_VIEW_IS_VALID,
            types.CSV_TO_XML_DECLARATIONS_VIEW_IS_VALID,
            types.CSV_TO_XML_MAP_FIELDS_VIEW_IS_VALID
        ]),
        viewIsValid () {
            return (
                this[types.CSV_TO_XML_TAGS_VIEW_IS_VALID] &&
                this[types.CSV_TO_XML_ATTRIBUTES_VIEW_IS_VALID] &&
                this[types.CSV_TO_XML_DECLARATIONS_VIEW_IS_VALID] &&
                this[types.CSV_TO_XML_MAP_FIELDS_VIEW_IS_VALID]
            )
        }
    },
    // eslint-disable-next-line
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (!(vm[types.CSV_TO_XML_FILE_IS_VALID] && vm[types.CSV_TO_XML_HEADERS_ARE_VALID])) {
                next({ name: 'csv-to-xml' })
            }
        })
    },
    methods: {
        ...mapActions([
            types.SET_CSV_TO_XML_DOWNLOAD
        ]),
        next () {
            console.log(
                this.declarations,
                this.attributes,
                this.fields,
                this.globalTag,
                this.collectionTag
            )

            const map = {
                documentRoot: this.globalTag,
                collectionRoot: this.collectionTag,
                fields: this.fields,
                documentAttributes: this.attributes.reduce((prev, cur) => ({
                    ...prev,
                    [cur.name]: cur.value
                }), {}),
                documentDeclarations: this.declarations.reduce((prev, cur) => ({
                    ...prev,
                    [cur.name]: cur.value
                }), {})
            }

            const formData = new FormData()
            formData.append('map', JSON.stringify(map))
            formData.append('file', this.file)

            this.$http.post('csv-to-xml', formData)
                .then(response => response.json(), response => console.log('error', response))
                .then(obj => {
                    if (obj.body === undefined || obj.body.file === undefined) {
                        console.log('something went wrong')
                        return
                    }

                    this[types.SET_CSV_TO_XML_DOWNLOAD] (obj.body.file)
                    console.log(this.$router)
                    this.$router.push({ name: 'csv-to-xml-download' })
                })

        },
        handleValidation (state) {
            console.log('handleValidation', state)
        }
    }
}
</script>
