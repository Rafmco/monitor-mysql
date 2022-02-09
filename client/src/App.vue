<template>
  <v-app class="textura-fundo">
    <title>
      {{ titulo }}
    </title>
    <notificacao />
    <router-view />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',

  computed: {
    ...mapState('app', [
      'titulo'
    ])
  }
}
</script>

<style>
  ::-webkit-scrollbar {
    width: 7px !important;
    height: 7px !important;
  }
  .v-data-table:hover ::-webkit-scrollbar {
    width: 10px !important;
    height: 10px !important;
  }
  body{
    scrollbar-color: var(--v-primary-base) !important;
  }
  ::-webkit-scrollbar-track{
    background: #fff !important;
  }
  ::-webkit-scrollbar-thumb{
    background-color: var(--v-primary-base) !important;
    border-radius: 0px !important;
    border: 0px solid var(--v-info-base) !important;
  }
  ::-webkit-scrollbar-button{
    background-color: var(--v-primary-base) !important;
    border-radius: 0px !important;
    border: 0px solid var(--v-info-base) !important;
  }

  .v-data-table {
    white-space: nowrap !important;
  }
</style>

<style lang="sass">
  @import './assets/css/app.scss'
</style>
