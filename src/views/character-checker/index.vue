<template>
    <div class="character-checker-index">
        <div class="jumbotron mb-4">
            <b-container>
                <h1 class="display-4">Vérification de caractères</h1>
                <p class="lead">Ce service vous permet de vérifier que le fichier que vous déposez ne contient que des caractère compatible avec la norme ISO 8859-1.</p>
            </b-container>
        </div>
        <b-container class="mb-4">
            <h2 class="mb-5">Déposer votre fichier</h2>  
            <div class="input-group mb-2">
                <div class="custom-file">
                    <input type="file" name="file" id="file" aria-describedby="input" class="custom-file-input" @change="processFile($event)">
                    <label for="file" class="custom-file-label">{{ (fileIsUploaded) ? file.name : 'Déposez votre fichier' }}</label>
                </div>
            </div>
            <div class="d-flex">
                <button class="btn btn-primary" v-if="fileIsUploaded" @click="verify()">Vérifier le fichier</button>
                
                <div class="spinner-border ml-5" role="status" v-show="(requested && !responded)">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </b-container>
        <b-container v-if="(this.responded) && fileIsUploaded">
            <b-row v-if="issues.length > 0">
                <b-col cols="4" v-for="issue in issues" :key="issue.id">
                    <card class="mb-2">
                        <card-title>Ligne {{ issue.line }}</card-title>
                        <card-jumbotron>
                            <card-text>{{ issue.sample }}</card-text>
                        </card-jumbotron>
                    </card>
                </b-col>
            </b-row>
            <b-row v-else>
                <p>Il n'y a pas d'erreur</p>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Card from '@/components/Card'
import CardTitle from '@/components/CardTitle'
import CardText from '@/components/CardText'
import CardJumbotron from '@/components/CardJumbotron'
import config from '@/config'

export default {
    name: 'CharacterCheckerIndex',
    components: {
        Card, CardTitle, CardText, CardJumbotron
    },
    data () {
        return {
            file: null,
            issues: [],
            requested: false,
            responded: false,
        }
    },
    computed: {
        fileIsUploaded () {
            return (this.file !== null && this.file !== undefined)
        }
    },
    methods: {
        processFile (event) {
            const uploadedFile = event.target.files[0]
            this.file = uploadedFile
        },
        verify () {
            if (this.file === null) {
                return
            }
            this.requested = true
            this.responded = false
            const form = new FormData()
            form.append('file', this.file)

            fetch(`${config.backendRoot}/character-checker`, {
                method: 'POST',
                body: form
            })
            .then(res => res.json(), rej => console.log(rej))
            .then(object => {
                const { result = [] } = object
                this.issues = result
                this.responded = true
            })
            // eslint-disable-next-line
            .then(_ => {
                console.log('fallback')
            })
        }
    }
}
</script>
