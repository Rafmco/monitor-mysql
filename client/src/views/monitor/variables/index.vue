<template>
  <div>
    <loading :loading="loading" />
    <pagina
      :formulario="false"
      titulo-toolbar="Monitoramento"
      titulo="Monitoramento"
      subtitulo="System Variables"
      @fechar="resetFormulario()"
    >
      <template slot="listagem">
        <v-card
          class="pa-0"
          flat
          style="background-color: #fff"
        >
          <v-row
            id="Row1"
            class="align-start pa-0"
            dense
          >
            <!-- Row1 -->
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
                    pesquisar
                    @limparFiltros="filtro.scope = null, filtro.name = null, filtro.comment = null, listarSystemVariablesList()"
                    @pesquisar="listarSystemVariablesList()"
                  >
                    <template slot="conteudo">
                      <v-row
                        class="mx-2 my-0"
                        dense
                      >
                        <v-col
                          cols="12"
                          lg="1"
                          md="1"
                          xs="12"
                        >
                          <v-autocomplete
                            v-model="filtro.scope"
                            :items="scopeList"
                            clearable
                            dense
                            hide-details
                            outlined
                            label="Escopo"
                            placeholder="Escopo"
                            @click:clear="filtro.scope = null, listarSystemVariablesList()"
                            @keydown.enter="listarSystemVariablesList()"
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
                            v-uppercase
                            auto-focus
                            clearable
                            dense
                            hide-details
                            outlined
                            label="Nome"
                            @click:clear="filtro.name = null, listarSystemVariablesList()"
                            @keydown.enter="listarSystemVariablesList()"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          lg="4"
                          md="4"
                          xs="12"
                        >
                          <v-text-field
                            v-model="filtro.comment"
                            auto-focus
                            clearable
                            dense
                            hide-details
                            outlined
                            label="Comentário"
                            @click:clear="filtro.comment = null, listarSystemVariablesList()"
                            @keydown.enter="listarSystemVariablesList()"
                          />
                        </v-col>
                      </v-row>
                    </template>
                  </filtro>
                  <tabela
                    :colunas="colunasSystemVariablesList"
                    :loading="loading"
                    :registros="filteredSystemVariables"
                    :items-per-page="20"
                    titulo="Eventos"
                    toolbar-grid
                    class="ma-0"
                    dense
                    v-on="on"
                  />
                </template>
                <span>Número de Lotes de instruções SQL que são recebidas pelo Servidor, por segundo.</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row
            id="Row2"
            class="align-start pa-0"
            dense
          >
            <v-col
              id="Row2Col1"
              cols="24"
              lg="12"
              md="10"
              xs="18"
            />
          </v-row>
          <v-row
            id="Row3"
            class="align-start pa-0"
            dense
          >
            <v-col
              id="Row3Col1"
              cols="9"
              lg="4"
              md="5"
              xs="6"
            />
            <v-col
              id="Row3Col2"
              cols="9"
              lg="4"
              md="5"
              xs="6"
            />
            <v-col
              id="Row3Col3"
              cols="9"
              lg="4"
              md="5"
              xs="6"
            />
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
  name: 'PaginaMonitorSysyemVariables',

  data: () => ({
    datacollection: null,
    colorsChart: [
      '#64DD17', '#1E88E5', '#FFC107', '#616161'
    ],
    colorsCards: [
      '#64DD17', '#FFEA00', '#F44336'
    ],
    colunasSystemVariablesList: [
      {
        text: 'variable_name',
        caption: 'System variable name',
        align: 'start',
        sortable: true,
        value: 'variable_name'
      },
      {
        text: 'session_value',
        caption: 'Session value of the variable or NULL if the variable only has a global scope',
        align: 'start',
        sortable: true,
        value: 'session_value'
      },
      {
        text: 'global_value',
        caption: 'Global value of the variable or NULL if the variable only has a session scope.',
        align: 'start',
        sortable: true,
        value: 'global_value'
      },
      {
        text: 'global_value_origin',
        caption: 'How the global value was set - a compile-time default, auto-configured by the server, configuration file (or a command line), with the SQL statement',
        align: 'start',
        sortable: true,
        value: 'global_value_origin'
      },
      {
        text: 'default_value',
        caption: 'Compile-time default value of the variable',
        align: 'start',
        sortable: true,
        value: 'default_value'
      },
      {
        text: 'variable_scope',
        caption: 'Global, session, or session-only',
        align: 'start',
        sortable: true,
        value: 'variable_scope'
      },
      {
        text: 'variable_type',
        caption: 'Data type of the variable value',
        align: 'start',
        sortable: true,
        value: 'variable_type'
      },
      {
        text: 'variable_comment',
        caption: 'Help text, usually shown in mysqld --help --verbose',
        align: 'start',
        sortable: true,
        value: 'variable_comment'
      },
      {
        text: 'numeric_min_value',
        caption: 'For numeric variables — minimal allowed value',
        align: 'center',
        sortable: true,
        value: 'numeric_min_value'
      },
      {
        text: 'numeric_max_value',
        caption: 'For numeric variables — maximal allowed value',
        align: 'center',
        sortable: true,
        value: 'numeric_max_value'
      },
      {
        text: 'numeric_block_size',
        caption: 'For numeric variables — a valid value must be a multiple of the "block size"',
        align: 'center',
        sortable: true,
        value: 'numeric_block_size'
      },
      {
        text: 'enum_value_list',
        caption: 'For ENUM, SET, and FLAGSET variables — the list of recognized values',
        align: 'start',
        sortable: true,
        value: 'enum_value_list'
      },
      {
        text: 'read_only',
        caption: 'Whether a variable can be set with the SQL statement. Note that many "read only" variables can still be set on the command line',
        align: 'start',
        sortable: true,
        value: 'read_only'
      },
      {
        text: 'command_line_argument',
        caption: 'Whether an argument is required when setting the variable on the command line. NULL when a variable can not be set on the command line',
        align: 'center',
        sortable: true,
        value: 'command_line_argument'
      }
    ],
    scopeList: [
      'GLOBAL',
      'SESSION',
      'SESSION ONLY'
    ],
    loading: false,
    search: '',
    filtro: {
      scope: null,
      name: null,
      comment: null
    },
    setIntervalConsultas: null,
    store: {
      nome: 'paginaMonitorSystemVariables',
      modulo: store
    }
  }),

  computed: {
    ...mapState('paginaMonitorSystemVariables', [
      'systemVariablesList'
    ]),

    filtrosPreenchidos () {
      return Object.values(this.filtro).reduce((acumulador, atual) => !!acumulador || !!atual, false)
    },

    filteredSystemVariables () {
      let filteredList = this.systemVariablesList

      if (this.filtro.scope) {
        filteredList = filteredList.filter(item => {
          return item.variable_scope.toLowerCase() === this.filtro.scope.toLowerCase()
        })
      }

      if (this.filtro.name) {
        filteredList = filteredList.filter(item => {
          return item.variable_name.toLowerCase().includes(this.filtro.name.toLowerCase())
        })
      }

      if (this.filtro.comment) {
        filteredList = filteredList.filter(item => {
          return item.variable_comment.toLowerCase().includes(this.filtro.comment.toLowerCase())
        })
      }

      return filteredList
    }
  },

  async created () {
    setTimeout(async () => {
      this.loading = true

      await this.listarSystemVariablesList()

      this.loading = false
    }, 200)

    this.setIntervalProcess = setInterval(() => {
      this.refreshProcess()
    }, 10000)
  },

  beforeDestroy () {
    clearInterval(this.setIntervalConsultas)
  },

  methods: {
    ...mapActions('paginaMonitorSystemVariables', [
      'listarSystemVariablesList'
    ]),

    async refreshData (interval) {
      this.loading = true

      await this.listarSystemVariablesList()

      this.loading = false
    },

    async refreshProcess (interval) {
      await this.listarSystemVariablesList()
    }
  }
}
</script>
