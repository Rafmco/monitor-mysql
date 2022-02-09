import axios from '@/plugins/axios'

export const listarUsersList = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/dashboard/usersList', {
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
