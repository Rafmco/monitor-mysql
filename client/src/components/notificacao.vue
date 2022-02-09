<template>
  <v-snackbar
    v-model="ativo"
    :color="notificacao.cor"
    :timeout="notificacao.tempo"
    app
    absolute
    multi-line
    style="z-index: 100 !important;"
    top
  >
    <v-icon
      dark
      size="30"
      left
    >
      {{ notificacao.icone }}
    </v-icon>
    {{ notificacao.mensagem }}

    <template v-slot:action="{ attrs }">
      <v-btn
        dark
        text
        v-bind="attrs"
        @click="ativo = false"
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'ComponenteNotificacao',

  computed: {
    ...mapState('app', [
      'notificacao'
    ]),
    ativo: {
      get () {
        return this.notificacao.ativo
      },
      set (valor) {
        if (!valor) {
          this.setNotificacao({
            ativo: false,
            cor: null,
            icone: null,
            mensagem: null,
            tempo: null
          })
        }
      }
    }
  },

  methods: {
    ...mapMutations('app', [
      'setNotificacao'
    ])
  }
}
</script>
