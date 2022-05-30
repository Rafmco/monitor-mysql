<template>
  <div>
    <loading :loading="loading" />
    <pagina
      :formulario.sync="modal"
      :salvar="(!exibicao) && (inserir || edicao)"
      titulo-toolbar="Monitoramento"
      titulo="Monitoramento"
      subtitulo="Eventos"
      fechar
      @editar="exibicao = false, edicao = true"
      @cancelar="resetFormulario()"
      @fechar="resetFormulario()"
      @salvar="salvar()"
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
                    v-if="!modal"
                    :limpar-filtros="filtrosPreenchidos"
                    :loading="loading"
                    adicionar
                    pesquisar
                    @adicionar="modal = true, inserir = true"
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
                            auto-focus
                            clearable
                            dense
                            hide-details
                            outlined
                            label="Nome"
                            @click:clear="filtro.name = null, listarEventsList()"
                            @keydown.enter="listarEventsList()"
                            @input="(val) => (filtro.name = filtro.name ? filtro.name.toUpperCase() : null, listarEventsList())"
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
                    editar
                    v-on="on"
                    @editar="exibir($event)"
                  />
                </template>
                <span>Número de Lotes de instruções SQL que são recebidas pelo Servidor, por segundo.</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-card>
      </template>

      <template slot="formulario">
        <aviso
          :loading="loading"
          :modal="modalAviso"
          :texto.sync="textoAviso"
          alerta
          titulo="Atenção !"
          @sim="modalAviso = false, deletar()"
          @nao="modalAviso = false, textoAviso = ''"
        />
        <v-form>
          <validation-observer
            ref="observer"
            v-slot="{ validate }"
          >
            <v-container
              fluid
              grid-list-xs
            >
              <v-row dense>
                <v-col
                  cols="12"
                  lg="3"
                  md="3"
                  xs="3"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Event Name"
                    rules="required|max:100"
                    vid="event_name"
                  >
                    <v-text-field
                      ref="event_name"
                      v-model="formulario.event_name"
                      :disabled="exibicao && !inserir"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      class="required"
                      dense
                      outlined
                      label="Event Name"
                    />
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col
                  cols="12"
                  lg="12"
                  md="12"
                  xs="12"
                >
                  <v-textarea
                    ref="create_event"
                    v-model="formulario.create_event"
                    dense
                    disabled
                    outlined
                    height="60"
                    hide-details
                    label="Create Event"
                    readonly
                    no-resize
                  />
                </v-col>
              </v-row>
              <v-divider />
              <v-row dense>
                <v-col
                  cols="12"
                  lg="4"
                  md="4"
                  xs="4"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Schedule"
                    rules="max:100"
                    vid="on"
                  >
                    <v-text-field
                      ref="on"
                      v-model="formulario.schedule.on"
                      :disabled="exibicao && !inserir"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      dense
                      outlined
                      label="Schedule"
                    />
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col
                  cols="12"
                  lg="2"
                  md="2"
                  xs="2"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="At"
                    vid="at"
                  >
                    <!-- :rules="!formulario.schedule.every ? 'required' : '' + '|max:100'" -->
                    <v-text-field
                      ref="at"
                      v-model="formulario.schedule.at"
                      :disabled="exibicao && !inserir"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      :class="{ 'required' : !formulario.schedule.every }"
                      dense
                      outlined
                      label="At"
                    />
                  </validation-provider>
                </v-col>
                <v-col
                  cols="12"
                  lg="2"
                  md="2"
                  xs="2"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Every"
                    vid="every"
                  >
                    <!-- :rules="!formulario.schedule.at.length ? 'required' : '' + '|max:100'" -->
                    <v-text-field
                      ref="every"
                      v-model="formulario.schedule.every"
                      :disabled="exibicao && !inserir"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      :class="{ 'required' : !formulario.schedule.at }"
                      dense
                      outlined
                      label="Every"
                    />
                  </validation-provider>
                </v-col>
                <v-col
                  cols="12"
                  lg="2"
                  md="2"
                  xs="2"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Starts"
                    rules="max:100"
                    vid="starts"
                  >
                    <v-text-field
                      ref="starts"
                      v-model="formulario.schedule.starts"
                      :disabled="exibicao && !inserir"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      dense
                      outlined
                      label="Starts"
                    />
                  </validation-provider>
                </v-col>
                <v-col
                  cols="12"
                  lg="2"
                  md="2"
                  xs="2"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Ends"
                    rules="max:100"
                    vid="ends"
                  >
                    <v-text-field
                      ref="ends"
                      v-model="formulario.schedule.ends"
                      :disabled="exibicao && !inserir"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      dense
                      outlined
                      label="Ends"
                    />
                  </validation-provider>
                </v-col>
              </v-row>
              <v-divider />
              <v-row dense>
                <v-col
                  cols="12"
                  lg="12"
                  md="12"
                  xs="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Statement"
                    rules="required|max:100"
                    vid="statement"
                  >
                    <v-textarea
                      ref="statement"
                      v-model="formulario.statement"
                      :disabled="exibicao && !inserir"
                      :filled="exibicao && !inserir"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      class="required"
                      dense
                      height="60"
                      outlined
                      no-resize
                      label="Statement"
                    />
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col
                  cols="12"
                  lg="12"
                  md="12"
                  xs="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Comment"
                    rules="max:100"
                    vid="comment"
                  >
                    <v-textarea
                      ref="comment"
                      v-model="formulario.comment"
                      :disabled="exibicao && !inserir"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      dense
                      :filled="exibicao && !inserir"
                      outlined
                      no-resize
                      label="Comment"
                    />
                  </validation-provider>
                </v-col>
              </v-row>
            </v-container>
          </validation-observer>
        </v-form>
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
        align: 'center',
        sortable: false,
        value: 'action',
        width: '30px'
      },
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
      // },
      // {
      //   text: 'Server ID',
      //   caption: 'MariaDB server ID on which the event was created',
      //   align: 'start',
      //   sortable: true,
      //   value: 'originator'
      }
    ],
    loading: false,
    filtro: {
      schema: null,
      name: null
    },
    formulario: {
      event_name: null,
      create_event: null,
      schedule: {
        on: null,
        at: null,
        every: null,
        starts: null,
        ends: null
      },
      statement: null,
      comment: null
    },
    exibicao: false,
    edicao: false,
    inserir: false,
    modal: false,
    modalAviso: false,
    textoAviso: '',
    setIntervalConsultas: null,
    store: {
      nome: 'paginaMonitorEvents',
      modulo: store
    }
  }),

  computed: {
    ...mapState('paginaMonitorEvents', [
      'schemasDropdown',
      'eventsList',
      'showCreate'
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
      'listarSchemasDropdown',
      'listarShowCreate',
      'createEvent'
    ]),

    async exibir (event) {
      this.loading = true

      await this.listarShowCreate({
        event_name: event.event_name || undefined
      })

      this.formulario = {
        event_name: this.showCreate.Event,
        create_event: this.showCreate['Create Event']
      }

      this.edicao = true
      this.exibicao = true
      this.inserir = false
      this.modal = true

      this.loading = false
    },

    async salvar () {
      if (await this.$refs.observer.validate()) {
        this.loading = true

        let form = {
          event_name: this.formulario.event_name || null,
          schedule: this.formulario.schedule.on
            ? this.formulario.schedule.on
            : this.formulario.schedule.at
              ? ' AT ' + this.formulario.schedule.at
              : this.formulario.schedule.every
                ? ' EVERY ' + this.formulario.schedule.every +
                  (this.formulario.schedule.starts
                    ? ' STARTS ' + this.formulario.schedule.starts +
                    (this.formulario.schedule.ends
                      ? ' ENDS ' + this.formulario.schedule.ends
                      : '')
                    : '')
                : null,
          statement: this.formulario.statement || undefined,
          comment: this.formulario.comment || undefined
        }

        let res = ''
        res = await this.createEvent(form)

        this.resetFormulario()

        if (res.erro) {
          this.$refs.observer.setErrors(res.erro)
        }

        this.loading = false
      }
    },

    async refreshData (interval) {
      this.loading = true

      await this.listarEventsList()

      this.loading = false
    },

    async refreshProcess (interval) {
      await this.listarEventsList()
    },

    resetFormulario () {
      this.edicao = false
      this.exibicao = false
      this.textoAviso = ''
      this.modalAviso = false

      this.filtro = {
        schema: null,
        name: null
      }

      this.formulario = {
        event_name: null,
        create_event: null,
        schedule: {
          on: null,
          at: null,
          every: null,
          starts: null,
          ends: null
        },
        statement: null,
        comment: null
      }

      this.loading = false
      this.inserir = false
      this.modal = false
      this.listarEventsList()
    }
  }
}
</script>
