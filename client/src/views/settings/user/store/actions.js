import axios from '@/plugins/axios'
// import exibirFormulario from '@/plugins/exibir_formulario'

export const apagar = async ({ commit, dispatch }, id) => {
  try {
    commit('setLoading', true)

    const res = await axios.delete('user/' + id)

    if (res.data.mensagem) {
      // commit('setExibirFormulario', null)
      commit('setDadosExibir', {})
      dispatch('listar')
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const editar = async ({ commit }, dados) => {
  try {
    commit('setLoading', true)

    const res = await axios.put('user', dados)

    // if (res.data.mensagem) {
    //   commit('setExibirFormulario', null)
    // }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const listar = async ({ commit }, parametros) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('user', {
      params: parametros.filtro
    })

    if (!res.data.erro) {
      commit('userList', res.data)
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const exibir = async ({ commit }, id) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('user/' + id)

    // if (!res.data.erro) {
    //   commit('userList', res.data.registro)
    //   // commit('setExibirFormulario', exibirFormulario.exibir)
    // }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const salvar = async ({ commit }, dados) => {
  try {
    commit('setLoading', true)

    const res = await axios.post('user', dados)

    // if (res.data.mensagem) commit('setExibirFormulario', null)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const listarProfileDropdown = async ({ commit }, dados) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('profile/dropdown')

    if (!res.data.erro) {
      commit('profileDropdown', res.data)
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}
