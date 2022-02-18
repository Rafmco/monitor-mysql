import axios from '@/plugins/axios'

export const apagar = async ({ commit, dispatch }, id) => {
  try {
    commit('setLoading', true)

    const res = await axios.delete('menu/' + id)

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

    const res = await axios.put('menu', dados)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const listar = async ({ commit }, parametros) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('menu', {
      params: parametros
    })

    if (!res.data.erro) {
      commit('menuList', res.data)
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const exibir = async ({ commit }, id) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('menu/' + id)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const salvar = async ({ commit }, dados) => {
  try {
    commit('setLoading', true)

    const res = await axios.post('menu', dados)

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
