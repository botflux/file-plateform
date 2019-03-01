<template>
    <b-container>
        <b-row>
            <router-link class="btn btn-primary" :to="{ name: 'csv-to-xml-download' }">Suivant</router-link>
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
                <map-field-container v-on:component-error-change="handle(errorState)"></map-field-container>
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

const { mapState, mapGetters } = createNamespacedHelpers('csvToXml')

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
            types.CSV_TO_XML_HEADERS_ARE_VALID
        ])
    },
    // eslint-disable-next-line
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (!(vm[types.CSV_TO_XML_FILE_IS_VALID] && vm[types.CSV_TO_XML_HEADERS_ARE_VALID])) {
                next({ name: 'csv-to-xml' })
            }
        })
    }
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
