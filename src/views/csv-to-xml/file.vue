<template>
    <div class="container">
        <h2 class="mb-4">Déposez votre fichier</h2>
        <div class="input-group mb-2">
            <div class="custom-file">
                <input type="file" name="file" id="file" aria-describedby="input" class="custom-file-input" @change="processFile($event)">
                <label for="file" class="custom-file-label">{{ (fileIsUploaded) ? file.name : 'Déposez votre fichier' }}</label>
            </div>
        </div>
        <button class="btn btn-primary">Suivant</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            fileIsUploaded: false
        }
    }
}
</script>
