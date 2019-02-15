<template>
    <div class="jumbotron">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'CardJumbotron'
}
</script>


<style lang="scss" scoped>
    .jumbotron {
        padding: 0.2rem !important;
        margin: 0.3rem 0 !important;
    }
</style>

