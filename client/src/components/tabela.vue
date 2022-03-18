<template>
  <v-data-table
    :dense="dense"
    :disable-pagination="semPaginacao || semRodape"
    :footer-props="{
      'items-per-page-options':[5, 10, 15, 20, 50]
    }"
    :items-per-page="itemsPerPage"
    :headers="colunas"
    :height="height"
    :hide-default-footer="semRodape"
    :hide-default-header="semCabecalho"
    :items="registros"
    :options.sync="options"
    :server-items-length="paginacao ? paginacao.totalRegistros : undefined"
    :style="maxHeight ? `max-height: ${maxHeight}px; border-radius: 0px; !important;` : 'border-radius: 0px; !important;' "
    class="elevation-3"
    fixed-header
    :group-by="groupby"
    :show-expand="expand"
    :loading="loading"
    @pagination="efetuarPaginacao($event)"
  >
    <template v-slot:top>
      <v-toolbar
        v-if="toolbarGrid"
        color="primary"
        dark
        flat
        height="35"
      >
        <v-toolbar-title
          class="subtitle-1 pa-0 ma-0 font-weight-bold"
        >
          {{ titulo }}
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        />
        <div class="flex-grow-1" />
        <v-spacer />
        <v-btn
          v-if="btnEditar"
          color="secondary"
          dark
          small
          @click="$emit('btnEditar')"
        >
          <v-icon
            size="20"
            left
          >
            mdi-pencil
          </v-icon>
          Editar Itens
        </v-btn>
      </v-toolbar>
      <v-card>
        <slot name="cabecalho" />
      </v-card>
      <v-divider v-if="toolbarGrid" />
    </template>
    <template v-slot:item.calibrar="{ item }">
      <v-icon
        v-if="visualizar"
        :small="dense"
        color="secondary"
        class="ml-2 mr-3"
        @click="$emit('calibrar', item.id)"
      >
        mdi-palette
      </v-icon>
    </template>
    <template v-slot:item.color="{ item }">
      <v-icon
        v-if="editar"
        :small="dense"
        :color="item.color"
        class="ml-2 mr-3"
      >
        mdi-palette
      </v-icon>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        v-if="visualizar"
        :small="dense"
        color="secondary"
        class="ml-2 mr-3"
        @click="$emit('visualizar', item.id)"
      >
        mdi-eye
      </v-icon>
      <v-icon
        v-if="editar"
        :small="dense"
        class="ml-2 mr-3"
        color="secondary"
        @click="$emit('editar', item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        v-if="excluir"
        :small="dense"
        class="ml-2 mr-3"
        color="error"
        @click="$emit('excluir', item.id)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template
      v-if="totalGrid"
      v-slot:body.append
    >
      <tr
        v-if="totalGrid"
        bgcolor="#EEEEEE"
      >
        <td
          v-if="totalGrid && totalField"
          class="text-right"
          :colspan="colunas.length"
        >
          <b>
            Total: {{ registros.reduce((a, b) => a + (b[totalField] || 0), 0) }}
          </b>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'ComponenteTabela',

  props: {
    btnEditar: {
      default: false,
      type: Boolean
    },
    colunas: {
      default: () => [],
      type: Array
    },
    groupby: {
      default: null,
      type: String
    },
    dense: {
      default: false,
      type: Boolean
    },
    excluir: {
      default: false,
      type: Boolean
    },
    editar: {
      default: false,
      type: Boolean
    },
    height: {
      default: '',
      type: String
    },
    maxHeight: {
      default: '',
      type: String
    },
    paginacao: {
      type: Object,
      default: () => {}
    },
    registros: {
      required: true,
      type: Array
    },
    semPaginacao: {
      default: false,
      type: Boolean
    },
    semCabecalho: {
      default: false,
      type: Boolean
    },
    semRodape: {
      default: false,
      type: Boolean
    },
    toolbarGrid: {
      default: false,
      type: Boolean
    },
    titulo: {
      default: '',
      type: String
    },
    totalGrid: {
      default: false,
      type: Boolean
    },
    totalField: {
      default: '',
      type: String
    },
    expand: {
      default: false,
      type: Boolean
    },
    loading: {
      default: false,
      type: Boolean
    },
    visualizar: {
      default: false,
      type: Boolean
    },
    itemsPerPage: {
      default: 10,
      type: Number
    }
  },

  data: () => ({
    options: {}
  }),

  methods: {
    efetuarPaginacao (paginacaoAtual) {
      this.$emit('paginacao', {
        pagina: paginacaoAtual.page,
        registros: paginacaoAtual.itemsPerPage >= 1 ? paginacaoAtual.itemsPerPage : undefined,
        ordenacao: this.options.sortBy[0] ? (this.options.sortBy[0].length ? this.options.sortBy[0] : undefined) : undefined,
        ordenacao_tipo: this.options.sortDesc ? this.options.sortDesc[0] === false ? 'asc' : 'desc' : undefined
      })
    }
  }
}
</script>

<style lang="scss">
.v-data-table td, .v-data-table th {
  padding-left: 8px !important;
  padding-right: 8px !important;
}
.v-data-table th {
  font-size: 12px !important;
}
.v-data-table td {
  font-size: 11px !important;
}
.v-data-footer, .v-data-footer__select, .v-data-footer__icons-before, .v-data-footer__icons-after {
  height: 40px !important;
  padding: 0px !important;
}
.detail-table tr {
  background-color: whitesmoke;
}
</style>
