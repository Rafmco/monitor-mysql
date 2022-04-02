import axios from '@/plugins/axios'

export const listarEventsList = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/events/eventsList', {
      params: filtro
    })

    if (!res.data.erro) {
      commit('eventsList', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const listarSchemasDropdown = async ({ commit }, dados) => {
  try {
    const res = await axios.get('monitor/schemas/schemasDropdown')

    if (!res.data.erro) {
      commit('schemasDropdown', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const listarShowCreate = async ({ commit }, dados) => {
  try {
    const res = await axios.get('monitor/events/showCreate', {
      params: dados
    })

    if (!res.data.erro) {
      commit('showCreate', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const createEvent = async ({ commit }, dados) => {
  try {
    const res = await axios.get('monitor/events/createEvent', {
      params: dados
    })

    return res.data
  } catch (error) {
    return error
  }
}
