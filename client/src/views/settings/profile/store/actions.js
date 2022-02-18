import axios from '@/plugins/axios'

export const apagar = async ({ commit, dispatch }, id) => {
  try {
    commit('setLoading', true)

    const res = await axios.delete('profile/' + id)

    if (res.data.mensagem) {
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

    const res = await axios.put('profile', dados)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const listar = async ({ commit }, parametros) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('profile', {
      params: parametros
    })

    if (!res.data.erro) {
      commit('profileList', res.data)
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const exibir = async ({ commit }, id) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('profile/' + id)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const salvar = async ({ commit }, dados) => {
  try {
    commit('setLoading', true)

    const res = await axios.post('profile', dados)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}
