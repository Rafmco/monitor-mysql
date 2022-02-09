import Vue from 'vue'
import crypto from 'crypto'

const hash = (senha, tipo) => {
  return crypto.createHash(tipo).update(senha).digest('hex').toUpperCase()
}

Vue.prototype.$crypto = hash

export default hash
