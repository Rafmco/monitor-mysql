import '@mdi/font/css/materialdesignicons.css'
import '@/plugins/axios'
import '@/plugins/crypto'
import '@/plugins/dayjs'
import '@/plugins/notificacao'
import '@/plugins/registrar_modulo'
import '@/plugins/validate'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import App from './App.vue'
import Chart from 'chart.js'
import Chartkick from 'vue-chartkick'
import VUppercase from '@tiig/v-uppercase'
import Vue from 'vue'
import { mask } from 'vue-the-mask'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.component('aviso', () => import('./components/aviso'))
Vue.component('chartkick', () => import('./components/chartkick'))
Vue.component('filtro', () => import('./components/filtro'))
Vue.component('loading', () => import('./components/loading'))
Vue.component('modal', () => import('./components/modal'))
Vue.component('notificacao', () => import('./components/notificacao'))
Vue.component('pagina', () => import('./components/pagina'))
Vue.component('tabela', () => import('./components/tabela'))
Vue.component('v-style', {
  render: function (createElement) {
    return createElement('style', { attrs: { lang: 'scss' } }, this.$slots.default)
  }
})

Vue.use(Chartkick.use(Chart))

Vue.mixin({
  created () {
    if (this.store) {
      this.$registrarModulo(this.store.nome, this.store.modulo)
    }
  },
  methods: {
    mascara (parametro = 'T', tamanho = 50) {
      let mascara = []

      for (let index = 1; index <= tamanho; index++) {
        mascara.push(parametro)
      }

      mascara = mascara.join('')

      if (parametro !== 'A' && parametro !== 'G' && parametro !== 'T') return mascara
      else if (parametro === 'A') {
        return {
          mask: mascara,
          tokens: {
            'A': {
              pattern: /[a-zA-ZÀ-ú0-9]/
            }
          }
        }
      } else if (parametro === 'G') {
        return {
          mask: mascara,
          tokens: {
            'G': {
              pattern: /[a-zA-Zà-ùÀ-Ú\s]/,
              transform: (v) => {
                return v.toLocaleUpperCase()
              }
            }
          }
        }
      } else {
        return {
          mask: mascara,
          tokens: {
            'T': {
              pattern: /./,
              transform: (v) => {
                return v.toLocaleUpperCase()
              }
            }
          }
        }
      }
    }
  }
})

Vue.directive('mask', mask)

Vue.use(VUppercase)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
