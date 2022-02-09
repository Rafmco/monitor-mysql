<template>
  <v-card
    :flat="flat"
    class="mt-2"
    style="border-radius: 0px !important;"
  >
    <v-card-text class="mb-0 pa-0">
      <v-expansion-panels flat>
        <v-expansion-panel
          ref="expand"
          class="filtro-expand"
          readonly
        >
          <v-expansion-panel-header
            :hide-actions="!maisFiltros"
            class="pa-0 ma-0"
            disable-icon-rotate
          >
            <slot name="conteudo" />
            <template v-slot:actions>
              <v-btn
                v-if="maisFiltros"
                color="primary"
                class="mr-2"
                style="height: 55px !important;"
                title="Mais Filtros"
                outlined
                @click="expandirMaisFiltros()"
              >
                <v-icon color="primary">
                  {{ iconeFiltrar }}
                </v-icon>
              </v-btn>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content
            key="1"
            :hide-actions="!maisFiltros"
          >
            <v-card>
              <v-card-text class="pa-0">
                <slot name="mais" />
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
    <v-divider class="divider-app" />
    <v-card-actions :class="flat ? 'pa-0 mb-0 mt-0' : 'pa-0 mb-4 mt-0'">
      <v-row
        class="ma-0 pa-0"
        dense
      >
        <v-col
          class="text-left"
          :lg="largura"
        >
          <slot name="botoes" />
          <v-btn
            v-if="pesquisar"
            :block="$vuetify.breakpoint.mdAndDown"
            :class="$vuetify.breakpoint.mdAndDown ? 'mr-2' : ''"
            class="mr-2"
            color="primary"
            title="Pesquisar Registros"
            elevation="0"
            small
            @click="$emit('pesquisar'), $refs.expand.isActive = false"
          >
            <v-icon left>
              mdi-magnify
            </v-icon>
            Pesquisar
          </v-btn>
          <v-btn
            v-if="processar"
            :block="$vuetify.breakpoint.mdAndDown"
            :class="$vuetify.breakpoint.mdAndDown ? 'mr-2' : ''"
            :disabled="desabilitarProcessar"
            :title="tituloProcessar"
            class="mr-2"
            color="primary"
            elevation="0"
            small
            @click="$emit('processar')"
          >
            <v-icon left>
              {{ iconeProcessar }}
            </v-icon>
            {{ tituloProcessar }}
          </v-btn>
          <v-btn
            v-if="visualizar"
            :block="$vuetify.breakpoint.mdAndDown"
            :class="$vuetify.breakpoint.mdAndDown ? 'mr-2' : ''"
            :disabled="desabilitarVisualizar"
            :title="tituloVisualizar"
            class="mr-2"
            color="orange"
            elevation="0"
            small
            @click="$emit('visualizar')"
          >
            <v-icon left>
              {{ iconeVisualizar }}
            </v-icon>
            {{ tituloVisualizar }}
          </v-btn>
          <v-btn
            v-if="pdf"
            :block="$vuetify.breakpoint.mdAndDown"
            :class="$vuetify.breakpoint.mdAndDown ? 'mr-2' : ''"
            :disabled="desabilitarPdf"
            class="mr-2"
            color="primary"
            elevation="0"
            small
            @click="$emit('pdf')"
          >
            <v-icon left>
              mdi-printer
            </v-icon>
            Impressão
          </v-btn>
          <v-btn
            v-if="excel"
            :block="$vuetify.breakpoint.mdAndDown"
            :class="$vuetify.breakpoint.mdAndDown ? 'mr-2' : ''"
            :disabled="desabilitarExcel"
            class="mr-2"
            color="primary"
            elevation="0"
            small
            @click="$emit('excel')"
          >
            <v-icon left>
              mdi-file-excel
            </v-icon>
            Excel
          </v-btn>
          <v-btn
            v-if="remover"
            :block="$vuetify.breakpoint.mdAndDown"
            :class="$vuetify.breakpoint.mdAndDown ? 'mr-2' : ''"
            class="mr-2"
            color="error"
            elevation="0"
            title="Remover"
            small
            @click="$emit('remover')"
          >
            <v-icon left>
              mdi-delete-outline
            </v-icon>
            Remover
          </v-btn>
        </v-col>
        <v-col class="text-right ">
          <v-btn
            v-if="limparFiltros"
            :block="$vuetify.breakpoint.mdAndDown"
            :class="$vuetify.breakpoint.mdAndDown ? 'mr-2 mb-3' : ''"
            class="mr-2"
            color="primary"
            elevation="0"
            title="Limpar Filtros"
            small
            @click="$emit('limparFiltros'), $refs.expand.isActive = false"
          >
            <v-icon left>
              mdi-filter-remove
            </v-icon>
            Limpar Filtro
          </v-btn>
          <v-btn
            v-if="adicionar"
            :block="$vuetify.breakpoint.mdAndDown"
            :class="$vuetify.breakpoint.lgAndDown ? 'mr-2' : ''"
            :title="tituloAdicionar"
            color="primary"
            elevation="0"
            small
            @click="$emit('adicionar')"
          >
            <v-icon left>
              mdi-plus
            </v-icon>
            {{ tituloAdicionar }}
          </v-btn>
          <v-btn
            v-if="personalizado1"
            :block="$vuetify.breakpoint.mdAndDown"
            :class="$vuetify.breakpoint.lgAndDown ? 'mr-2' : ''"
            :disabled="desabilitarPersonalizado1"
            :title="tituloPersonalizado1"
            color="primary"
            elevation="0"
            small
            @click="$emit('personalizado1')"
          >
            <v-icon left>
              mdi-check
            </v-icon>
            {{ tituloPersonalizado1 }}
          </v-btn>
          <v-btn
            v-if="personalizado2"
            :block="$vuetify.breakpoint.mdAndDown"
            :class="$vuetify.breakpoint.lgAndDown ? 'mr-2' : 'ml-2'"
            :disabled="desabilitarPersonalizado2"
            :title="tituloPersonalizado2"
            color="primary"
            elevation="0"
            small
            @click="$emit('personalizado2')"
          >
            <v-icon left>
              mdi-check
            </v-icon>
            {{ tituloPersonalizado2 }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
    <v-divider v-if="flat" />
  </v-card>
</template>

<script>
export default {
  name: 'ComponenteFiltroPadrao',
  props: {
    adicionar: {
      default: false,
      type: Boolean
    },
    desabilitarProcessar: {
      default: false,
      type: Boolean
    },
    desabilitarExcel: {
      default: false,
      type: Boolean
    },
    desabilitarPdf: {
      default: false,
      type: Boolean
    },
    desabilitarPersonalizado1: {
      default: false,
      type: Boolean
    },
    desabilitarPersonalizado2: {
      default: false,
      type: Boolean
    },
    desabilitarVisualizar: {
      default: false,
      type: Boolean
    },
    excel: {
      default: false,
      type: Boolean
    },
    flat: {
      default: false,
      type: Boolean
    },
    iconeProcessar: {
      default: 'mdi-cogs',
      type: String
    },
    iconeFiltrar: {
      default: 'mdi-filter-plus',
      type: String
    },
    iconeVisualizar: {
      default: 'mdi-eye-outline',
      type: String
    },
    limparFiltros: {
      default: false,
      type: Boolean
    },
    maisFiltros: {
      default: false,
      type: Boolean
    },
    pesquisar: {
      default: false,
      type: Boolean
    },
    pdf: {
      default: false,
      type: Boolean
    },
    processar: {
      default: false,
      type: Boolean
    },
    personalizado1: {
      default: false,
      type: Boolean
    },
    personalizado2: {
      default: false,
      type: Boolean
    },
    remover: {
      default: false,
      type: Boolean
    },
    semTabela: {
      default: false,
      type: Boolean
    },
    tituloProcessar: {
      default: 'Processar',
      type: String
    },
    tituloAdicionar: {
      default: 'Adicionar',
      type: String
    },
    tituloPersonalizado1: {
      default: 'Personalizado',
      type: String
    },
    tituloPersonalizado2: {
      default: 'Personalizado',
      type: String
    },
    tituloVisualizar: {
      default: 'Visualizar',
      type: String
    },
    visualizar: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    largura () {
      let espaco = []

      if (this.pesquisar) espaco.push('pesquisar')
      if (this.processar) espaco.push('processar')
      if (this.visualizar) espaco.push('visualizar')
      if (this.pdf) espaco.push('pdf')
      if (this.excel) espaco.push('excel')
      if (this.remover) espaco.push('remover')

      let qtd = espaco.length * 2

      return qtd
    }
  },
  methods: {
    expandirMaisFiltros () {
      this.$refs.expand.isActive = !this.$refs.expand.isActive
    }
  }
}
</script>

<style lang="scss">
  .filtro-expand {
    .v-expansion-panel__header {
      padding: 8px !important;
    }
  }
</style>
