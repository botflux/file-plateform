<template>
  <div class="home">
    <div class="jumbotron">
      <div class="container">
        <h1 class="display-3">Gestion de fichiers</h1>
        <p class="lead">Bienvenue sur le système de gestion de fichiers.</p>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <card>
            <card-title>Vérification de caractère</card-title>
            <card-text>Vérifier que les fichiers encodés avec ISO 8859-1 (latin1) ne possède pas de caractère non inclus dans l'encodage.</card-text>
            <card-link :to="{ name: 'character-checker' }">Accèder au service</card-link>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'
import CardTitle from '@/components/CardTitle'
import CardText from '@/components/CardText'
import CardLink from '@/components/CardLink'

export default {
  name: 'home',
  components: {
    Card, CardTitle, CardText, CardLink
  }
}
</script>
