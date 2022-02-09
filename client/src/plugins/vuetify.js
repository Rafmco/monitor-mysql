import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#075366',
        secondary: '#0C91B3',
        accent: '#56CCEA',
        error: '#eb2f06',
        info: '#265966',
        success: '#009C4D',
        warning: '#F2C037'
      }
    }
  },
  lang: {
    locales: { pt },
    current: 'pt'
  }
})
