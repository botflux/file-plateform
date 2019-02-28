<template>
    <div>
        <div class="form-group">
            <label>Nom de l'attribut</label>
            <input type="text" v-model="attribute.$model.name" class="form-control" :class="{ 'is-invalid': attribute.name.$invalid, 'is-valid': !attribute.name.$invalid }">
            <div class="invalid-feedback" v-if="attribute.name.$invalid">
                Vous devez spécifier un nom pour l'attribut !
            </div>
        </div>
        <div class="form-group">
            <label>Valeur de l'attribut</label>
            <input type="text" v-model="attribute.$model.value" class="form-control">
        </div>
    </div>
</template>

<script>
export default {
    mounted () {
        console.log('attr', this.attribute)
    },
    props: {
        attribute: Object,
        attributeId: Number
    },
}
</script>

