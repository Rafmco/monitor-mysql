<template>
  <div class="text-center">
    <v-overlay
      :value="dialog"
      :opacity="0.12"
    >
      <div
        v-if="titulo"
        class="headline lighten-2 pa-3"
      >
        {{ titulo }}
      </div>
      <div class="pa-3 ma-0">
        <v-progress-circular
          :size="150"
          :width="10"
          color="primary"
          indeterminate
        >
          <div class="white--text font-weight-medium">
            Aguarde ...
          </div>
        </v-progress-circular>
      </div>
      <v-btn
        v-if="cancelar"
        block
        color="error"
        outlined
        text
        small
        @click="$emit('cancelar')"
      >
        <v-icon
          left
          size="28"
        >
          mdi-cancel
        </v-icon>
        Cancelar
      </v-btn>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: 'ComponenteLoading',

  props: {
    cancelar: {
      default: false,
      type: Boolean
    },
    loading: {
      required: true,
      type: Boolean
    },
    titulo: {
      default: null,
      type: String
    }
  },

  data: () => ({
    dialog: false
  }),

  watch: {
    loading (valor) {
      if (valor) {
        this.dialog = true
      } else {
        setTimeout(() => {
          this.dialog = false
        }, 200)
      }
    }
  }
}
</script>
