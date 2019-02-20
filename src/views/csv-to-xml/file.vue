<template>
    <div class="container">
        <h2>Déposer votre fichier</h2>
        <input type="file" @change="updateFile($event.target.files)">
        <router-link :to="{ name: 'csv-to-xml-map' }" class="btn btn-primary" v-if="fileIsSubmitted">Suivant</router-link>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as types from '@/stores/types'
import config from '@/config'

const { mapGetters, mapActions } = createNamespacedHelpers('csvToXml')

export default {
    data () {
        return {
            file: {}
        }
    },
    computed: {
        fileIsSubmitted () {
            return (this.file.name !== undefined)
        },
        ...mapGetters([
            types.CSV_TO_XML_HEADERS_ARE_VALID,
            types.CSV_TO_XML_FILE_IS_VALID
        ])
    },
    methods: {
        updateFile (files) {
            this.file = files[0] || {}
        },
        ...mapActions([
            types.SET_CSV_TO_XML_FILE,
            types.SET_CSV_TO_XML_HEADERS
        ])
    },
    beforeRouteLeave (to, from, next) {
        // console.log(to, from, next)

        if (to.name == 'csv-to-xml-map') {
            fetch(config.backendRoot+'/csv-to-xml/get-headers', {
                method: 'post'
            })
            .then(res => res.json())
            .then(o => {
                this[types.SET_CSV_TO_XML_FILE] (this.file)
                this[types.SET_CSV_TO_XML_HEADERS] (o.body.headers)

                return (this[types.CSV_TO_XML_HEADERS_ARE_VALID] && this[types.CSV_TO_XML_FILE_IS_VALID])
            })
            /* eslint-disable */
            .then(isValid => {
                if (isValid)
                    next()
                else
                    console.log('not valid')
            })
        }

        next()
    }
}
</script>
