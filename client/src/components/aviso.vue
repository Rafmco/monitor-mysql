<template>
  <v-dialog
    v-if="modal"
    :value="modal"
    persistent
    width="430"
  >
    <v-card>
      <v-card-title class="pa-2 ml-2">
        <v-icon
          v-if="erro || alerta"
          :color="erro ? 'error' : 'warning'"
          class="display-1 mr-2"
          left
        >
          mdi-alert-circle-outline
        </v-icon>
        <v-icon
          v-if="aviso"
          class="display-1 mr-2"
          color="success"
          left
        >
          mdi-check-circle-outline
        </v-icon>
        <v-icon
          v-if="info"
          class="display-1 mr-2"
          color="primary"
          left
        >
          mdi-information-outline
        </v-icon>
        <span class="title">
          {{ titulo }}
        </span>
      </v-card-title>
      <v-divider class="divider-app mb-5" />
      <v-card-text v-if="cabecalho">
        <div class="subheading ml-3">
          <b>
            {{ cabecalho }}
          </b>
        </div>
      </v-card-text>
      <v-divider
        v-if="cabecalho"
        class="mb-5"
      />
      <v-card-text>
        <div
          v-if="typeof texto === 'string'"
          class="subheading"
          v-html="texto"
        >
          {{ texto }}
        </div>
        <div
          v-else-if="typeof texto === 'object'"
          class="subheading"
        >
          <v-list>
            <v-list-item
              v-for="(valor, indice) in texto"
              :key="indice"
              class="pa-0"
            >
              <v-list-item-action>
                <v-icon v-if="typeof valor === 'string'">
                  mdi-arrow-right-bold
                </v-icon>
                <v-icon
                  v-else-if="typeof valor === 'object' && valor.icone"
                  :color="valor.corIcone"
                >
                  {{ valor.icone }}
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title
                  v-if="typeof valor === 'string'"
                  v-html="valor"
                />
                <v-list-item-title
                  v-else-if="typeof valor === 'object' && valor.texto"
                  v-html="valor.texto"
                />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
        <div
          v-if="typeof textoSucesso === 'object'"
          class="subheading"
        >
          <v-list class="pa-0">
            <v-list-item
              v-for="(valor, indice) in textoSucesso"
              :key="indice"
              avatar
              class="pa-0"
            >
              <v-list-item-action>
                <v-icon color="green">
                  mdi-check-outline
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-html="valor" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
        <div
          v-if="typeof textoAviso === 'object'"
          class="subheading"
        >
          <v-list class="pa-0">
            <v-list-item
              v-for="(valor, indice) in textoAviso"
              :key="indice"
              avatar
              class="pa-0 ma-0"
            >
              <v-list-item-action>
                <v-icon color="orange">
                  mdi-alert-outline
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-html="valor" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
        <div
          v-if="typeof textoErro === 'object'"
          class="subheading"
        >
          <v-list class="pa-0">
            <v-list-item
              v-for="(valor, indice) in textoErro"
              :key="indice"
              avatar
              class="pa-0 ma-0"
            >
              <v-list-item-action>
                <v-icon color="error">
                  mdi-alert-circle-outline
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-html="valor" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
        <div
          v-if="typeof rodape === 'string'"
          class="subheading ml-3"
          v-html="rodape"
        >
          {{ rodape }}
        </div>
      </v-card-text>
      <v-divider />
      <v-card-actions class="pa-1">
        <span
          v-if="continuar"
          class="'font-weight-bold subheading text-xs-center pt-1 pl-2 ml-3'"
        >
          <b>Deseja continuar ?</b>
        </span>
        <span
          v-if="escolhaAcao"
          class="'font-weight-bold subheading text-xs-center pt-1 pl-2 ml-3'"
        >
          <b>Escolha a ação desejada.</b>
        </span>
        <v-spacer v-if="!voltarListagem" />
        <v-btn
          v-if="ok"
          :loading="loading"
          color="primary"
          dark
          small
          @click="$emit('ok')"
        >
          <v-icon left>
            mdi-check-circle-outline
          </v-icon>
          Ok
        </v-btn>
        <v-btn
          v-if="!ok"
          :loading="loading"
          :color="acaoBotao === 'Cancelar Registro' ? 'orange' : 'primary'"
          dark
          small
          @click="$emit('sim')"
        >
          <v-icon left>
            {{ acaoBotao === 'Reprocessar' ? 'mdi-cogs' : acaoBotao === 'Cancelar Registro' ? 'mdi-close-circle' : acaoBotao === 'Pular Registro' ? 'mdi-redo': 'mdi-check-circle-outline' }}
          </v-icon>
          {{ acaoBotao }}
        </v-btn>
        <v-btn
          v-if="!ok && !voltarListagem"
          :loading="loading"
          color="error"
          dark
          small
          @click="$emit('nao')"
        >
          <v-icon left>
            mdi-close-circle-outline
          </v-icon>
          Cancelar
        </v-btn>
        <v-spacer v-if="voltarListagem" />
        <v-btn
          v-if="voltarListagem"
          :loading="loading"
          color="primary"
          dark
          small
          @click="$emit('nao')"
        >
          <v-icon left>
            mdi-undo
          </v-icon>
          Voltar para Listagem
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ComponenteAviso',
  props: {
    acaoBotao: {
      default: 'Confirmar',
      type: String
    },
    alerta: {
      default: false,
      type: Boolean
    },
    aviso: {
      default: false,
      type: Boolean
    },
    cabecalho: {
      default: '',
      type: String
    },
    continuar: {
      default: false,
      type: Boolean
    },
    escolhaAcao: {
      default: false,
      type: Boolean
    },
    erro: {
      default: false,
      type: Boolean
    },
    icone: {
      default: '',
      type: String
    },
    info: {
      default: false,
      type: Boolean
    },
    loading: {
      default: false,
      type: Boolean
    },
    modal: {
      type: Boolean,
      required: true
    },
    ok: {
      default: false,
      type: Boolean
    },
    titulo: {
      required: true,
      type: String
    },
    texto: {
      required: true,
      type: [String, Array]
    },
    textoSucesso: {
      default: '',
      required: false,
      type: [String, Array]
    },
    textoAviso: {
      default: '',
      required: false,
      type: [String, Array]
    },
    textoErro: {
      default: '',
      required: false,
      type: [String, Array]
    },
    rodape: {
      default: '',
      required: false,
      type: String
    },
    voltarListagem: {
      default: false,
      type: Boolean
    }
  },
  mounted () {
    window.addEventListener('keydown', this.verificarTeclas)
  },
  destroyed () {
    window.removeEventListener('keydown', this.verificarTeclas)
  },
  methods: {
    verificarTeclas (event) {
      if (event.keyCode === 27) {
        this.$emit('nao')
      }
    }
  }
}
</script>
