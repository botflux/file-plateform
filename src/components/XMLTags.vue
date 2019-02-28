<template>
    <div>
        <h3 class="mb-3">Définition des balises</h3>
        <!-- <input type="text" v-model="globalTag"> -->
        <div class="form-group mb-4">
            <label>Nom de la balise globale</label>
            <input type="text" v-model="globalTag" class="form-control" :class="{ 'is-invalid': $v.globalTag.$invalid, 'is-valid': !$v.collectionTag.$invalid }">
            <div class="invalid-feedback" v-if="$v.globalTag.$invalid">
                Ce champs ne peut pas être vide !
            </div>
        </div>
        <div class="form-group">
            <label>Nom de la balise d'entité</label>
            <input type="text" v-model="collectionTag" class="form-control" :class="{ 'is-invalid': $v.collectionTag.$invalid, 'is-valid': !$v.collectionTag.$invalid }">
            <div class="invalid-feedback" v-if="$v.collectionTag.$invalid">
                Ce champs ne peut pas être vide !
            </div>
        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { createHelpers } from 'vuex-map-fields'
// import * as types from '@/stores/types.js'

const { mapFields } = createHelpers({
    getterType: 'csvToXml/getField',
    mutationType: 'csvToXml/updateField'
})

export default {
    validations: {
        globalTag: {
            required
        },
        collectionTag: {
            required
        },
    },
    computed: {
        ...mapFields([
            'globalTag',
            'collectionTag'
        ])
    },
}
</script>

