import axios from '@/plugins/axios'

export const listarHostInfo = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/dashboard/hostInfo', {
      params: filtro
    })

    if (!res.data.erro) {
      commit('hostInfo', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const listarInstanceInfo = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/dashboard/instanceInfo', {
      params: filtro
    })

    if (!res.data.erro) {
      commit('instanceInfo', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const listarConnectedUsersList = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/dashboard/connectedUsersList', {
      params: filtro
    })

    if (!res.data.erro) {
      commit('connectedUsersList', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const listarDbSizeList = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/dashboard/dbSizeList', {
      params: filtro
    })

    if (!res.data.erro) {
      commit('dbSizeList', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const listarProcessList = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/dashboard/processList', {
      params: filtro
    })

    if (!res.data.erro) {
      commit('processList', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const listarConnectionsCount = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/dashboard/connectionsCount', {
      params: filtro
    })

    if (!res.data.erro) {
      commit('connectionsCount', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const listarBytesCount = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/dashboard/bytesCount', {
      params: filtro
    })

    if (!res.data.erro) {
      commit('bytesCount', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}

export const listarStatementsCount = async ({ commit }, filtro) => {
  try {
    const res = await axios.get('monitor/dashboard/statementsCount', {
      params: filtro
    })

    if (!res.data.erro) {
      commit('statementsCount', res.data)
    }

    return res.data
  } catch (error) {
    return error
  }
}
