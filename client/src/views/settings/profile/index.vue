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
    subtitulo="Perfis do Sistema"
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
                  rules="numeric"
                  vid="id"
                >
                  <v-text-field
                    ref="id"
                    v-model="formulario.id"
                    disabled
                    :error-messages="errors"
                    :hide-details="!errors.length"
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
                    @input="(val) => (formulario.description = formulario.description ? formulario.description.toUpperCase() : null)"
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

    <template slot="relacionamento">
      <tabela
        v-if="modal"
        :btn-editar="formulario.id && !edicaoItens"
        :colunas="colunasMenu"
        :desabilitado="!formulario.id || !edicaoItens"
        :loading="loading"
        :registros="profileMenu"
        excluir
        max-height="600"
        sem-paginacao
        sem-rodape
        toolbar-grid
        dense
        titulo="Menus do Perfil"
        @btnEditar="habilitaEdicaoItem()"
        @excluir="deletarMenus($event)"
      >
        <template slot="cabecalho">
          <v-form>
            <validation-observer
              ref="observerMenus"
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
                    xs="12"
                  >
                    <validation-provider
                      v-slot="{ errors }"
                      name="Menus do Perfil"
                      rules="required"
                      vid="menuId"
                    >
                      <v-autocomplete
                        ref="edicaoItensMenuId"
                        v-model="filtroEditar.menuId"
                        :disabled="exibicao && !edicaoItens"
                        :error-messages="errors"
                        :hide-details="!errors.length"
                        :items="menuDropdown"
                        auto-select-first
                        class="required"
                        dense
                        outlined
                        item-text="name"
                        item-value="id"
                        label="Menus do Perfil"
                      />
                    </validation-provider>
                  </v-col>
                  <v-col class="text-right">
                    <v-btn
                      v-if="!exibicao && !inserir || edicaoItens"
                      :disabled="!formulario.id"
                      color="primary"
                      dark
                      @click="salvarItens()"
                    >
                      <v-icon
                        size="20"
                        left
                      >
                        mdi-arrow-down-bold-box
                      </v-icon>
                      Adicionar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </validation-observer>
          </v-form>
        </template>
      </tabela>
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
                @click:clear="filtro.description = null, listarProfile()"
                @keydown.enter="listarProfile()"
                @input="(val) => (filtro.description = filtro.description ? filtro.description.toUpperCase() : null, listarProfile())"
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
    colunasMenu: [
      {
        text: 'Ação',
        align: 'center',
        sortable: false,
        value: 'action',
        width: '100px'
      },
      {
        text: 'ID',
        align: 'start',
        sortable: true,
        value: 'menu_id'
      },
      {
        text: 'Menu',
        align: 'start',
        sortable: true,
        value: 'menu_name'
      },
      {
        text: 'URL',
        align: 'start',
        sortable: true,
        value: 'menu_url'
      },
      {
        text: 'Menu Pai',
        align: 'start',
        sortable: true,
        value: 'menu_pai_name'
      }
    ],
    edicao: false,
    edicaoItens: false,
    exibicao: false,
    filtro: {
      description: null
    },
    filtroEditar: {
      menuId: null
    },
    formulario: {
      id: null,
      description: null,
      obs: null
    },
    inserir: false,
    loading: false,
    modal: false,
    modalItens: false,
    modalAviso: false,
    senhaExibir: '',
    profileMenu: [],
    store: {
      nome: 'paginaSettingsProfile',
      modulo: store
    },
    textoAviso: '',
    verSenha: false
  }),

  computed: {
    ...mapState('paginaSettingsProfile', [
      'profileList',
      'menuDropdown'
    ]),

    filtrosPreenchidos () {
      return Object.values(this.filtro).reduce((acumulador, atual) => !!acumulador || !!atual, false)
    }
  },

  created () {
    this.listarProfile()
  },

  methods: {
    ...mapActions('paginaSettingsProfile', [
      'listarMenuDropdown',
      'apagar',
      'apagarMenu',
      'editar',
      'exibir',
      'listar',
      'salvar',
      'salvarMenu'
    ]),

    async deletarRegistro () {
      this.loading = true

      let res = await this.apagar(this.formulario.id)

      if (!res.erro) {
        this.resetFormulario()
      }

      this.loading = false
    },

    async deletarMenus (id) {
      this.loading = true

      let res = await this.apagarMenu({
        profileId: this.formulario.id || undefined,
        menuId: id || undefined
      })

      if (!res.erro) this.exibirRegistro(this.formulario.id)

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

        this.profileMenu = res.menus

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

    habilitaEdicaoItem () {
      this.edicaoItens = true
      setTimeout(() => {
        this.$refs.edicaoItensMenuId.focus()
        this.listarMenu()
      }, 100)
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

    async salvarItens () {
      if (await this.$refs.observerMenus.validate()) {
        this.loading = true

        let res = await this.salvarMenu({
          menuId: this.filtroEditar.menuId || undefined,
          profileId: this.formulario.id || undefined
        })

        if (!res.erro) this.exibirRegistro(this.formulario.id)

        this.$refs.edicaoItensMenuId.focus()

        this.loading = false
      }
    },

    async listarMenu () {
      this.loading = true

      const menu = this.filtroEditar.menuId

      await this.listarMenuDropdown({
        filtro: {
          profileId: this.formulario.profileId || undefined
        }
      })

      this.filtroEditar.menuId = this.menuDropdown.find(b => b.id === menu) ? menu : null

      this.loading = false
    },

    resetFormulario () {
      this.edicao = false
      this.edicaoItens = false
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
        menuId: null
      }
      this.inserir = false
      this.loading = false
      this.modal = false
      this.listarProfile()
    }
  }
}
</script>
