import axios from '@/plugins/axios'

export const listarSystemVariablesList = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/variables/systemVariablesList', {
      params: {
        ...filtro,
        server_id: JSON.parse(window.atob(localStorage.getItem('monitor-mysql:server')))
      }
    })

    if (!res.data.erro) {
      commit('systemVariablesList', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const setVariable = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/variables/setVariable', {
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
