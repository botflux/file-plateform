<template>
    <div class="d-flex">
        <div class="form-group">
            <label>Nom de la déclaration</label>
            <input type="text" v-model="declaration.name">
        </div>
        
        <div class="form-group">
            <label>Valeur de la déclaration</label>
            <input type="text" v-model="declaration.value">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        declaration: Object,
        declarationId: Number
    }
}
</script>

