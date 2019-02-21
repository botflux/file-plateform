<template>
    <div>
        <div class="form-group">
            <label>Nom de l'attribut</label>
            <input type="text" v-model="attribute.name" class="form-control">
        </div>
        <div class="form-group">
            <label>Valeur de l'attribut</label>
            <input type="text" v-model="attribute.value" class="form-control">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        attribute: Object,
        attributeId: Number
    }
}
</script>

