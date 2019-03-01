<template>
    <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand :to="{ name: 'home' }">Gestion de fichier</b-navbar-brand>
        <b-navbar-toggle class="navbar-toggler" target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav class="mr-auto">
                <b-nav-item :to="{ name: 'character-checker' }">
                    Vérification de caractères
                </b-nav-item>
                <b-nav-item :to="{ name: 'csv-to-xml' }">
                    CSV vers XML
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    name: 'AppHeader'
}
</script>
