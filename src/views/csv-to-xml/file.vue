<template>
    <b-container>
        <b-row v-if="viewIsValid">
            <router-link :to="{ name: 'csv-to-xml-map' }" class="btn btn-primary">Suivant</router-link>
        </b-row>
        <h2 class="mb-5">Déposer votre fichier</h2>

        <div class="custom-file mb-3">
            <input id="csv-to-xml-file-input" type="file" @change="updateFile($event.target.files)" class="custom-file-input" :class="{ 'is-invalid': $v.file.name.$invalid }">
            <label for="csv-to-xml-file-input" class="custom-file-label" data-browse="Chercher">{{ file.name === undefined ? 'Déposer votre document' : file.name }}</label>
            <div class="invalid-feedback" v-if="!$v.file.name.required">
                Un fichier doit être renseigné !
            </div>
            <div class="invalid-feedback" v-else-if="!$v.file.name.MustBeCSV">
                Le fichier doit être au format CSV !
            </div>
        </div>
        <button @click="valid()" class="btn btn-primary" v-if="!$v.file.$invalid">Valider</button>
    </b-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as types from '@/stores/types'
import { required } from 'vuelidate/lib/validators'
import MustBeCSV from '@/validations/must-be-csv'

const { mapGetters, mapActions, mapState } = createNamespacedHelpers('csvToXml')

export default {
    computed: {
        fileIsSubmitted () {
            return (this.file.name !== undefined)
        },
        viewIsValid () {
            return (
                // store is valid
                this[types.CSV_TO_XML_HEADERS_ARE_VALID] && this[types.CSV_TO_XML_FILE_IS_VALID]
                // file has not been removed
                && !this.$v.file.name.$invalid
            )
        },
        ...mapGetters([
            types.CSV_TO_XML_HEADERS_ARE_VALID,
            types.CSV_TO_XML_FILE_IS_VALID
        ]),
        ...mapState({
            file: state => state.file
        })
    },
    methods: {
        updateFile (files) {
            let file = files[0] || {}
            this[types.SET_CSV_TO_XML_FILE] (file)
            this[types.SET_CSV_TO_XML_HEADERS] ([])
            this.$v.file.name.$touch()
        },
        valid () {
            const formData = new FormData()
            formData.append('file', this.file)

            this.$http.post('csv-to-xml/get-headers', formData)
                .then(response => response.json(), response => console.log('error', response))
                .then(obj => {
                    console.log(obj)
                    this[types.SET_CSV_TO_XML_HEADERS] (obj.body.headers)
                    this[types.SET_CSV_TO_XML_FILTERS] (obj.body.filters)
                })
        },
        ...mapActions([
            types.SET_CSV_TO_XML_FILE,
            types.SET_CSV_TO_XML_HEADERS,
            types.CSV_TO_XML_CLEAN,
            types.SET_CSV_TO_XML_FILTERS
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
