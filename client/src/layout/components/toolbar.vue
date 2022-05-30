<template>
  <v-app-bar
    app
    color="primary accent-4"
    clipped-left
    dark
    dense
    height="50"
    class="pl-2"
  >
    <!-- icon -->
    <v-app-bar-nav-icon @click="$emit('update:primaryDrawer', !primaryDrawer)" />
    <v-toolbar-title
      style="cursor: pointer"
      @click="voltarInicio()"
    >
      <img
        src="../../assets/logo_mysql.png"
        class="mr-2 logo"
        style="height: auto; width: 40px; margin-top: 8px;"
      >
    </v-toolbar-title>

    <!-- Title -->
    <v-toolbar-title>
      <span
        style="font-size: 30px !important; margin-left: 10px;"
      >
        MySQL Monitor
      </span>
    </v-toolbar-title>

    <v-divider
      vertical
      inset
      class="divider-app mx-5"
    />

    <!-- Server -->
    <v-col>
      <v-toolbar-title>
        <v-autocomplete
          v-model="serverUsuario"
          :items="server ? server : []"
          rounded
          flat
          hide-details
          hide-selected
          no-filter
          :item-text="getServerTitle"
          item-value="id"
          label="Server"
          placeholder="Server"
          @change="updateServer()"
        />
      </v-toolbar-title>
    </v-col>

    <v-spacer />

    <!-- User Menu -->
    <v-menu
      bottom
      left
      offset-y
    >
      <template
        v-slot:activator="{ on }"
      >
        <v-btn
          dark
          outlined
          v-on="on"
          @click="disabled ? $emit('logout') : null"
        >
          <v-icon
            dark
            left
            size="28"
          >
            mdi-account-circle
          </v-icon>
          {{ login }}
        </v-btn>
      </template>
      <v-card
        v-if="!disabled"
      >
        <v-list
          avatar
          class="pa-0"
          rounded
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{ nome }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider class="mb-1" />
        <v-card-actions>
          <v-btn
            block
            color="primary"
            @click="$emit('logout')"
          >
            <v-icon
              left
              size="28"
            >
              mdi-logout-variant
            </v-icon>
            SAIR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ComponenteToolbar',

  props: {
    login: {
      required: true,
      type: String
    },
    nome: {
      required: true,
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    },
    primaryDrawer: {
      required: true,
      type: Boolean
    }
  },

  data: () => ({
    dataAtual: '',
    serverUsuario: ''
  }),

  computed: {
    ...mapState('app', [
      'server'
    ])
  },

  watch: {
    listarServer (valor) {
      if (valor) {
        this.listarServer()
      }
    }
  },

  created () {
    this.listarServer()
    this.refreshServer()

    setTimeout(() => {
      this.atualizarData()
    }, 200)
  },

  methods: {
    ...mapActions('app', [
      'listarServer'
    ]),

    refreshServer () {
      this.serverUsuario = JSON.parse(localStorage.getItem('monitor-mysql:token') ? window.atob(localStorage.getItem('monitor-mysql:server')) : '')
    },

    updateServer () {
      localStorage.setItem('monitor-mysql:server', window.btoa(JSON.stringify(this.serverUsuario)))
      window.location.reload()
    },

    atualizarData () {
      this.dataAtual = this.$day().format('DD/MM/YYYY HH:mm:ss')

      setTimeout(() => {
        this.atualizarData()
      }, 1000)
    },

    voltarInicio () {
      if ((this.$router.currentRoute.path !== '/') && (this.$router.currentRoute.path !== '/monitor')) {
        this.$router.push('/')
      }
    },

    getServerTitle (item) {
      return `[${item.id}] ${item.name} - ${item.description}`
    }
  }
}
</script>

<style lang="css">
.required label::after {
  content: ' *';
  color: red;
}
</style>
