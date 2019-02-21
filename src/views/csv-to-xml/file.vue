<template>
    <div class="container">
        <h2 class="mb-5">Déposer votre fichier</h2>

        <div class="custom-file mb-3">
            <input id="csv-to-xml-file-input" type="file" @change="updateFile($event.target.files)" class="custom-file-input" :class="{ 'is-invalid': !$v.file.name.required }">
            <label for="csv-to-xml-file-input" class="custom-file-label" data-browse="Chercher">{{ file.name === undefined ? 'Déposer votre document' : file.name }}</label>
            <div class="invalid-feedback" v-if="!$v.file.name.required">
                Un fichier doit être renseigné
            </div>
        </div>
        <router-link :to="{ name: 'csv-to-xml-map' }" class="btn btn-primary" v-if="fileIsSubmitted">Suivant</router-link>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as types from '@/stores/types'
import config from '@/config'
import { required } from 'vuelidate/lib/validators'

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
            this.$v.file.name.$touch()

        },
        ...mapActions([
            types.SET_CSV_TO_XML_FILE,
            types.SET_CSV_TO_XML_HEADERS
        ])
    },
    validations: {
        file: {
            name: {
                required
            }
        }
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
