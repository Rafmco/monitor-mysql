<template>
  <pagina
    :cols="8"
    :editar="exibicao && !inserir"
    :loading="loading"
    :formulario.sync="modal"
    :mais-opcoes="edicao"
    :salvar="(!exibicao) && (inserir || edicao)"
    titulo-toolbar="Formulário de cadastro"
    fechar
    titulo="Cadastro de Perfis do Sistema"
    subtitulo="Listagem e manutenção de Perfis do Sistema"
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
                lg="1"
                md="1"
                xs="1"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="ID"
                  rules="required|max:100"
                  vid="id"
                >
                  <v-text-field
                    ref="id"
                    v-model="formulario.id"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    class="required"
                    dense
                    outlined
                    label="ID"
                  />
                </validation-provider>
              </v-col>
              <v-col
                cols="12"
                lg="4"
                md="4"
                xs="4"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Perfil"
                  rules="required|max:100"
                  vid="description"
                >
                  <v-text-field
                    ref="description"
                    v-model="formulario.description"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    class="required"
                    dense
                    outlined
                    label="Perfil"
                  />
                </validation-provider>
              </v-col>
              <v-col
                cols="12"
                lg="7"
                md="7"
                xs="7"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Observação"
                  rules="required|max:100"
                  vid="obs"
                >
                  <v-text-field
                    ref="obs"
                    v-model="formulario.obs"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    class="required"
                    dense
                    outlined
                    label="Observação"
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
        @limparFiltros="filtro.description = null, listarProfile()"
        @pesquisar="listarProfile()"
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
                v-model="filtro.description"
                clearable
                dense
                hide-details
                outlined
                label="Perfil"
                @click:clear="filtro.profileId = null, listarProfile()"
                @keydown.enter="listarProfile()"
              />
            </v-col>
          </v-row>
        </template>
      </filtro>
      <tabela
        v-if="!modal"
        :colunas="colunasListarProfile"
        :loading="loading"
        :registros="profileList"
        height-auto
        sem-paginacao
        sem-rodape
        toolbar-grid
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
  name: 'PaginaSettingsProfile',

  data: () => ({
    colunasListarProfile: [
      {
        text: 'Ação',
        align: 'center',
        sortable: false,
        value: 'action',
        width: '100px'
      },
      {
        text: 'ID',
        align: 'left',
        sortable: true,
        value: 'id'
      },
      {
        text: 'Perfil',
        align: 'left',
        sortable: true,
        value: 'description'
      },
      {
        text: 'Observação',
        align: 'start',
        sortable: true,
        value: 'obs'
      }
    ],
    edicao: false,
    exibicao: false,
    filtro: {
      description: null
    },
    filtroEditar: {
      profileId: null
    },
    formulario: {
      id: null,
      description: null,
      obs: null
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
    modalItens: false,
    modalAviso: false,
    senhaExibir: '',
    store: {
      nome: 'paginaSettingsProfile',
      modulo: store
    },
    textoAviso: '',
    verSenha: false
  }),

  computed: {
    ...mapState('paginaSettingsProfile', [
      'profileList'
    ]),

    filtrosPreenchidos () {
      return Object.values(this.filtro).reduce((acumulador, atual) => !!acumulador || !!atual, false)
    }
  },

  watch: {
    modal (valor) {
      if (valor) {
        setTimeout(() => {
          this.$refs.login.focus()
        }, 100)
      }
    }
  },

  created () {
    this.listarProfile()
  },

  methods: {
    ...mapActions('paginaSettingsProfile', [
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

    async exibirRegistro (id) {
      this.loading = true

      let res = await this.exibir(id)

      if (!res.erro) {
        this.formulario = {
          id: res.id || null,
          description: res.description || null,
          obs: res.obs || null
        }

        this.exibicao = true
        this.inserir = false
        this.modal = true
      }

      this.loading = false
    },

    async listarProfile () {
      this.loading = true

      await this.listar({
        filtro: {
          description: this.filtro.description || undefined
        }
      })

      this.loading = false
    },

    resetFormulario () {
      this.edicao = false
      this.exibicao = false
      this.textoAviso = ''
      this.modalAviso = false

      this.filtro = {
        description: null
      }
      this.formulario = {
        id: null,
        description: null,
        obs: null
      }
      this.filtroEditar = {
        profileId: null
      }
      this.inserir = false
      this.loading = false
      this.modal = false
      this.opcoesRelacionadas = []
      this.listarProfile()
    },

    async salvarRegistro () {
      if (await this.$refs.observer.validate()) {
        this.loading = true

        let form = {
          id: this.formulario.id || null,
          description: this.formulario.description || null,
          obs: this.formulario.obs || null
        }

        let res = ''

        if (!form.id) res = await this.salvarProfile(form)
        else res = await this.editarProfile(form)

        if (res.mensagem) {
          this.resetFormulario()
        } else if (res.erro) {
          this.$refs.observer.setErrors(res.erro)
        }

        this.loading = false
      }
    }
  }
}
</script>
