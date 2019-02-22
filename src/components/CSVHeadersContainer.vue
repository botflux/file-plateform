<template>
    <p><slot /></p>
</template>

<style scoped>
    p > span::after {
        content: ", ";
    }

    p > span:last-child::after {
        content: ".";
    }
</style>
