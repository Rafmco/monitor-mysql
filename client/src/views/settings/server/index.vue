<template>
  <pagina
    :cols="8"
    :loading="loading"
    :editar-formulario="!exibicao && !inserir"
    :formulario.sync="modal"
    :mais-opcoes="edicao"
    :salvar="(!exibicao) && (inserir || edicao)"
    titulo-toolbar="Configurações"
    fechar
    titulo="Configurações"
    subtitulo="Servidores"
    @cancelar="resetFormulario()"
    @editar="exibicao = false, edicao = true"
    @fechar="resetFormulario()"
    @salvar="salvarRegistro()"
  >
    <template slot="formulario">
      <aviso
        :loading="loading"
        :modal="modalAviso"
        :texto.sync="textoAviso"
        alerta
        titulo="Atenção !"
        @sim="modalAviso = false, deletarRegistro()"
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
                lg="2"
                md="6"
                xs="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Nome"
                  rules="required|max:45"
                  vid="name"
                >
                  <v-text-field
                    ref="name"
                    v-model="formulario.name"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    class="required"
                    dense
                    outlined
                    label="Nome"
                    @input="(val) => (formulario.name = formulario.name ? formulario.name.toUpperCase() : null)"
                  />
                </validation-provider>
              </v-col>
              <v-col
                cols="12"
                lg="6"
                md="6"
                xs="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Descrição"
                  rules="required|max:250"
                  vid="description"
                >
                  <v-text-field
                    ref="desc"
                    v-model="formulario.desc"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    class="required"
                    dense
                    outlined
                    label="Descrição"
                    @input="(val) => (formulario.desc = formulario.desc ? formulario.desc.toUpperCase() : null)"
                  />
                </validation-provider>
              </v-col>
              <v-col
                cols="12"
                lg="3"
                md="6"
                xs="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="IP"
                  rules="required|max:100"
                  vid="ip"
                >
                  <v-text-field
                    ref="ip"
                    v-model="formulario.ip"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    class="required"
                    dense
                    outlined
                    label="IP"
                  />
                </validation-provider>
              </v-col>
              <v-col
                cols="12"
                lg="2"
                md="3"
                xs="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Porta"
                  rules="required|numeric"
                  vid="port"
                >
                  <v-text-field
                    ref="port"
                    v-model="formulario.port"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    class="required"
                    dense
                    outlined
                    label="Porta"
                  />
                </validation-provider>
              </v-col>
            </v-row>
          </v-container>
        </validation-observer>
      </v-form>
    </template>

    <template slot="maisOpcoes">
      <v-list
        class="pa-0"
        dense
      >
        <v-list-item @click="textoAviso = 'Deseja realmente excluir esse <b>Registro</b>?', modalAviso = true">
          <v-list-item-icon class="mr-3">
            <v-icon color="primary">
              mdi-delete
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Excluir registro
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>

    <template slot="listagem">
      <filtro
        v-if="!modal"
        :limpar-filtros="filtrosPreenchidos"
        :loading="loading"
        adicionar
        pesquisar
        @adicionar="modal = true, inserir = true"
        @limparFiltros="filtro.name = null, filtro.desc = null, listarServer()"
        @pesquisar="listarServer()"
      >
        <template slot="conteudo">
          <v-row
            class="mx-2 my-0"
            dense
          >
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
                label="Nome do Servidor"
                @click:clear="filtro.name = null, listarServer()"
                @keydown.enter="listarServer()"
                @input="(val) => (filtro.name = filtro.name ? filtro.name.toUpperCase() : null, listarServer())"
              />
            </v-col>
            <v-col
              cols="12"
              lg="6"
              md="6"
              xs="12"
            >
              <v-text-field
                v-model="filtro.desc"
                auto-focus
                clearable
                dense
                hide-details
                outlined
                label="Descrição do Servidor"
                @click:clear="filtro.desc = null, listarServer()"
                @keydown.enter="listarServer()"
                @input="(val) => (filtro.desc = filtro.desc ? filtro.desc.toUpperCase() : null, listarServer())"
              />
            </v-col>
          </v-row>
        </template>
      </filtro>
      <tabela
        v-if="!modal"
        :colunas="colunaslistarServer"
        :loading="loading"
        :registros="serverList"
        height-auto
        sem-paginacao
        sem-rodape
        titulo="Registros"
        visualizar
        @visualizar="exibirRegistro($event)"
      />
    </template>
  </pagina>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import store from './store'

