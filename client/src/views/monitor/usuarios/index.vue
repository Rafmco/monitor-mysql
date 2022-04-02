<template>
  <pagina
    :loading="loading"
    :formulario.sync="modal"
    :editar-formulario="!exibicao && !inserir"
    :salvar="(!exibicao) && (inserir || edicao)"
    :mais-opcoes="edicao"
    titulo-toolbar="Monitoramento"
    titulo="Monitoramento"
    subtitulo="Usuários"
    fechar
    @cancelar="resetFormulario()"
    @editar="exibicao = false, edicao = true"
    @fechar="resetFormulario()"
    @salvar="salvar()"
  >
    <template slot="listagem">
      <v-card
        class="pt-0"
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
                  @limparFiltros="filtro.name = null, filtro.roles = null, listarUsers()"
                  @pesquisar="listarUsers()"
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
                        xs="2"
                      >
                        <v-autocomplete
                          v-model="filtro.roles"
                          :items="rolesDropdown"
                          clearable
                          dense
                          hide-details
                          item-text="description"
                          item-value="description"
                          outlined
                          label="Role"
                          placeholder="Roles"
                          @click:clear="filtro.roles = null, listarUsers()"
                          @keydown.enter="listarUsers()"
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
                          label="Nome do Usuário"
                          @click:clear="filtro.name = null, listarUsers()"
                          @keydown.enter="listarUsers()"
                        />
                      </v-col>
                    </v-row>
                  </template>
                </filtro>
                <tabela
                  :colunas="colunasUsersList"
                  :loading="loading"
                  :registros="filteredUsers"
                  :items-per-page="20"
                  titulo="Usuários"
                  toolbar-grid
                  class="ma-0"
                  dense
                  editar
                  v-on="on"
                  @editar="exibir($event)"
                />
                <!-- sem-paginacao -->
                <!-- sem-rodape -->
              </template>
              <span>Número de Lotes de instruções SQL que são recebidas pelo Servidor, por segundo.</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card>
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
                lg="2"
                md="2"
                xs="2"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="User"
                  rules="required|max:100"
                  vid="user"
                >
                  <v-text-field
                    ref="user"
                    v-model="formulario.user"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    class="required"
                    dense
                    outlined
                    label="User"
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
                  name="Host"
                  rules="required|max:100"
                  vid="host"
                >
                  <v-text-field
                    ref="host"
                    v-model="formulario.host"
                    :disabled="exibicao && !inserir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    class="required"
                    dense
                    outlined
                    label="Host"
                    @input="(val) => (formulario.host = formulario.host ? formulario.host.toUpperCase() : null)"
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
            <v-divider />
            <v-row
              dense
              class="mt-4"
            >
              <v-col>
                <v-textarea
                  ref="create"
                  v-model="formulario.create"
                  disabled
                  filled
                  outlined
                  no-resize
                  auto-grow
                  readonly
                  height="60"
                  label="Create"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-textarea
                  ref="grant"
                  v-model="formulario.grant"
                  disabled
                  filled
                  outlined
                  no-resize
                  auto-grow
                  readonly
                  height="60"
                  label="Grants"
                />
              </v-col>
            </v-row>
          </v-container>
        </validation-observer>
      </v-form>
    </template>
  </pagina>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import store from './store'

