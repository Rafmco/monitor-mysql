import axios from '@/plugins/axios'

export const listarSystemVariablesList = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/variables/systemVariablesList', {
      params: filtro
    })

    if (!res.data.erro) {
      commit('systemVariablesList', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}
