<template>
    <div class="container">
        <div class="row">
            <h2>Définition de la configuration</h2>
            <csv-headers-container>
                <csv-header v-for="(header, i) in headers" :key="i" :header="header" />
            </csv-headers-container>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as types from '@/stores/types'
import CSVHeader from '@/components/CSVHeader'
import CSVHeadersContainer from '@/components/CSVHeadersContainer'

const { mapGetters, mapState } = createNamespacedHelpers('csvToXml')

export default {
    mounted () {
        // this.$router.go('/csv-to-xml/file')
    },
    components: {
        'csv-header': CSVHeader, 'csv-headers-container': CSVHeadersContainer
    },
    computed: {
        ...mapState({
            headers: state => state.headers
        }),
        ...mapGetters([
            types.CSV_TO_XML_FILE_IS_VALID,
            types.CSV_TO_XML_HEADERS_ARE_VALID
        ])
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