export default {
  name: 'PaginaMonitorUsers',

  data: () => ({
    colunasUsersList: [
      {
        align: 'center',
        sortable: false,
        value: 'action',
        width: '30px'
      },
      {
        text: 'Username',
        align: 'start',
        sortable: true,
        value: 'user'
      },
      {
        text: 'Hostname',
        align: 'start',
        sortable: true,
        value: 'host'
      },
      // {
      //   text: 'max_questions',
      //   align: 'start',
      //   sortable: true,
      //   value: 'max_questions'
      // },
      // {
      //   text: 'max_updates',
      //   align: 'start',
      //   sortable: true,
      //   value: 'max_updates'
      // },
      // {
      //   text: 'max_connections',
      //   align: 'start',
      //   sortable: true,
      //   value: 'max_connections'
      // },
      // {
      //   text: 'max_user_connections',
      //   align: 'start',
      //   sortable: true,
      //   value: 'max_user_connections',
      //   width: 345
      // },
      // {
      //   text: 'max_statement_time',
      //   align: 'start',
      //   sortable: true,
      //   value: 'max_statement_time',
      //   width: 345
      // },
      {
        text: 'Roles',
        align: 'start',
        sortable: true,
        value: 'admin_roles',
        width: 345
      },
      // {
      //   text: 'is_role',
      //   align: 'start',
      //   sortable: true,
      //   value: 'is_role'
      // },
      {
        text: 'Expired',
        align: 'start',
        sortable: true,
        value: 'password_expired'
      }
    ],
    loading: false,
    filtro: {
      roles: null,
      name: null
    },
    formulario: {
      user: null,
      host: null,
      password: null,
      create: null,
      grant: null
    },
    exibicao: false,
    edicao: false,
    inserir: false,
    modal: false,
    modalAviso: false,
    textoAviso: '',
    verSenha: false,
    store: {
      nome: 'paginaMonitorUsers',
      modulo: store
    }
  }),

  computed: {
    ...mapState('paginaMonitorUsers', [
      'rolesDropdown',
      'usersList',
      'showGrants',
      'showCreate'
    ]),

    filtrosPreenchidos () {
      return Object.values(this.filtro).reduce((acumulador, atual) => !!acumulador || !!atual, false)
    },

    filteredUsers () {
      let filteredList = this.usersList

      if (this.filtro.roles) {
        filteredList = filteredList.filter(item => {
          if (item.admin_roles) {
            return item.admin_roles.toLowerCase().includes(this.filtro.roles.toLowerCase())
          }
        })
      }

      if (this.filtro.name) {
        filteredList = filteredList.filter(item => {
          return item.user.toLowerCase().includes(this.filtro.name.toLowerCase())
        })
      }

      return filteredList
    }
  },

  created () {
    // this.listarRoles()
    // this.listarUsers()
    setTimeout(async () => {
      this.loading = true

      await this.listarRolesDropdown()
      await this.listarUsersList()

      this.loading = false
    }, 200)

    this.setIntervalProcess = setInterval(() => {
      this.refreshProcess()
    }, 10000)
  },

  methods: {
    ...mapActions('paginaMonitorUsers', [
      'listarUsersList',
      'listarRolesDropdown',
      'listarShowGrants',
      'listarShowCreate',
      'createUser',
      'dropUser'
    ]),

    async listarUsers () {
      this.loading = true

      await this.listarUsersList()

      this.loading = false
    },

    async listarRoles () {
      this.loading = true

      await this.listarRolesDropdown()

      this.loading = false
    },

    async exibir (user) {
      this.loading = true

      await this.listarShowCreate({
        user: user.user || undefined
      })

      await this.listarShowGrants({
        user: user.user || undefined,
        host: user.host || undefined
      })

      this.formulario = {
        user: user.user,
        host: user.host,
        password: null,
        create: Object.values(this.showCreate)[0],
        grant: Object.values(this.showGrants)[0]
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
          user: this.formulario.user || null,
          host: this.formulario.host || null,
          password: this.formulario.password ? this.$crypto(this.formulario.password, 'md5') : undefined
        }

        let res = ''

        res = await this.createUser(form)
        // if (!form.id) res = await this.createUser(form)
        // else res = await this.editar(form)

        // if (res.message) {
        this.resetFormulario()
        // } else
        if (res.erro) {
          this.$refs.observer.setErrors(res.erro)
        }

        this.loading = false
      }
    },

    async deletar () {
      this.loading = true

      let form = {
        user: this.formulario.user || null
      }

      let res = await this.dropUser(form)

      if (!res.erro) {
        this.resetFormulario()
      }

      this.loading = false
    },

    async refreshProcess (interval) {
      await this.listarUser()
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
        user: null,
        host: null,
        password: null,
        create: null,
        grant: null
      }
      this.filtroEditar = {
        profileId: null
      }
      this.inserir = false
      this.loading = false
      this.modal = false
      this.listarUsers()
    }
  }
}
</script>
