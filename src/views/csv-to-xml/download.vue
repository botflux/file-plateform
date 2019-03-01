<template>
    <div class="d-flex justify-content-center">
        <a :href="downloadUrl" download class="btn btn-primary">Télécharger le XML</a>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as types from '../../stores/types.js'
import config from '@/config.js'
console.log(config)

const { mapState, mapGetters } = createNamespacedHelpers('csvToXml')

export default {
    state() {
        return {
            backendRoot: config.backendRoot
        }
    },
    computed: {
        ...mapState({
            download: state => state.download
        }),
        ...mapGetters([
            types.CSV_TO_XML_TAGS_VIEW_IS_VALID,
            types.CSV_TO_XML_ATTRIBUTES_VIEW_IS_VALID,
            types.CSV_TO_XML_DECLARATIONS_VIEW_IS_VALID,
            types.CSV_TO_XML_DECLARATIONS_VIEW_IS_VALID
        ]),
        downloadUrl () {
            return config.backendRoot + '/' + this.download
        }
    },
    // eslint-disable-next-line
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (!(
                vm[types.CSV_TO_XML_TAGS_VIEW_IS_VALID] && 
                vm[types.CSV_TO_XML_ATTRIBUTES_VIEW_IS_VALID] && 
                vm[types.CSV_TO_XML_MAP_FIELDS_VIEW_IS_VALID] && 
                vm[types.CSV_TO_XML_MAP_FIELDS_VIEW_IS_VALID])
            ) {
                next({ name: 'csv-to-xml-map' })
            }
        })
        // next(vm => {
        //     if (!(vm[types.CSV_TO_XML_GLOBAL_TAG_IS_VALID] && vm[types.CSV_TO_XML_DOWNLOAD_IS_VALID]
        //     && vm[types.CSV_TO_XML_COLLECTION_TAG_IS_VALID] && vm[types.CSV_TO_XML_FIELDS_ARE_VALID]
        //     && vm[types.CSV_TO_XML_ATTRIBUTES_ARE_VALID] && vm[types.CSV_TO_XML_DECLARATIONS_ARE_VALID])) {
        //         next({ name: 'csv-to-xml-map' })
        //     }
        // })
    }
}
</script>
