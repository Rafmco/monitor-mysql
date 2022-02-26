<template>
  <div>
    <loading :loading="loading" />
    <!-- Título -->
    <v-container
      v-if="titulo && subtitulo"
      class="pa-2 pb-2 elevation-2"
      fluid
      grid-list-md
      style="background: #fff !important;"
    >
      <div class="subtitle-1 font-weight-regular">
        <v-row
          no-gutters
          align="center"
        >
          {{ titulo }} |
          <v-col
            class="pl-2 pt-1 subtitle-2 font-weight-bold"
            align="start"
          >
            {{ subtitulo }}
          </v-col>
          <v-col
            class="d-flex flex-nowrap flex-row-reverse pt-1 subtitle-2 font-weight-light"
          >
            {{ infoAdic }}
          </v-col>
        </v-row>
      </div>
    </v-container>

    <v-divider
      v-if="titulo && subtitulo"
      class="divider-app"
    />

    <v-row dense>
      <v-col :cols="$vuetify.breakpoint.width < 1380 ? 12 : cols">
        <!-- Listagem -->
        <v-container
          v-if="!formulario"
          class="mt-0 pt-0"
          fluid
          grid-list-xs
        >
          <slot name="listagem" />
        </v-container>

        <!-- Formulário -->
        <v-container
          :class="formulario ? 'pt-4 pb-0 mb-0' : 'pt-0 pb-0 mb-0'"
          fluid
          grid-list-xs
        >
          <v-card
            v-if="formulario && !calibrar"
            class="elevation-3"
            style="border-radius: 0px; !important;"
          >
            <v-toolbar
              color="primary"
              dark
              flat
              height="45"
            >
              <v-toolbar-title>
                <v-btn
                  v-if="fechar"
                  icon
                  @click="$emit('fechar')"
                >
                  <v-icon
                    pl-3
                    dark
                  >
                    mdi-close
                  </v-icon>
                </v-btn>
                {{ tituloFormulario }}
              </v-toolbar-title>
              <v-spacer />
              <v-menu
                v-if="maisOpcoes"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    :loading="loading"
                    color="white darken-3"
                    dark
                    outlined
                    v-on="on"
                  >
                    <v-icon left>
                      mdi-dots-vertical
                    </v-icon>
                    Mais Opções
                  </v-btn>
                </template>
                <slot name="maisOpcoes" />
              </v-menu>
              <slot name="opcoes" />
            </v-toolbar>
            <v-card-text class="pa-0">
              <slot name="formulario" />
            </v-card-text>
            <v-divider />

            <v-card-actions
              class="pa-1"
            >
              <v-row
                class="pa-0"
                dense
              >
                <v-col
                  :class="$vuetify.breakpoint.xsOnly ? 'px-0 py-0 text-center' : 'px-0 py-0'"
                  cols="12"
                  lg="3"
                  md="2"
                  sm="3"
                  xs="12"
                >
                  <span class="caption pl-2">
                    <span class="red--text">*</span> são obrigatórios.
                  </span>
                </v-col>
                <v-spacer />
                <v-col
                  cols="12"
                  class="text-right py-0"
                  lg="9"
                  md="10"
                  sm="9"
                  xs="12"
                >
                  <slot name="acao" />
                  <v-btn
                    v-if="!salvar && !editarFormulario"
                    :block="$vuetify.breakpoint.xsOnly"
                    :class="$vuetify.breakpoint.xsOnly ? 'my-1' : 'mx-1'"
                    color="primary"
                    dark
                    small
                    @click="$emit('editar')"
                  >
                    <v-icon
                      left
                      size="20"
                    >
                      mdi-pencil
                    </v-icon>
                    Editar
                  </v-btn>
                  <v-btn
                    v-if="salvar"
                    :block="$vuetify.breakpoint.xsOnly"
                    :class="$vuetify.breakpoint.xsOnly ? 'my-1' : 'mx-1'"
                    color="primary"
                    dark
                    small
                    @click="$emit('salvar')"
                  >
                    <v-icon
                      left
                      size="20"
                    >
                      mdi-content-save
                    </v-icon>
                    Salvar
                  </v-btn>
                  <v-btn
                    v-if="cancelar"
                    :block="$vuetify.breakpoint.xsOnly"
                    color="error"
                    dark
                    small
                    @click="$emit('cancelar')"
                  >
                    <v-icon
                      left
                      size="20"
                    >
                      mdi-cancel
                    </v-icon>
                    Cancelar
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-container>

        <!-- Calibration -->
        <v-container
          :class="formulario ? 'pt-4 pb-0 mb-0' : 'pt-0 pb-0 mb-0'"
          fluid
          grid-list-xs
        >
          <v-card
            v-if="formulario && calibrar"
            class="elevation-3"
            style="border-radius: 0px; !important;"
          >
            <v-toolbar
              color="primary"
              dark
              flat
              height="45"
            >
              <v-toolbar-title>
                <v-btn
                  v-if="fechar"
                  icon
                  @click="$emit('fechar')"
                >
                  <v-icon
                    pl-3
                    dark
                  >
                    mdi-close
                  </v-icon>
                </v-btn>
                {{ tituloFormulario }}
              </v-toolbar-title>
              <v-spacer />
              <v-menu
                v-if="maisOpcoes"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    :loading="loading"
                    color="white darken-3"
                    dark
                    outlined
                    v-on="on"
                  >
                    <v-icon left>
                      mdi-dots-vertical
                    </v-icon>
                    Mais Opções
                  </v-btn>
                </template>
                <slot name="maisOpcoes" />
              </v-menu>
            </v-toolbar>
            <v-card-text class="pa-0">
              <slot name="relacionamento" />
            </v-card-text>
            <v-divider />

            <v-card-actions
              v-if="salvar || editarRelacionamento"
              class="pa-1"
            >
              <v-row
                class="pa-0"
                dense
              >
                <v-col
                  :class="$vuetify.breakpoint.xsOnly ? 'px-0 py-0 text-center' : 'px-0 py-0'"
                  cols="12"
                  lg="3"
                  md="2"
                  sm="3"
                  xs="12"
                >
                  <span class="caption pl-2">
                    <span class="red--text">*</span> são obrigatórios.
                  </span>
                </v-col>
                <v-spacer />
                <v-col
                  cols="12"
                  class="text-right py-0"
                  lg="9"
                  md="10"
                  sm="9"
                  xs="12"
                >
                  <slot name="acao" />
                  <v-btn
                    v-if="salvar"
                    :block="$vuetify.breakpoint.xsOnly"
                    :class="$vuetify.breakpoint.xsOnly ? 'my-1' : 'mx-1'"
                    color="primary"
                    dark
                    small
                    @click="$emit('salvar')"
                  >
                    <v-icon
                      left
                      size="20"
                    >
                      mdi-content-save
                    </v-icon>
                    Salvar
                  </v-btn>
                  <v-btn
                    v-if="cancelar"
                    :block="$vuetify.breakpoint.xsOnly"
                    color="error"
                    dark
                    small
                    @click="$emit('cancelar')"
                  >
                    <v-icon
                      left
                      size="20"
                    >
                      mdi-cancel
                    </v-icon>
                    Cancelar
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ComponentePagina',

  props: {
    loading: {
      default: false,
      type: Boolean
    },
    titulo: {
      default: '',
      type: String
    },
    subtitulo: {
      default: '',
      type: String
    },
    infoAdic: {
      default: '',
      type: String
    },
    cols: {
      default: 12,
      type: Number
    },

    formulario: {
      required: true,
      type: Boolean
    },
    calibrar: {
      default: false,
      type: Boolean
    },
    fechar: {
      default: false,
      type: Boolean
    },
    tituloFormulario: {
      default: '',
      type: String
    },
    tituloRelacionamento: {
      default: '',
      type: String
    },

    maisOpcoes: {
      default: false,
      type: Boolean
    },

    editarFormulario: {
      default: true,
      type: Boolean
    },
    editarRelacionamento: {
      default: true,
      type: Boolean
    },
    cancelar: {
      default: true,
      type: Boolean
    },
    salvar: {
      default: true,
      type: Boolean
    }
  }
}
</script>
