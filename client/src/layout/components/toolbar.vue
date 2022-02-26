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
    <!-- <v-app-bar-nav-icon /> -->
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

    <v-toolbar-title>
      <!-- class="text-uppercase" -->
      <span
        style="font-size: 35px !important; margin-left: 10px;"
      >
        MySQL Monitor
      </span>
    </v-toolbar-title>

    <v-spacer />

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
    dataAtual: ''
  }),

  created () {
    setTimeout(() => {
      this.atualizarData()
    }, 200)
  },

  methods: {
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
