import axios from '@/plugins/axios'

export const listarUsersList = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/users/usersList', {
      params: {
        ...filtro,
        server_id: JSON.parse(window.atob(localStorage.getItem('monitor-mysql:server')))
      }
    })

    if (!res.data.erro) {
      commit('usersList', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const listarRolesDropdown = async ({ commit }, dados) => {
  try {
    const res = await axios.get('monitor/users/rolesDropdown', {
      params: {
        server_id: JSON.parse(window.atob(localStorage.getItem('monitor-mysql:server')))
      }
    })

    if (!res.data.erro) {
      commit('rolesDropdown', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const listarShowCreate = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/users/showCreate', {
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

export const listarShowGrants = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/users/showGrants', {
      params: {
        ...filtro,
        server_id: JSON.parse(window.atob(localStorage.getItem('monitor-mysql:server')))
      }
    })

    if (!res.data.erro) {
      commit('showGrants', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const createUser = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/users/createUser', {
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

export const dropUser = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/users/dropUser', {
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
