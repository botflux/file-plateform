<template>
    <div>
        <div class="form-group">
            <label>Nom de la déclaration</label>
            <input type="text" v-model="declaration.$model.name" class="form-control" :class="{ 'is-invalid': declaration.name.$invalid, 'is-valid': !declaration.name.$invalid }">
            <div class="invalid-feedback" v-if="declaration.name.$invalid">
                Vous devez spécifié un nom pour la déclaration !
            </div>
        </div>
        
        <div class="form-group">
            <label>Valeur de la déclaration</label>
            <input type="text" v-model="declaration.$model.value" class="form-control">
        </div>
    </div>
</template>

<script>
export default {
    mounted () {
        console.log('declaratoion', this.declaration)
    },
    props: {
        declaration: Object,
        declarationId: Number
    },
}
</script>

