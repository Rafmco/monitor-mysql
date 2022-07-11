<template>
  <v-app
    id="inspire"
    class="textura-fundo"
  >
    <v-main
      class="d-flex align-self-center"
      justify="center"
    >
      <loading :loading="loading" />
      <modal
        v-if="modalAlterarSenha"
        :modal="modalAlterarSenha"
        largura="650px"
        titulo="Alterar Senha"
        @fechar="modalAlterarSenha = false"
      >
        <alterarSenha
          v-if="modalAlterarSenha"
          ref="alterarSenha"
          :login.sync="formulario.login"
          :modal-alterar-senha.sync="modalAlterarSenha"
          @proseguir="continuarLogin()"
        />
      </modal>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          class="fill-height"
          dense
          fuild
          justify="center"
        >
          <v-col
            align="center"
            cols="12"
            xs="12"
          >
            <v-expand-transition>
              <v-card
                v-show="expand"
                class="elevation-10 card-autenticacao align-center"
              >
                <v-card-text class="pa-0">
                  <v-form>
                    <validation-observer
                      ref="observer"
                      v-slot="{ validate }"
                    >
                      <v-row dense>
                        <v-col
                          class="titulo-login pa-4"
                          cols="12"
                        >
                          <span>
                            Monitor Mysql
                          </span>
                        </v-col>
                        <v-col
                          class="d-flex align-self-center card-logo"
                          cols="12"
                          lg="5"
                          sm="5"
                          xs="12"
                        >
                          <v-img
                            :src="logo"
                            aspect-ratio
                            class="card-logo"
                            max-width="180"
                          />
                        </v-col>
                        <v-col
                          :style="$vuetify.breakpoint.smAndUp ? 'border-left: 1px solid #ccc !important;' : ''"
                          class="pr-4 pl-4"
                          cols="12"
                          lg="7"
                          sm="7"
                          xs="12"
                        >
                          <v-row
                            class="mt-1"
                            :dense="$vuetify.breakpoint.smAndUp"
                          >
                            <v-col
                              cols="12"
                              lg="12"
                              xs="12"
                            >
                              <validation-provider
                                v-slot="{ errors }"
                                name="Login"
                                rules="required"
                                vid="login"
                              >
                                <v-text-field
                                  ref="login"
                                  v-model="formulario.login"
                                  :error-messages="errors"
                                  :hide-details="!errors.length"
                                  append-icon="mdi-account"
                                  class="required"
                                  label="Usuário"
                                  placeholder="USUARIO"
                                  type="text"
                                  @input="(val) => (formulario.login = formulario.login ? formulario.login.toUpperCase() : null)"
                                />
                              </validation-provider>
                            </v-col>
                            <v-col
                              cols="12"
                              lg="12"
                              xs="12"
                            >
                              <validation-provider
                                v-slot="{ errors }"
                                name="Senha"
                                rules="required"
                                vid="password"
                              >
                                <v-text-field
                                  ref="senha"
                                  v-model="formulario.senha"
                                  :error-messages="errors"
                                  :hide-details="!errors.length"
                                  append-icon="mdi-lock"
                                  class="required"
                                  label="Senha"
                                  placeholder="****"
                                  type="password"
                                  @keydown.enter="efetuarLogin()"
                                />
                              </validation-provider>
                            </v-col>
                          </v-row>
                          <v-row class="mt-1">
                            <v-col
                              class="pr-4"
                              cols="12"
                            >
                              <v-btn
                                color="primary"
                                block
                                dark
                                style="border-radius: 0px !important;"
                                @click="efetuarLogin()"
                              >
                                <v-icon left>
                                  mdi-login-variant
                                </v-icon>
                                Efetuar Login
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </validation-observer>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-expand-transition>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PaginaLoginUsuario',

  components: {
    alterarSenha: () => import('./components/alterar_senha')
  },

  data: () => ({
    expand: false,
    formulario: {
      login: '',
      senha: ''
    },
    loading: false,
    logo: require('@/assets/logo.png'),
    modalAlterarSenha: false
  }),

  // computed: {
  //   ...mapState('app', [
  //     'empresas'
  //   ])
  // },

  created () {
    // this.listarEmpresasGrupo()

    setTimeout(() => {
      this.formulario.login = localStorage.getItem('monitor-mysql:login') ? window.atob(localStorage.getItem('monitor-mysql:login')) : ''
    }, 100)

    setTimeout(() => { this.expand = true }, 500)
    setTimeout(() => { this.$refs.senha.focus() }, 600)
  },

  methods: {
    ...mapActions('app', [
      // 'empresa',
      'logarSistema'
    ]),

    continuarLogin () {
      this.modalAlterarSenha = false
      this.formulario.senha = ''
      setTimeout(() => {
        this.$refs.senha.focus()
      }, 50)
    },

    cancelarAlterarSenha () {
      this.loading = false
      this.modalAlterarSenha = false
      this.resetFormulario()
    },

    async efetuarLogin () {
      if (await this.$refs.observer.validate()) {
        this.loading = true

        let res = await this.logarSistema({
          login: this.formulario.login || undefined,
          password: this.formulario.senha ? this.$crypto(this.formulario.senha, 'md5') : undefined
        })

        if (typeof res.erro === 'object') {
          this.$refs.observer.reset()

          Object.keys(res.erro).forEach(item => {
            this.$refs.observer.setErrors(res.erro)
          })
        } else if (res.senhaVencida) {
          this.modalAlterarSenha = true
        } else {
          this.$router.push('/')
        }

        this.loading = false
      }
    },
    // async listarEmpresasGrupo () {
    //   this.loading = true

    //   let res = await this.empresa({
    //     grupo: ('001')
    //   })

    //   if (!res.erro) {
    //     setTimeout(() => {
    //       // this.formulario.empresa = localStorage.getItem('monitor-mysql:empresa') ? window.atob(localStorage.getItem('monitor-mysql:empresa')) : 'MTZ'
    //       this.$refs.senha.focus()
    //     }, 50)
    //   }

    //   this.loading = false
    // },
    resetFormulario () {
      this.loading = false
      this.formulario = {
        login: '',
        senha: ''
        // empresa: ''
      }
      this.$refs.observer.reset()
      setTimeout(() => {
        this.$refs.senha.focus()
      }, 100)
    }
  }
}
</script>

<style lang="sass">
  @import '../../assets/css/app.scss'
</style>
