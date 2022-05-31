<template>
  <v-card>
    <loading :loading="loading" />
    <v-card-text>
      <v-form>
        <validation-observer
          ref="observer"
          v-slot="{ validate }"
          tag="form"
        >
          <v-row dense>
            <v-col
              lg="6"
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
                  :value="login"
                  :error-messages="errors"
                  :hide-details="!errors.length"
                  append-icon="mdi-account"
                  class="required"
                  disabled
                  dense
                  label="Usuário"
                  outlined
                  placeholder="00000-USUARIO"
                  type="text"
                  @input="$emit('update:login', $event)"
                />
              </validation-provider>
            </v-col>
            <v-col
              lg="6"
              xs="12"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Senha Anterior"
                rules="required"
                vid="senhaAnterior"
              >
                <v-text-field
                  ref="senhaAnterior"
                  v-model="novaSenha.senhaAnterior"
                  :error-messages="errors"
                  :hide-details="!errors.length"
                  append-icon="mdi-lock"
                  class="required"
                  dense
                  label="Senha Anterior"
                  outlined
                  placeholder="****"
                  type="password"
                />
              </validation-provider>
            </v-col>
            <v-col
              lg="6"
              xs="12"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Nova Senha"
                rules="required"
                vid="novaSenha"
              >
                <v-text-field
                  ref="novaSenha"
                  v-model="novaSenha.novaSenha"
                  :error-messages="errors"
                  :hide-details="!errors.length"
                  append-icon="mdi-lock"
                  class="required"
                  dense
                  label="Nova Senha"
                  outlined
                  placeholder="****"
                  type="password"
                />
              </validation-provider>
            </v-col>
            <v-col
              lg="6"
              xs="12"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Confirmar Nova Senha"
                rules="required"
                vid="confirmacao"
              >
                <v-text-field
                  ref="confirmacao"
                  v-model="novaSenha.confirmacaoNovaSenha"
                  :error-messages="errors"
                  :hide-details="!errors.length"
                  append-icon="mdi-lock"
                  class="required"
                  dense
                  label="Confirmar Nova Senha"
                  outlined
                  placeholder="****"
                  type="password"
                />
              </validation-provider>
            </v-col>
          </v-row>
        </validation-observer>
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions class="pa-2">
      <v-spacer />
      <v-btn
        color="primary"
        darkk
        small
        @click="validarInformacoes()"
      >
        <v-icon
          left
          size="20"
        >
          mdi-content-save
        </v-icon>
        Confirmar
      </v-btn>
      <v-btn
        color="error"
        dark
        small
        @click="$refs.observer.reset(), $emit('update:modalAlterarSenha', false)"
      >
        <v-icon
          left
          size="20"
        >
          mdi-cancel
        </v-icon>
        Cancelar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ComponenteAlterarSenha',

  props: {
    login: {
      required: true,
      type: String
    }
  },

  data: () => ({
    loading: false,
    novaSenha: {
      senhaAnterior: '',
      novaSenha: '',
      confirmacaoNovaSenha: ''
    }
  }),

  watch: {
    modal (valor) {
      if (valor) {
        setTimeout(() => {
          this.$refa.senhaAnterior.focus()
        }, 100)
      }
    }
  },

  created () {
    setTimeout(() => {
      this.$refs.senhaAnterior.focus()
    }, 100)
  },

  methods: {
    ...mapActions('app', [
      'resetSenha'
    ]),
    async alterarSenha () {
      if (await this.$refs.observer.validate()) {
        this.loading = true

        let res = await this.resetSenha({
          login: this.login || undefined,
          senha: this.novaSenha.senhaAnterior ? this.$crypto(this.novaSenha.senhaAnterior, 'md5') : undefined,
          senhaNova: this.novaSenha.novaSenha ? this.$crypto(this.novaSenha.novaSenha, 'md5') : undefined,
          confirmacao: this.novaSenha.confirmacaoNovaSenha ? this.$crypto(this.novaSenha.confirmacaoNovaSenha, 'md5') : undefined
        })

        if (!res.erro) {
          this.$emit('proseguir')
        } else if (typeof res.erro === 'object') {
          this.$refs.observer.reset()

          Object.keys(res.erro).forEach(item => {
            this.$refs.alterarSenha.$refs.observer.setErrors(res.erro)
          })
        }

        this.loading = false
      }
    },
    async validarInformacoes () {
      if (await this.$refs.observer.validate()) {
        if (this.novaSenha.novaSenha === this.novaSenha.confirmacaoNovaSenha) {
          this.alterarSenha()
        } else {
          this.$refs.observer.setErrors({
            confirmacao: 'Senhas não conferem.'
          })
        }
      }
    }
  }
}
</script>
