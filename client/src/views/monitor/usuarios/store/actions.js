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
