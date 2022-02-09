<template>
  <v-container fluid>
    <v-card
      class="pt-5"
      flat
      style="background-color: transparent"
    >
      <v-row class="align-start">
        <span class="ml-5 title font-weight-bold">
          Monitor MYSQL
        </span>
      </v-row>
      <validation-observer
        ref="observer"
      >
        <v-row
          class="align-start mt-3"
          dense
        >
          <v-col
            v-for="item in paginasAcessoRapido"
            :key="item.id"
            cols="12"
            lg="3"
            md="6"
            xs="12"
          >
            <v-card
              class="d-inline-flex"
              style="border-radius: 0px !important;"
              width="100%"
              @click="openDashboard(item.url)"
            >
              <v-card-text class="pa-0 ma-0">
                <v-list-item three-line>
                  <v-list-item-avatar
                    class="pa-0 ma-0"
                    right
                    size="100"
                    tile
                  >
                    <v-icon
                      :color="item.classeIcone"
                      left
                      size="95"
                    >
                      {{ item.icone }}
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="subheading mb-1 font-weight-bold">
                      <span class="title">
                        {{ item.nome }}
                      </span>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.descricao }}
                    </v-list-item-subtitle>
                    <div class="overline mt-1">
                      {{ item.categoria }}
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </validation-observer>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'PaginaInicialMonitor',

  data: () => ({
    paginasAcessoRapido: [
      {
        id: 1,
        nome: 'Dashboards',
        descricao: 'Dashboards',
        categoria: 'monitor',
        icone: 'mdi-monitor-dashboard',
        classeIcone: 'primary',
        url: '/monitor/dashboard'
      },
      {
        id: 2,
        nome: 'Usuários',
        descricao: 'Usuários',
        categoria: 'monitor',
        icone: 'mdi-account',
        classeIcone: 'primary',
        url: '/monitor/usuarios'
      },
      {
        id: 3,
        nome: 'Variables',
        descricao: 'Variables',
        categoria: 'monitor',
        icone: 'mdi-variable',
        classeIcone: 'primary',
        url: '/monitor/variables'
      },
      {
        id: 4,
        nome: 'Events',
        descricao: 'Events',
        categoria: 'monitor',
        icone: 'mdi-clock-fast',
        classeIcone: 'primary',
        url: '/monitor/events'
      }
    ]
  }),

  methods: {
    async openDashboard (url) {
      if (await this.$refs.observer.validate()) {
        this.$router.push(url)
      }
    }
  }
}
</script>
