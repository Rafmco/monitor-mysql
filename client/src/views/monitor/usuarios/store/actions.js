import axios from '@/plugins/axios'

export const listarUsersList = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/users/usersList', {
      params: filtro
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
    const res = await axios.get('monitor/users/rolesDropdown')

    if (!res.data.erro) {
      commit('rolesDropdown', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const listarShowCreate = async ({ commit }, dados) => {
  try {
    const res = await axios.get('monitor/users/showCreate', {
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

export const listarShowGrants = async ({ commit }, dados) => {
  try {
    const res = await axios.get('monitor/users/showGrants', {
      params: dados
    })

    if (!res.data.erro) {
      commit('showGrants', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const createUser = async ({ commit }, dados) => {
  try {
    const res = await axios.get('monitor/users/createUser', {
      params: dados
    })

    return res.data
  } catch (error) {
    return error
  }
}

export const dropUser = async ({ commit }, dados) => {
  try {
    const res = await axios.get('monitor/users/dropUser', {
      params: dados
    })

    return res.data
  } catch (error) {
    return error
  }
}
