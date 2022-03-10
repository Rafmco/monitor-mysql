<template>
  <!-- :editar-formulario="exibicao && !inserir" -->
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
    subtitulo="Usuários do Sistema"
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
                  name="Login"
                  rules="required|max:100"
                  vid="login"
                >
                  <v-text-field
                    ref="login"
                    v-model="formulario.login"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    class="required"
                    dense
                    outlined
                    label="Login"
                    @input="(val) => (formulario.login = formulario.login ? formulario.login.toUpperCase() : null)"
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
                  name="Nome"
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
                    label="Nome"
                    @input="(val) => (formulario.name = formulario.name ? formulario.name.toUpperCase() : null)"
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
                  name="Email"
                  rules="required|max:100"
                  vid="email"
                >
                  <v-text-field
                    ref="email"
                    v-model="formulario.email"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    class="required"
                    dense
                    outlined
                    label="Email"
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
                  name="Status"
                  rules="required"
                  vid="status"
                >
                  <v-autocomplete
                    v-model="formulario.status"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    :items="enabled"
                    auto-select-first
                    class="required"
                    dense
                    outlined
                    item-text="descricao"
                    item-value="item"
                    label="Status"
                  />
                </validation-provider>
              </v-col>
              <v-col
                cols="12"
                lg="3"
                md="3"
                xs="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Perfil"
                  rules="required"
                  vid="description"
                >
                  <v-autocomplete
                    v-model="formulario.profile_id"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    :items="profileDropdown"
                    class="required"
                    dense
                    outlined
                    data-vv-as="Perfil"
                    data-vv-name="profileId"
                    item-text="description"
                    item-value="id"
                    label="Perfil"
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
                  name="Senha"
                  rules="max:100"
                  vid="password"
                >
                  <v-text-field
                    v-model="formulario.password"
                    :append-icon="verSenha ? 'mdi-lock-open' : 'mdi-lock'"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    :type="verSenha ? 'text' : 'password'"
                    dense
                    outlined
                    label="Senha"
                    @click:append="verSenha = !verSenha"
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
        @limparFiltros="filtro.name = null, filtro.login = null, filtro.profileId = null, listarUser()"
        @pesquisar="listarUser()"
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
              <v-autocomplete
                v-model="filtro.profileId"
                :items="profileDropdown"
                clearable
                dense
                hide-details
                item-text="description"
                item-value="id"
                outlined
                label="Perfil"
                placeholder="Selecione um Perfil"
                @click:clear="filtro.profileId = null, listarUser()"
                @keydown.enter="listarUser()"
              />
            </v-col>
            <v-col
              cols="12"
              lg="3"
              md="3"
              xs="12"
            >
              <v-text-field
                v-model="filtro.login"
                auto-focus
                clearable
                dense
                hide-details
                outlined
                label="Login do Usuário"
                @click:clear="filtro.login = null, listarUser()"
                @keydown.enter="listarUser()"
                @input="(val) => (filtro.login = filtro.login ? filtro.login.toUpperCase() : null, listarUser())"
              />
            </v-col>
            <v-col
              cols="12"
              lg="6"
              md="6"
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
                @click:clear="filtro.name = null, listarUser()"
                @keydown.enter="listarUser()"
                @input="(val) => (filtro.name = filtro.name ? filtro.name.toUpperCase() : null, listarUser())"
              />
            </v-col>
          </v-row>
        </template>
      </filtro>
      <tabela
        v-if="!modal"
        :colunas="colunasListarUser"
        :loading="loading"
        :registros="userList"
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
  name: 'PaginaSettingsUser',

  data: () => ({
    colunasListarUser: [
      {
        text: 'Ação',
        align: 'center',
        sortable: false,
        value: 'action',
        width: '100px'
      },
      {
        text: 'Login',
        align: 'left',
        sortable: true,
        value: 'login'
      },
      {
        text: 'Nome',
        align: 'left',
        sortable: true,
        value: 'name'
      },
      {
        text: 'E-mail',
        align: 'start',
        sortable: true,
        value: 'email'
      },
      {
        text: 'Perfil',
        align: 'start',
        sortable: true,
        value: 'description'
      },
      {
        text: 'Status',
        align: 'center',
        sortable: true,
        value: 'status'
      }
    ],
    edicao: false,
    exibicao: false,
    filtro: {
      login: null,
      name: null,
      profileId: null
    },
    filtroEditar: {
      profileId: null
    },
    formulario: {
      id: null,
      login: null,
      name: null,
      email: null,
      status: null,
      profile_id: null,
      password: null
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
    senhaExibir: '',
    store: {
      nome: 'paginaSettingsUser',
      modulo: store
    },
    textoAviso: '',
    verSenha: false
  }),

  computed: {
    ...mapState('paginaSettingsUser', [
      'profileDropdown',
      'userList'
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
    this.listarUser()
  },

  methods: {
    ...mapActions('paginaSettingsUser', [
      'apagar',
      'editar',
      'exibir',
      'listar',
      'salvar',
      'listarProfileDropdown'
    ]),

    async deletarRegistro () {
      this.loading = true

      let res = await this.apagar(this.formulario.id)

      if (!res.erro) {
        this.resetFormulario()
      }

      this.loading = false
    },

    async listarUser () {
      this.loading = true

      await this.listar({
        filtro: {
          login: this.filtro.login || undefined,
          name: this.filtro.name || undefined,
          profileId: this.filtro.profileId || undefined
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
          login: res.login || null,
          name: res.name || null,
          email: res.email || null,
          status: res.status ? 1 : 0,
          profile_id: res.profile_id || null,
          password: null
        }

        this.senhaExibir = res.senha || null

        this.exibicao = true
        this.inserir = false
        this.modal = true
      }

      this.loading = false
    },

    async listarProfile () {
      this.loading = true

      const profile = this.filtroEditar.profileId

      await this.listarProfileDropdown({
        filtro: JSON.stringify({
          profileId: this.formulario.profileId || undefined
        })
      })

      this.filtroEditar.profileId = this.profileDropdown.find(b => b.id === profile) ? profile : null

      this.loading = false
    },

    async salvarRegistro () {
      if (await this.$refs.observer.validate()) {
        this.loading = true

        let form = {
          id: this.formulario.id || null,
          login: this.formulario.login || null,
          name: this.formulario.name || null,
          email: this.formulario.email || null,
          status: this.formulario.status ? 1 : 0,
          profile_id: this.formulario.profile_id || null,
          password: this.formulario.password ? this.$crypto(this.formulario.password, 'md5') : undefined
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
        login: null,
        name: null,
        profileId: null
      }
      this.formulario = {
        id: null,
        login: null,
        name: null,
        email: null,
        status: null,
        profile_id: null,
        password: null
      }
      this.filtroEditar = {
        profileId: null
      }
      this.senhaExibir = null
      this.verSenha = false
      this.inserir = false
      this.loading = false
      this.modal = false
      this.listarUser()
    }
  }
}
</script>
