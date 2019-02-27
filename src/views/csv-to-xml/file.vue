<template>
    <div class="container">
        <div class="row" v-if="isValid">
            <router-link :to="{ name: 'csv-to-xml-map' }" class="btn btn-primary">Suivant</router-link>
        </div>
        <h2 class="mb-5">Déposer votre fichier</h2>

        <div class="custom-file mb-3">
            <input id="csv-to-xml-file-input" type="file" @change="updateFile($event.target.files)" class="custom-file-input" :class="{ 'is-invalid': !$v.file.name.$anyError }">
            <label for="csv-to-xml-file-input" class="custom-file-label" data-browse="Chercher">{{ file.name === undefined ? 'Déposer votre document' : file.name }}</label>
            <div class="invalid-feedback" v-if="!$v.file.name.required">
                Un fichier doit être renseigné !
            </div>
            <div class="invalid-feedback" v-else-if="$v.file.name.mustBeCSV">
                Le fichier doit être au format CSV !
            </div>
        </div>
        <button @click="valid()" class="btn btn-primary" v-if="$v.file.$anyError">Valider</button>
        <div class="spinner-border" role="status" v-if="(requested && !responded)">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as types from '@/stores/types'
import config from '@/config'
import { required } from 'vuelidate/lib/validators'

const mustBeCSV = value => {
    console.log(value)
    const exploded = (value || '').split('.')[1] || ''
    return (exploded.toLowerCase() !== 'csv')
}
const { mapGetters, mapActions } = createNamespacedHelpers('csvToXml')

export default {
    data () {
        return {
            file: {},
            isValid: false,
            requested: false,
            responded: false
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
            this[types.SET_CSV_TO_XML_FILE] (files[0])
            this.$v.file.name.$touch()
        },
        valid () {
            this.requested = true
            this.responded = false

            const formData = new FormData()
            formData.append('file', this.file)

            fetch(config.backendRoot+'/csv-to-xml/get-headers', {
                method: 'post',
                body: formData
            })
            .then(res => res.json())
            .then(o => {
                this[types.SET_CSV_TO_XML_HEADERS] (o.body.headers)
                return (this[types.CSV_TO_XML_HEADERS_ARE_VALID] && this[types.CSV_TO_XML_FILE_IS_VALID])
            })
            /* eslint-disable */
            .then(isValid => {
                console.log(isValid)
                this.isValid = isValid
            })
            .then(_ => {
                this.responded = true
                this.requested = false
            })
        },
        ...mapActions([
            types.SET_CSV_TO_XML_FILE,
            types.SET_CSV_TO_XML_HEADERS,
            types.CSV_TO_XML_CLEAN
        ]),
    },
    validations: {
        file: {
            name: {
                required,
                mustBeCSV
            }
        }
    },
    // eslint-disable-next-line
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm[types.CSV_TO_XML_CLEAN] ()
        })
    }
}
</script>
