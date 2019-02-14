<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <router-link class="navbar-brand" :to="{ name: 'home' }">Gestion de fichier</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <router-link class="nav-link" :to="{ name: 'character-checker' }">Vérification de caractères <span class="sr-only">(current)</span></router-link>
            </li>
        </ul>
    </div>
    </nav>
</template>

<script>
export default {
    name: 'AppHeader'
}
</script>
