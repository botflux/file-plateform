<template>
  <div id="app">
    <np-progress-container></np-progress-container>
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'

export default {
  name: 'App',
  components: {
    AppHeader, 'np-progress-container': NprogressContainer
  }
}
</script>

<style lang="scss">
  @import "~bootstrap/dist/css/bootstrap.css";

  body {
    min-height: 100vh;
    margin: 0;
  }

  #nprogress .bar {
    background: #000000 !important;
  }
</style>
