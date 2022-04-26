<template>
  <div>
    <loading :loading="loading" />
    <pagina
      :formulario="false"
      titulo-toolbar="Monitoramento"
      titulo="Monitoramento"
      subtitulo="Dashboards"
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
            <!-- Row1Col1 -->
            <v-col
              id="Col1"
              cols="12"
              lg="2"
              md="2"
              xs="2"
            >
              <v-card
                outlined
              >
                <!-- max-width="450" -->
                <v-list-item three-line>
                  <v-card-title
                    class="text-button"
                  >
                    {{ hostInfo[0] ? hostInfo[0]['hostname'] : '' }}
                  </v-card-title>
                  <v-list-item-content>
                    <div class="text-overline text-center">
                      {{ instanceInfo[0] ? instanceInfo[0]['version'] : '' }}
                    </div>
                    <v-list-item-title
                      class="text-body-2 text-center"
                    >
                      <div>
                        {{ 'Uptime ' + (instanceInfo[0] ? instanceInfo[0]['uptime_days'] : '') + ' Day(s)' }}
                      </div>
                    </v-list-item-title>
                    <v-list-item-title
                      class="text-body-2 text-center"
                    >
                      {{ instanceInfo[0] ? instanceInfo[0]['up_since'] : '' }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <!-- <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
                  ></v-list-item-avatar> -->
                </v-list-item>
              </v-card>
            </v-col>
            <!-- Row1Col2 -->
            <v-col
              id="Col2"
              cols="12"
              lg="5"
              md="5"
              xs="5"
            >
              <!-- <v-row
                id="Col1Row1"
                class="align-start pb-0"
                dense
              > -->
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <tabela
                    :colunas="colunasDbSizeList"
                    :loading="loading"
                    :registros="dbSizeList"
                    :items-per-page="5"
                    titulo="Bancos de Dados"
                    toolbar-grid
                    class="ma-0"
                    dense
                  />
                </template>
                <span>Número de Lotes de instruções SQL que são recebidas pelo Servidor, por segundo.</span>
              </v-tooltip>
              <!-- </v-row> -->
              <!-- <v-row
                id="Col1Row2"
                class="align-start pa-0"
                dense
              />
              <v-row
                id="Col1Row3"
                class="align-start pa-0"
                dense
              />
              <v-row
                id="Col1Row4"
                class="align-start pa-0"
                dense
              />
              <v-row
                id="Col1Row5"
                class="align-start pb-0"
                dense
              /> -->
            </v-col>
            <!-- Row1Col3 -->
            <v-col
              id="Col2"
              cols="12"
              lg="5"
              md="5"
              xs="5"
            >
              <!-- <v-row
                id="Col2Row1"
                class="align-start pb-0"
                dense
              > -->
              <tabela
                :colunas="colunasConnectedUsersList"
                :loading="loading"
                :registros="connectedUsersList"
                :items-per-page="5"
                titulo="Usuários Conectados"
                toolbar-grid
                class="ma-0"
                dense
              />
              <!-- </v-row>
              <v-row
                id="Col2Row2"
                class="align-start pb-0"
                dense
              />
              <v-row
                id="Col2Row3"
                class="align-center pb-0"
                dense
              />
              <v-row
                id="Col2Row4"
                class="align-center pb-0"
                dense
              />
              <v-row
                id="Col2Row5"
                class="align-center pb-0"
                dense
              /> -->
            </v-col>
          </v-row>
          <!-- Row 2 -->
          <v-row
            id="Row2"
            class="align-start pa-0"
            dense
          >
            <v-col
              id="Row2Col1"
              cols="9"
              lg="4"
              md="5"
              xs="6"
            >
              <chartkick
                id="ConnectionsCount"
                :dados="connectionsCount"
                :colors="colorsChart"
                legend="top"
                titulo="Conexões"
                altura="230px"
                class="pa-0"
              />
            </v-col>
            <v-col
              id="Row2Col2"
              cols="9"
              lg="4"
              md="5"
              xs="6"
            >
              <chartkick
                id="BytesCount"
                :dados="bytesCount"
                :colors="colorsChart"
                legend="top"
                titulo="Tráfego de Rede"
                altura="230px"
                class="pa-0"
              />
            </v-col>
            <v-col
              id="Row2Col3"
              cols="9"
              lg="4"
              md="5"
              xs="6"
            >
              <chartkick
                id="StatementsCount"
                :dados="statementsCount"
                :colors="colorsChart"
                legend="top"
                titulo="Statements"
                altura="230px"
                class="pa-0"
              />
            </v-col>
          </v-row>
          <!-- Row 3 -->
          <v-row
            id="Row3"
            class="align-start pa-0"
            dense
          >
            <v-col
              id="Row3Col1"
              cols="24"
              lg="12"
              md="10"
              xs="18"
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <tabela
                    :colunas="colunasProcessList"
                    :loading="loading"
                    :registros="processList"
                    titulo="Processos"
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
        </v-card>
      </template>
    </pagina>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import store from './store'

export default {
  name: 'PaginaMonitorDashboard',

  data: () => ({
    datacollection: null,
    colorsChart: [
      '#64DD17', '#1E88E5', '#FFC107', '#616161'
    ],
    colorsCards: [
      '#64DD17', '#FFEA00', '#F44336'
    ],
    colunasConnectedUsersList: [
      {
        text: 'User',
        align: 'start',
        sortable: true,
        value: 'user'
      },
      {
        text: 'Host',
        align: 'start',
        sortable: true,
        value: 'host'
      },
      {
        text: 'Status',
        align: 'start',
        sortable: true,
        value: 'status'
      },
      {
        text: 'N. Conexões',
        align: 'center',
        sortable: true,
        value: 'count'
      }
    ],
    colunasDbSizeList: [
      {
        text: 'Schema',
        align: 'start',
        sortable: true,
        value: 'table_schema'
      },
      {
        text: 'Data (MB)',
        align: 'start',
        sortable: true,
        value: 'DATA_MB'
      },
      {
        text: 'Index (MB)',
        align: 'start',
        sortable: true,
        value: 'INDEX_MB'
      },
      {
        text: 'Total (MB)',
        align: 'start',
        sortable: true,
        value: 'TOTAL_MB'
      // },
      // {
      //   text: 'Disponível (MB)',
      //   align: 'start',
      //   sortable: true,
      //   value: 'FREE_SPACE_MB'
      }
    ],
    colunasProcessList: [
      {
        text: 'ID',
        align: 'start',
        sortable: true,
        value: 'proc_id'
      },
      {
        text: 'USER',
        align: 'start',
        sortable: true,
        value: 'user'
      },
      {
        text: 'HOST',
        align: 'start',
        sortable: true,
        value: 'host'
      },
      {
        text: 'DB',
        align: 'start',
        sortable: true,
        value: 'database'
      },
      {
        text: 'COMMAND',
        align: 'start',
        sortable: true,
        value: 'type'
      },
      {
        text: 'TIME_MS',
        align: 'start',
        sortable: true,
        value: 'time(s)'
      },
      {
        text: 'STATE',
        align: 'start',
        sortable: true,
        value: 'state'
      },
      {
        text: 'INFO',
        align: 'start',
        sortable: true,
        value: 'statement'
      },
      {
        text: 'PROGRESS',
        align: 'start',
        sortable: true,
        value: 'progress'
      },
      {
        text: 'STAGE',
        align: 'start',
        sortable: true,
        value: 'stage'
      },
      {
        text: 'MAX_STAGE',
        align: 'start',
        sortable: true,
        value: 'max_stage'
      },
      {
        text: 'MEMORY_USED',
        align: 'start',
        sortable: true,
        value: 'memory_used'
      },
      {
        text: 'MAX_MEMORY_USED',
        align: 'start',
        sortable: true,
        value: 'max_memory_used'
      },
      {
        text: 'EXAMINED_ROWS',
        align: 'start',
        sortable: true,
        value: 'examined_rows'
      },
      {
        text: 'QUERY_ID',
        align: 'start',
        sortable: true,
        value: 'query_id'
      }
    ],
    loading: false,
    setIntervalConsultas: null,
    store: {
      nome: 'paginaMonitorDashboard',
      modulo: store
    }
  }),

  computed: {
    ...mapState('paginaMonitorDashboard', [
      'hostInfo',
      'instanceInfo',
      'connectedUsersList',
      'dbSizeList',
      'processList',
      'connectionsCount',
      'bytesCount',
      'statementsCount'
    ])
  },

  async created () {
    setTimeout(async () => {
      this.loading = true

      await this.listarHostInfo()
      await this.listarInstanceInfo()
      await this.listarConnectedUsersList()
      await this.listarDbSizeList()
      await this.listarProcessList()
      await this.listarConnectionsCount()
      await this.listarBytesCount()
      await this.listarStatementsCount()

      this.loading = false
    }, 1000)

    this.setIntervalProcess = setInterval(() => {
      this.refreshProcess()
    }, 10000)

    // this.setIntervalConsultas = setInterval(() => {
    //   this.refreshData()
    // }, 60000)
  },

  beforeDestroy () {
    clearInterval(this.setIntervalConsultas)
  },

  methods: {
    ...mapActions('paginaMonitorDashboard', [
      'listarHostInfo',
      'listarInstanceInfo',
      'listarConnectedUsersList',
      'listarDbSizeList',
      'listarProcessList',
      'listarConnectionsCount',
      'listarBytesCount',
      'listarStatementsCount'
    ]),

    async refreshData (interval) {
      this.loading = true

      await this.listarHostInfo()
      await this.listarInstanceInfo()
      await this.listarConnectedUsersList()
      await this.listarDbSizeList()
      await this.listarProcessList()
      await this.listarConnectionsCount()
      await this.listarBytesCount()
      await this.listarStatementsCount()

      this.loading = false
    },

    async refreshProcess (interval) {
      await this.listarConnectedUsersList()
      await this.listarProcessList()
      await this.listarConnectionsCount()
      await this.listarBytesCount()
      await this.listarStatementsCount()
    }
  }
}
</script>
