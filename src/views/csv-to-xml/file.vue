<template>
    <b-container>
        <b-row v-if="isValid">
            <router-link :to="{ name: 'csv-to-xml-map' }" class="btn btn-primary">Suivant</router-link>
        </b-row>
        <h2 class="mb-5">Déposer votre fichier</h2>

        <div class="custom-file mb-3">
            <input id="csv-to-xml-file-input" type="file" @change="updateFile($event.target.files)" class="custom-file-input" :class="{ 'is-invalid': !$v.file.name.$anyError }">
            <label for="csv-to-xml-file-input" class="custom-file-label" data-browse="Chercher">{{ file.name === undefined ? 'Déposer votre document' : file.name }}</label>
            <div class="invalid-feedback" v-if="!$v.file.name.required">
                Un fichier doit être renseigné !
            </div>
            <div class="invalid-feedback" v-else-if="$v.file.name.MustBeCSV">
                Le fichier doit être au format CSV !
            </div>
        </div>
        <button @click="valid()" class="btn btn-primary" v-if="$v.file.$anyError">Valider</button>
        <div class="spinner-border" role="status" v-if="(requested && !responded)">
            <span class="sr-only">Loading...</span>
        </div>
    </b-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as types from '@/stores/types'
// import config from '@/config'
import { required } from 'vuelidate/lib/validators'
import MustBeCSV from '@/validations/must-be-csv'

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
            const formData = new FormData()
            formData.append('file', this.file)

            this.$http.post('csv-to-xml/get-headers', formData)
            .then(response => response.json(), response => console.log('hello', response))
            .then(obj => {
                console.log(obj)
                this[types.SET_CSV_TO_XML_HEADERS]  (obj.body.headers)
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
                MustBeCSV
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
