<template>
    <b-container>
        <h2 class="mb-5">Déposer votre fichier</h2>
        <b-form-file
            v-model="file"
            :state="Boolean(file)"
            :placeholder="!file ? 'Choisir un fichier' : file.name"
            drop-placeholder="Déposez votre fichier ici"
            accept=".csv">
        </b-form-file>
        <router-link v-if="Boolean(file)" :to="{ name: 'csv-to-xml-headers-verification', params: { file } }" class="btn btn-primary mt-2">Suivant</router-link>
    </b-container>
</template>

<script>
export default {
    data () {
        return {
            file: null
        }
    },
}
</script>

<style>
    .custom-file-input:lang(fr) ~ .custom-file-label::after {
        content: 'Rechercher';
    }
</style>