export default {
  name: 'PaginaSettingsServer',

  data: () => ({
    colunaslistarServer: [
      {
        text: 'Ação',
        align: 'center',
        sortable: false,
        value: 'action',
        width: '100px'
      },
      {
        text: 'Nome',
        align: 'left',
        sortable: true,
        value: 'name'
      },
      {
        text: 'Descrição',
        align: 'left',
        sortable: true,
        value: 'description'
      },
      {
        text: 'IP',
        align: 'start',
        sortable: true,
        value: 'ip'
      },
      {
        text: 'Porta',
        align: 'start',
        sortable: true,
        value: 'port'
      }
    ],
    edicao: false,
    exibicao: false,
    filtro: {
      name: null,
      desc: null
    },
    formulario: {
      id: null,
      name: null,
      desc: null,
      ip: null,
      port: null
    },
    enabled: [
      {
        item: 0,
        descricao: 'No'
      },
      {
        item: 1,
        descricao: 'Yes'
      }
    ],
    inserir: false,
    loading: false,
    modal: false,
    modalAviso: false,
    store: {
      nome: 'paginaSettingsServer',
      modulo: store
    },
    textoAviso: ''
  }),

  computed: {
    ...mapState('paginaSettingsServer', [
      'serverList'
    ]),

    filtrosPreenchidos () {
      return Object.values(this.filtro).reduce((acumulador, atual) => !!acumulador || !!atual, false)
    }
  },

  watch: {
    modal (valor) {
      if (valor) {
        setTimeout(() => {
          this.$refs.name.focus()
        }, 100)
      }
    }
  },

  created () {
    this.listarServer()
  },

  methods: {
    ...mapActions('paginaSettingsServer', [
      'apagar',
      'editar',
      'exibir',
      'listar',
      'salvar'
    ]),

    async deletarRegistro () {
      this.loading = true

      let res = await this.apagar(this.formulario.id)

      if (!res.erro) {
        this.resetFormulario()
      }

      this.loading = false
    },

    async listarServer () {
      this.loading = true

      await this.listar({
        filtro: {
          name: this.filtro.name || undefined,
          desc: this.filtro.desc || undefined
        }
      })

      this.loading = false
    },

    async exibirRegistro (id) {
      this.loading = true

      let res = await this.exibir(id)

      if (!res.erro) {
        this.formulario = {
          id: res.id || null,
          name: res.name || null,
          desc: res.description || null,
          ip: res.ip || null,
          port: res.port || null
        }

        this.exibicao = true
        this.inserir = false
        this.modal = true
      }

      this.loading = false
    },

    async salvarRegistro () {
      if (await this.$refs.observer.validate()) {
        this.loading = true

        let form = {
          id: this.formulario.id || null,
          name: this.formulario.name || null,
          desc: this.formulario.desc || null,
          ip: this.formulario.ip || null,
          port: JSON.parse(this.formulario.port) || null
        }

        let res = ''

        if (!form.id) res = await this.salvar(form)
        else res = await this.editar(form)

        if (res.message) {
          this.resetFormulario()
        } else if (res.erro) {
          this.$refs.observer.setErrors(res.erro)
        }

        this.loading = false
      }
    },

    resetFormulario () {
      this.edicao = false
      this.exibicao = false
      this.textoAviso = ''
      this.modalAviso = false

      this.filtro = {
        name: null,
        desc: null
      }
      this.formulario = {
        id: null,
        name: null,
        desc: null,
        ip: null,
        port: null
      }

      this.inserir = false
      this.loading = false
      this.modal = false
      this.listarServer()
    }
  }
}
</script>
