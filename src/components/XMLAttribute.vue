<template>
    <div>
        <div class="form-group">
            <label>Nom de l'attribut</label>
            <input type="text" v-model="attribute.name" class="form-control" :class="{ 'is-invalid': $v.attribute.name.$invalid }">
            <div class="invalid-feedback" v-if="$v.attribute.name.$invalid">
                Vous devez spécifier un nom pour l'attribut !
            </div>
        </div>
        <div class="form-group">
            <label>Valeur de l'attribut</label>
            <input type="text" v-model="attribute.value" class="form-control">
        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
    props: {
        attribute: Object,
        attributeId: Number
    },
    validations: {
        attribute: {
            name: {
                required
            }
        }
    }
}
</script>

