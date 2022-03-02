<template>
  <div>
    <loading :loading="loading" />
    <pagina
      :formulario="false"
      titulo-toolbar="Monitoramento"
      titulo="Monitoramento"
      subtitulo="Eventos"
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
                    @limparFiltros="filtro.schema = null, filtro.name, listarEventsList()"
                    @pesquisar="listarEventsList()"
                  >
                    <template slot="conteudo">
                      <v-row
                        class="mx-2 my-0"
                        dense
                      >
                        <v-col
                          cols="12"
                          lg="2"
                          md="2"
                          xs="12"
                        >
                          <v-autocomplete
                            v-model="filtro.schema"
                            :items="schemasDropdown"
                            clearable
                            dense
                            hide-details
                            item-text="SCHEMA_NAME"
                            item-value="SCHEMA_NAME"
                            outlined
                            label="Schema"
                            placeholder="Schema"
                            @click:clear="filtro.schema = null, listarEventsList()"
                            @keydown.enter="listarEventsList()"
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
                            @click:clear="filtro.name = null, listarEventsList()"
                            @keydown.enter="listarEventsList()"
                          />
                        </v-col>
                      </v-row>
                    </template>
                  </filtro>
                  <tabela
                    :colunas="colunasEventsList"
                    :loading="loading"
                    :registros="filteredEvents"
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
  name: 'PaginaMonitorEvents',

  data: () => ({
    datacollection: null,
    colorsChart: [
      '#64DD17', '#1E88E5', '#FFC107', '#616161'
    ],
    colorsCards: [
      '#64DD17', '#FFEA00', '#F44336'
    ],
    colunasEventsList: [
      {
        text: 'Schema',
        caption: 'Database where the event was defined',
        align: 'start',
        sortable: true,
        value: 'event_schema'
      },
      {
        text: 'Name',
        caption: 'Event name',
        align: 'start',
        sortable: true,
        value: 'event_name'
      },
      {
        text: 'Definition',
        caption: 'The SQL defining the event',
        align: 'start',
        sortable: true,
        value: 'event_definition'
      },
      {
        text: 'Type',
        caption: 'Either ONE TIME or RECURRING',
        align: 'start',
        sortable: true,
        value: 'event_type'
      },
      {
        text: 'Execute At',
        caption: 'DATETIME when the event is set to execute, or NULL if recurring',
        align: 'start',
        sortable: true,
        value: 'execute_at'
      },
      {
        text: 'Interval Unit',
        caption: 'Interval unit (e.g., HOUR)',
        align: 'start',
        sortable: true,
        value: 'interval_field'
      },
      {
        text: 'Interval Value',
        caption: 'Numeric interval between event executions for a recurring event, or NULL if not recurring',
        align: 'start',
        sortable: true,
        value: 'interval_value'
      },
      {
        text: 'Starts',
        caption: 'Start DATETIME for a recurring event, NULL if not defined or not recurring',
        align: 'center',
        sortable: true,
        value: 'starts'
      },
      {
        text: 'Ends',
        caption: 'End DATETIME for a recurring event, NULL if not defined or not recurring',
        align: 'center',
        sortable: true,
        value: 'ends'
      },
      {
        text: 'Last Executed',
        caption: 'When the event was last run',
        align: 'center',
        sortable: true,
        value: 'last_executed'
      },
      {
        text: 'Status',
        caption: 'One of ENABLED, DISABLED or /SLAVESIDE_DISABLED',
        align: 'start',
        sortable: true,
        value: 'status'
      },
      {
        text: 'On Completion',
        caption: 'The ON COMPLETION clause, either PRESERVE or NOT PRESERVE',
        align: 'start',
        sortable: true,
        value: 'on_completion'
      },
      {
        text: 'Created By',
        caption: 'Event definer',
        align: 'start',
        sortable: true,
        value: 'definer'
      },
      {
        text: 'Created At',
        caption: 'When the event was created',
        align: 'center',
        sortable: true,
        value: 'created'
      },
      {
        text: 'Last Altered',
        caption: 'When the event was last change',
        align: 'center',
        sortable: true,
        value: 'last_altered'
      },
      {
        text: 'Comment',
        caption: 'The comment provided in the CREATE EVENT statement, or an empty string if none',
        align: 'start',
        sortable: true,
        value: 'event_comment'
      },
      {
        text: 'Server ID',
        caption: 'MariaDB server ID on which the event was created',
        align: 'start',
        sortable: true,
        value: 'originator'
      }
    ],
    loading: false,
    filtro: {
      schema: null,
      name: null
    },
    setIntervalConsultas: null,
    store: {
      nome: 'paginaMonitorEvents',
      modulo: store
    }
  }),

  computed: {
    ...mapState('paginaMonitorEvents', [
      'schemasDropdown',
      'eventsList'
    ]),

    filtrosPreenchidos () {
      return Object.values(this.filtro).reduce((acumulador, atual) => !!acumulador || !!atual, false)
    },

    filteredEvents () {
      let filteredList = this.eventsList

      if (this.filtro.schema) {
        filteredList = filteredList.filter(item => {
          return item.event_schema.toLowerCase() === this.filtro.schema.toLowerCase()
        })
      }

      if (this.filtro.name) {
        filteredList = filteredList.filter(item => {
          return item.event_name.toLowerCase().includes(this.filtro.name.toLowerCase())
        })
      }

      return filteredList
    }
  },

  async created () {
    setTimeout(async () => {
      this.loading = true

      await this.listarSchemasDropdown()
      await this.listarEventsList()

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
    ...mapActions('paginaMonitorEvents', [
      'listarEventsList',
      'listarSchemasDropdown'
    ]),

    async refreshData (interval) {
      this.loading = true

      await this.listarEventsList()

      this.loading = false
    },

    async refreshProcess (interval) {
      await this.listarEventsList()
    }
  }
}
</script>
