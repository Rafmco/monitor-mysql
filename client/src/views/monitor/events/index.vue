<template>
  <div>
    <loading :loading="loading" />
    <pagina
      :formulario="false"
      titulo-toolbar="Dashboard Monitoramento"
      titulo="Dashboard Monitoramento"
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
                  <tabela
                    :colunas="colunasEventsList"
                    :loading="loading"
                    :registros="eventsList"
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
        text: 'event_schema',
        caption: 'Database where the event was defined',
        align: 'start',
        sortable: true,
        value: 'event_schema'
      },
      {
        text: 'event_name',
        caption: 'Event name',
        align: 'start',
        sortable: true,
        value: 'event_name'
      },
      {
        text: 'definer',
        caption: 'Event definer',
        align: 'start',
        sortable: true,
        value: 'definer'
      },
      {
        text: 'event_definition',
        caption: 'The SQL defining the event',
        align: 'start',
        sortable: true,
        value: 'event_definition'
      },
      {
        text: 'event_type',
        caption: 'Either ONE TIME or RECURRING',
        align: 'start',
        sortable: true,
        value: 'event_type'
      },
      {
        text: 'execute_at',
        caption: 'DATETIME when the event is set to execute, or NULL if recurring',
        align: 'start',
        sortable: true,
        value: 'execute_at'
      },
      {
        text: 'interval_value',
        caption: 'Numeric interval between event executions for a recurring event, or NULL if not recurring',
        align: 'start',
        sortable: true,
        value: 'interval_value'
      },
      {
        text: 'interval_field',
        caption: 'Interval unit (e.g., HOUR)',
        align: 'start',
        sortable: true,
        value: 'interval_field'
      },
      {
        text: 'starts',
        caption: 'Start DATETIME for a recurring event, NULL if not defined or not recurring',
        align: 'center',
        sortable: true,
        value: 'starts'
      },
      {
        text: 'ends',
        caption: 'End DATETIME for a recurring event, NULL if not defined or not recurring',
        align: 'center',
        sortable: true,
        value: 'ends'
      },
      {
        text: 'last_executed',
        caption: 'When the event was last run',
        align: 'center',
        sortable: true,
        value: 'last_executed'
      },
      {
        text: 'status',
        caption: 'One of ENABLED, DISABLED or /SLAVESIDE_DISABLED',
        align: 'start',
        sortable: true,
        value: 'status'
      },
      {
        text: 'on_completion',
        caption: 'The ON COMPLETION clause, either PRESERVE or NOT PRESERVE',
        align: 'start',
        sortable: true,
        value: 'on_completion'
      },
      {
        text: 'created',
        caption: 'When the event was created',
        align: 'center',
        sortable: true,
        value: 'created'
      },
      {
        text: 'last_altered',
        caption: 'When the event was last change',
        align: 'center',
        sortable: true,
        value: 'last_altered'
      },
      {
        text: 'event_comment',
        caption: 'The comment provided in the CREATE EVENT statement, or an empty string if none',
        align: 'start',
        sortable: true,
        value: 'event_comment'
      },
      {
        text: 'originator',
        caption: 'MariaDB server ID on which the event was created',
        align: 'start',
        sortable: true,
        value: 'originator'
      }
    ],
    loading: false,
    setIntervalConsultas: null,
    store: {
      nome: 'paginaMonitorEvents',
      modulo: store
    }
  }),

  computed: {
    ...mapState('paginaMonitorEvents', [
      'eventsList'
    ])

    // header () {
    //   return (this.hostInfo[0] ? this.hostInfo[0]['hostname'] : '') + ' / ' +
    //     (this.instanceInfo[0] ? this.instanceInfo[0]['version'] : '') + ' / ' +
    //     ' Iniciado em: ' + (this.instanceInfo[0] ? this.instanceInfo[0]['up_since'] : '') + ' (' +
    //     (this.instanceInfo[0] ? this.instanceInfo[0]['uptime_days'] : '') + ' d)'
    // }
  },

  async created () {
    setTimeout(async () => {
      this.loading = true

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
      'listarEventsList'
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
