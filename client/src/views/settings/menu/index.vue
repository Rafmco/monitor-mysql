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
    subtitulo="Menus do Sistema"
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
                  name="Menu"
                  rules="required|max:100"
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
                    label="Menu"
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
                  name="Descrição"
                  rules="required"
                  vid="description"
                >
                  <v-text-field
                    v-model="formulario.description"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    class="required"
                    dense
                    outlined
                    label="Descrição"
                  />
                </validation-provider>
              </v-col>
              <v-col
                cols="12"
                lg="3"
                md="3"
                xs="3"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="URL"
                  rules="required|max:100"
                  vid="url"
                >
                  <v-text-field
                    v-model="formulario.url"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    class="required"
                    dense
                    outlined
                    label="URL"
                  />
                </validation-provider>
              </v-col>
              <v-col
                cols="12"
                lg="3"
                md="3"
                xs="3"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Icon"
                  rules="required"
                  vid="type"
                >
                  <v-text-field
                    v-model="formulario.icon"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    class="required"
                    dense
                    outlined
                    label="Icon"
                  />
                </validation-provider>
              </v-col>
              <v-col
                cols="12"
                lg="1"
                md="1"
                xs="1"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Ordem"
                  rules="required|numeric"
                  vid="order"
                >
                  <v-text-field
                    v-model="formulario.order"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    class="required"
                    dense
                    outlined
                    label="Ordem"
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
                  name="ID Menu Pai"
                  rules="numeric"
                  vid="parent_id"
                >
                  <v-text-field
                    v-model="formulario.parent_id"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    outlined
                    label="ID Menu Pai"
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
        @limparFiltros="filtro.name = null, filtro.profileId = null, listarMenu()"
        @pesquisar="listarMenu()"
      >
        <template slot="conteudo">
          <v-row
            class="mx-2 my-0"
            dense
          >
            <v-col
              cols="12"
              lg="4"
              md="4"
              xs="12"
            >
              <v-text-field
                v-model="filtro.name"
                auto-focus
                clearable
                dense
                hide-details
                outlined
                label="Menu"
                @click:clear="filtro.name = null, listarMenu()"
                @keydown.enter="listarMenu()"
                @input="(val) => listarMenu()"
              />
            </v-col>
          </v-row>
        </template>
      </filtro>
      <tabela
        v-if="!modal"
        :colunas="colunasMenu"
        :loading="loading"
        :registros="menuList"
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
  name: 'PaginaSettingsMenu',

  data: () => ({
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
        align: 'left',
        sortable: true,
        value: 'id'
      },
      {
        text: 'Menu',
        align: 'left',
        sortable: true,
        value: 'name'
      },
      {
        text: 'Descrição',
        align: 'start',
        sortable: true,
        value: 'description'
      },
      {
        text: 'URL',
        align: 'center',
        sortable: true,
        value: 'url'
      },
      {
        text: 'Icon',
        align: 'center',
        sortable: true,
        value: 'icon'
      },
      {
        text: 'Ordem',
        align: 'center',
        sortable: true,
        value: 'order'
      },
      {
        text: 'ID Menu Pai',
        align: 'center',
        sortable: true,
        value: 'parent_id'
      }
    ],
    edicao: false,
    exibicao: false,
    filtro: {
      profileId: null,
      name: null
    },
    filtroEditar: {
      profileId: null
    },
    formulario: {
      id: null,
      name: null,
      description: null,
      url: null,
      icon: null,
      order: null,
      parent_id: null
    },
    inserir: false,
    loading: false,
    modal: false,
    modalItens: false,
    modalAviso: false,
    store: {
      nome: 'paginaSettingsMenu',
      modulo: store
    },
    textoAviso: '',
    verSenha: false
  }),

  computed: {
    ...mapState('paginaSettingsMenu', [
      'menuList'
    ]),

    filtrosPreenchidos () {
      return Object.values(this.filtro).reduce((acumulador, atual) => !!acumulador || !!atual, false)
    }
  },

  created () {
    this.listarMenu()
  },

  methods: {
    ...mapActions('paginaSettingsMenu', [
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
          name: res.name || null,
          description: res.description || null,
          url: res.url || null,
          icon: res.icon || null,
          order: res.order || null,
          parent_id: res.parent_id || null
        }

        this.profileMenu = res.profileMenu

        this.exibicao = true
        this.inserir = false
        this.modal = true
      }

      this.loading = false
    },

    async listarMenu () {
      this.loading = true

      await this.listar({
        filtro: {
          profileId: this.filtro.profileId || undefined,
          name: this.filtro.name || undefined
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
        profileId: null,
        name: null
      }
      this.formulario = {
        id: null,
        name: null,
        description: null,
        url: null,
        icon: null,
        order: null,
        parent_id: null
      }
      this.filtroEditar = {
        profileId: null
      }
      this.verSenha = false
      this.inserir = false
      this.loading = false
      this.modal = false
      this.listarMenu()
    },

    async salvarRegistro () {
      if (await this.$refs.observer.validate()) {
        this.loading = true

        let form = {
          id: this.formulario.id || undefined,
          name: this.formulario.name || undefined,
          description: this.formulario.description || undefined,
          url: this.formulario.url || undefined,
          icon: this.formulario.icon || undefined,
          order: this.formulario.order || undefined,
          parent_id: this.formulario.parent_id || undefined
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
    }
  }
}
</script>
