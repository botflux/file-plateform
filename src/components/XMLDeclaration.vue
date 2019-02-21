<template>
    <div>
        <div class="form-group">
            <label>Nom de la déclaration</label>
            <input type="text" v-model="declaration.name" class="form-control">
        </div>
        
        <div class="form-group">
            <label>Valeur de la déclaration</label>
            <input type="text" v-model="declaration.value" class="form-control">
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

