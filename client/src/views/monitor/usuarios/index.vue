<template>
  <div>
    <loading :loading="loading" />
    <pagina
      :formulario="false"
      titulo-toolbar="Monitoramento"
      titulo="Monitoramento"
      subtitulo="Usuários"
      @fechar="resetFormulario()"
    >
      <template slot="listagem">
        <v-card
          class="pt-0"
          flat
          style="background-color: #fff"
        >
          <v-row
            id="Row1"
            class="align-start pa-0"
            dense
          >
            <v-col
              id="Col1"
              cols="12"
              lg="12"
              md="12"
              xs="12"
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <filtro
                    :limpar-filtros="filtrosPreenchidos"
                    :loading="loading"
                    adicionar
                    pesquisar
                    @limparFiltros="filtro.name = null, filtro.roles = null, listarUsersList()"
                    @pesquisar="listarUsersList()"
                  >
                    <!-- v-if="!modal" -->
                    <!-- @adicionar="modal = true, inserir = true" -->
                    <template slot="conteudo">
                      <v-row
                        class="mx-2 my-0"
                        dense
                      >
                        <v-col
                          cols="12"
                          lg="2"
                          md="2"
                          xs="2"
                        >
                          <v-autocomplete
                            v-model="filtro.roles"
                            :items="rolesDropdown"
                            clearable
                            dense
                            hide-details
                            item-text="description"
                            item-value="description"
                            outlined
                            label="Role"
                            placeholder="Roles"
                            @click:clear="filtro.roles = null, listarUsersList()"
                            @keydown.enter="listarUsersList()"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          lg="3"
                          md="3"
                          xs="12"
                        >
                          <v-text-field
                            v-model="filtro.name"
                            auto-focus
                            clearable
                            dense
                            hide-details
                            outlined
                            label="Nome do Usuário"
                            @click:clear="filtro.name = null, listarUsersList()"
                            @keydown.enter="listarUsersList()"
                          />
                        </v-col>
                      </v-row>
                    </template>
                  </filtro>
                  <tabela
                    :colunas="colunasUsersList"
                    :loading="loading"
                    :registros="filteredUsers"
                    :items-per-page="20"
                    titulo="Usuários"
                    toolbar-grid
                    class="ma-0"
                    dense
                    v-on="on"
                  />
                  <!-- sem-paginacao -->
                  <!-- sem-rodape -->
                </template>
                <span>Número de Lotes de instruções SQL que são recebidas pelo Servidor, por segundo.</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </pagina>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import store from './store'

export default {
  name: 'PaginaMonitorUsers',

  data: () => ({
    datacollection: null,
    colorsChart: [
      '#64DD17', '#1E88E5', '#FFC107', '#616161'
    ],
    colorsCards: [
      '#64DD17', '#FFEA00', '#F44336'
    ],
    colunasUsersList: [
      {
        text: 'Username',
        align: 'start',
        sortable: true,
        value: 'user'
      },
      {
        text: 'Hostname',
        align: 'start',
        sortable: true,
        value: 'host'
      },
      // {
      //   text: 'max_questions',
      //   align: 'start',
      //   sortable: true,
      //   value: 'max_questions'
      // },
      // {
      //   text: 'max_updates',
      //   align: 'start',
      //   sortable: true,
      //   value: 'max_updates'
      // },
      // {
      //   text: 'max_connections',
      //   align: 'start',
      //   sortable: true,
      //   value: 'max_connections'
      // },
      // {
      //   text: 'max_user_connections',
      //   align: 'start',
      //   sortable: true,
      //   value: 'max_user_connections',
      //   width: 345
      // },
      // {
      //   text: 'max_statement_time',
      //   align: 'start',
      //   sortable: true,
      //   value: 'max_statement_time',
      //   width: 345
      // },
      {
        text: 'Roles',
        align: 'start',
        sortable: true,
        value: 'admin_roles',
        width: 345
      },
      // {
      //   text: 'is_role',
      //   align: 'start',
      //   sortable: true,
      //   value: 'is_role'
      // },
      {
        text: 'Expired',
        align: 'start',
        sortable: true,
        value: 'password_expired'
      }
    ],
    loading: false,
    filtro: {
      roles: null,
      name: null
    },
    setIntervalConsultas: null,
    store: {
      nome: 'paginaMonitorUsers',
      modulo: store
    }
  }),

  computed: {
    ...mapState('paginaMonitorUsers', [
      'rolesDropdown',
      'usersList'
    ]),

    filtrosPreenchidos () {
      return Object.values(this.filtro).reduce((acumulador, atual) => !!acumulador || !!atual, false)
    },

    filteredUsers () {
      let filteredList = this.usersList

      if (this.filtro.roles) {
        filteredList = filteredList.filter(item => {
          if (item.admin_roles) {
            return item.admin_roles.toLowerCase().includes(this.filtro.roles.toLowerCase())
          }
        })
      }

      if (this.filtro.name) {
        filteredList = filteredList.filter(item => {
          return item.user.toLowerCase().includes(this.filtro.name.toLowerCase())
        })
      }

      return filteredList
    }
  },

  async created () {
    setTimeout(async () => {
      this.loading = true

      await this.listarRolesDropdown()
      await this.listarUsersList()

      this.loading = false
    }, 200)

    this.setIntervalProcess = setInterval(() => {
      this.refreshProcess()
    }, 10000)
  },

  methods: {
    ...mapActions('paginaMonitorUsers', [
      'listarUsersList',
      'listarRolesDropdown'
    ]),

    async refreshData (interval) {
      this.loading = true

      await this.listarUsersList()

      this.loading = false
    },

    async refreshProcess (interval) {
      await this.listarUsersList()
    }
  }
}
</script>
