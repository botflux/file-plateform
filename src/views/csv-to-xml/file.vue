<template>
    <div class="container">
        <h2 class="mb-4">Déposez votre fichier</h2>
        <div class="input-group mb-2">
            <div class="custom-file">
                <input type="file" name="file" id="file" aria-describedby="input" class="custom-file-input" @change="processFile($event)">
                <label for="file" class="custom-file-label">{{ 'Déposez votre fichier' }}</label>
            </div>
        </div>
        <router-link class="btn btn-primary" :to="{ name: 'csv-to-xml-map' }">Étape suivante</router-link>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { SET_FILE, SET_HEADERS, CLEAR_CSV_TO_XML_STATE } from '../../store/csv-to-xml'
import config from '@/config'

const { backendRoot } = config

export default {
    mounted () {
        this[CLEAR_CSV_TO_XML_STATE] ()
    }, 
    computed: {
        ...mapState('csvToXml', {
            file: state => state.file,
            headers: state => state.headers
        }),
        ...{
            // fileIsUploaded () {
            //     return (this.file !== undefined && this.file !== null)
            // }
        }
    },
    methods: {
        ...mapActions('csvToXml', [
            SET_FILE,
            SET_HEADERS,
            CLEAR_CSV_TO_XML_STATE
        ]),
        ...{    
            processFile (event) {
                const file = event.target.files[0]
                this[SET_FILE] ({file})
            },
        }
    },
    watch: {
        file (newValue) {
            if (newValue === undefined || newValue === null) return

            fetch(backendRoot + '/csv-to-xml/get-headers', {
                method: 'post'
            })
                .then (res => res.json())
                .then (o => {
                    const { headers } = o.body
                    this[SET_HEADERS] ({ headers })
                })
        }
    },
    /* eslint-disable */
    beforeRouteLeave (to, from, next) {
        // console.log(to, from)
        if (to.name.includes('csv-to-xml-')) {
            const actionCompleted = (this.file !== undefined && this.file !== null && this.headers.length !== 0)
            console.log(actionCompleted)
            if (actionCompleted) {
                next()
            }
        } else {
            next()
        }
    }
}
</script>
