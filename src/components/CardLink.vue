<template>
    <router-link :to="to"><slot /></router-link>
</template>

<script>
export default {
    name: 'CardLink',
    props: {
        to: Object
    }
}
</script>
