import axios from '@/plugins/axios'

export const listarEventsList = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/events/eventsList', {
      params: {
        ...filtro,
        server_id: JSON.parse(window.atob(localStorage.getItem('monitor-mysql:server')))
      }
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

export const listarShowCreate = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/events/showCreate', {
      params: {
        ...filtro,
        server_id: JSON.parse(window.atob(localStorage.getItem('monitor-mysql:server')))
      }
    })

    if (!res.data.erro) {
      commit('showCreate', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const createEvent = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/events/createEvent', {
      params: {
        ...filtro,
        server_id: JSON.parse(window.atob(localStorage.getItem('monitor-mysql:server')))
      }
    })

    return res.data
  } catch (error) {
    return error
  }
}
