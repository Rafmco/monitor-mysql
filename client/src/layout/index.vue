<template>
  <v-main class="mr-1">
    <loading :loading="loading" />
    <toolbar
      :login="login"
      :nome="nome"
      :primary-drawer.sync="primaryDrawer"
      @logout="deslogar()"
      @marcarInicio="$refs.dropDown.ativo = []"
    />
    <dropdown
      v-if="menusUsuario"
      ref="dropDown"
      :menus-usuario="menusUsuario"
      :primary-drawer.sync="primaryDrawer"
    />
    <router-view />
  </v-main>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'LayoutSistema',

  components: {
    toolbar: () => import('./components/toolbar'),
    dropdown: () => import('./components/dropdown')
  },

  data: () => ({
    primaryDrawer: true,
    loading: false,
    login: localStorage.getItem('monitor-mysql:token') ? window.atob(localStorage.getItem('monitor-mysql:login')) : 'EFETUAR LOGIN',
    nome: localStorage.getItem('monitor-mysql:token') ? window.atob(localStorage.getItem('monitor-mysql:nome')) : '',
    disabled: !localStorage.getItem('monitor-mysql:token')
  }),

  computed: {
    ...mapState('app', [
      'menusUsuario'
    ])
  },

  created () {
    if (localStorage.getItem('monitor-mysql:token')) {
      this.menus()
    }
  },

  methods: {
    ...mapActions('app', [
      'logout',
      'menus'
    ]),
    async deslogar () {
      this.loading = true

      this.logout()
      this.$router.push('/login')

      this.loading = false
    },

    refreshMenu () {
      this.$refs.dropDown.refreshMenu()
    }
  }
}
</script>
