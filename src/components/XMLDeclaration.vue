<template>
    <div>
        <div class="form-group">
            <label>Nom de la déclaration</label>
            <input type="text" v-model="declaration.name" class="form-control" :class="{ 'is-invalid': $v.declaration.name.$invalid }">
            <div class="invalid-feedback">
                Vous devez spécifié un nom pour la déclaration !
            </div>
        </div>
        
        <div class="form-group">
            <label>Valeur de la déclaration</label>
            <input type="text" v-model="declaration.value" class="form-control">
        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
    props: {
        declaration: Object,
        declarationId: Number
    },
    validations: {
        declaration: {
            name: {
                required
            }
        }
    }
}
</script>

