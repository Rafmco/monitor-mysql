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

export const apagarMenu = async ({ commit }, dados) => {
  try {
    commit('setLoading', true)

    const res = await axios.post('profile/deletarMenu', dados)

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
      params: parametros.filtro
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

export const salvarMenu = async ({ commit }, dados) => {
  try {
    commit('setLoading', true)

    const res = await axios.post('profile/salvarMenu', dados)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const listarMenuDropdown = async ({ commit }, dados) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('menu/dropdown')

    if (!res.data.erro) {
      commit('menuDropdown', res.data)
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}
