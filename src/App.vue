<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style lang="scss">
  @import "~bootstrap/dist/css/bootstrap.css";

  body {
    min-height: 100vh;
    margin: 0;
  }
</style>
