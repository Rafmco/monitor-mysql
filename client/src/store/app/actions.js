import axios from '@/plugins/axios'

export const logarSistema = async ({ commit, state }, param) => {
  try {
    const res = await axios.post('login', {
      ...param
    })

    if (!res.data.erro) {
      localStorage.setItem('monitor-mysql:token', res.data.token)
      localStorage.setItem('monitor-mysql:nome', window.btoa(res.data.payload.name))
      localStorage.setItem('monitor-mysql:login', window.btoa(param.login))
      localStorage.setItem('monitor-mysql:profile', window.btoa(res.data.payload.profile_id))
      localStorage.setItem('monitor-mysql:server', window.btoa(res.data.payload.default_server_id))

      commit('app/login', param.login, { root: true })
      commit('app/nome', res.data.nome, { root: true })

      axios.defaults.headers['Authorization'] = 'Bearer ' + res.data.token
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const logout = async ({ commit }) => {
  try {
    localStorage.removeItem('monitor-mysql:token')
    localStorage.removeItem('monitor-mysql:nome')
    localStorage.removeItem('monitor-mysql:profile')
    localStorage.removeItem('monitor-mysql:server')

    axios.defaults.headers['Authorization'] = undefined
  } catch (error) {
    return error
  }
}

export const menus = async ({ commit }) => {
  try {
    const res = await axios.get('menu')

    if (!res.data.erro) {
      commit('menusUsuario', window.btoa(JSON.stringify(res.data)))
      // localStorage.setItem('monitor-mysql:rotas', window.btoa(JSON.stringify(res.data)))
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const listarServer = async ({ commit }) => {
  try {
    const res = await axios.get('login/server/' +
      JSON.parse(window.atob(localStorage.getItem('monitor-mysql:profile'))))

    if (!res.data.erro) {
      commit('server', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const resetSenha = async ({ commit }, param) => {
  try {
    const res = await axios.post('controle-acesso/autenticacao/alterar-senha', {
      ...param
    })

    return res.data
  } catch (error) {
    return error
  }
}

// export const listarAuditorias = async ({ commit }) => {
//   try {
//     const res = await axios.get('comuns/execucoes_auditorias/listarAuditorias')

//     if (!res.data.erro) commit('auditorias', res.data)

//     return res.data
//   } catch (error) {
//     return error
//   }
// }

// export const executarAuditorias = async ({ commit }, audit) => {
//   try {
//     axios.get(`auditorias/${audit.audit}/executar`)
//   } catch (error) {
//     return error
//   }
// }
