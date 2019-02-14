<template>
    <div class="character-checker-index">
        <div class="jumbotron mb-4">
            <div class="container">
                <h1 class="display-4">Vérification de caractères</h1>
                <p class="lead">Ce service vous permet de vérifier que le fichier que vous déposez ne contient que des caractère compatible avec la norme ISO 8859-1.</p>
            </div>
        </div>
        <div class="container">
            <h2>Déposer votre fichier</h2>
            <div class="input-group mb-2">
                <div class="custom-file">
                    <input type="file" id="file" aria-describedby="input" class="custom-file-input" @change="processFile($event)">
                    <label for="file" class="custom-file-label">{{ (fileIsUploaded) ? file.name : 'Déposez votre fichier' }}</label>
                </div>
            </div>
            <button class="btn btn-primary" v-if="fileIsUploaded" @click="verify()">Vérifier le fichier</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CharacterCheckerIndex',
    data () {
        return {
            file: null
        }
    },
    computed: {
        fileIsUploaded () {
            return (this.file !== null && this.file !== undefined)
        }
    },
    methods: {
        processFile (event) {
            const [file] = event.target.files
            this.file = file
        },
        verify () {
            if (this.file === null) {
                return
            }
        }
    }
}
</script>
