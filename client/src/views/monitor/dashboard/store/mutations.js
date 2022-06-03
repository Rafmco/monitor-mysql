import day from '@/plugins/dayjs'

export default {
  hostInfo (state, param) {
    state.hostInfo = param
  },

  instanceInfo (state, param) {
    param.forEach(element => {
      element.up_since = day(element.up_since).format('DD/MM/YY HH:mm')
    })

    state.instanceInfo = param
  },

  connectedUsersList (state, param) {
    state.connectedUsersList = Object.values(param)
  },

  dbSizeList (state, param) {
    state.dbSizeList = Object.values(param)
  },

  processList (state, param) {
    state.processList = Object.values(param)
  },

  connectionsCount (state, param) {
    let aux = []
    let objDados = {}
    let obj = {}

    param.forEach(element => {
      // (Se Hora atual - 8 < Dia atual) ou (Se Hora >= (Hora atual - 8))
      if (day().subtract(8, 'hours').format('YYYY-MM-DD') < day().format('YYYY-MM-DD') || element.Hora >= day().subtract(8, 'hours').format('HH:mm')) {
        obj[day(element.Hora, 'HH:mm:ss').format('HH:mm')] = element.Value
      }
    })

    objDados['name'] = 'Connections Count'
    objDados['data'] = obj
    aux.push(objDados)

    state.connectionsCount = aux
  },

  bytesCount (state, param) {
    let aux = []
    let objDados = {}

    let objReceived = {}
    let objSent = {}

    param.forEach(element => {
      // (Se Hora atual - 8 < Dia atual) ou (Se Hora >= (Hora atual - 8))
      if (day().subtract(8, 'hours').format('YYYY-MM-DD') < day().format('YYYY-MM-DD') || element.Time >= day().subtract(8, 'hours').format('HH:mm')) {
        // obj[day(element.Time, 'HH:mm:ss').format('HH:mm')] = element.Value
        objReceived[element.Time] = element.bytes_received
        objSent[element.Time] = element.bytes_sent
      }
    })

    objDados['name'] = 'Bytes Received'
    objDados['data'] = objReceived
    aux.push(objDados)
    objDados = {}

    objDados['name'] = 'Bytes Sent'
    objDados['data'] = objSent
    aux.push(objDados)

    state.bytesCount = aux
  },

  statementsCount (state, param) {
    let aux = []
    let objDados = {}

    let objSelect = {}
    let objInsert = {}
    let objUpdate = {}
    let objDelete = {}

    param.forEach(element => {
      // (Se Hora atual - 8 < Dia atual) ou (Se Hora >= (Hora atual - 8))
      if (day().subtract(1, 'hours').format('YYYY-MM-DD') < day().format('YYYY-MM-DD') || element.Time >= day().subtract(1, 'hours').format('HH:mm')) {
        element.Time = element.Time ? day(element.Time, 'HH:mm:ss').format('HH:mm') : null

        objSelect[element.Time] = element.com_select
        objInsert[element.Time] = element.com_insert
        objUpdate[element.Time] = element.com_update
        objDelete[element.Time] = element.com_delete
      }
    })

    objDados['name'] = 'Select'
    objDados['data'] = objSelect
    aux.push(objDados)
    objDados = {}

    objDados['name'] = 'Insert'
    objDados['data'] = objInsert
    aux.push(objDados)
    objDados = {}

    objDados['name'] = 'Update'
    objDados['data'] = objUpdate
    aux.push(objDados)
    objDados = {}

    objDados['name'] = 'Delete'
    objDados['data'] = objDelete
    aux.push(objDados)

    state.statementsCount = aux
  },

  innoDbBufferPool (state, param) {
    param.forEach(element => {
      element.utilization = Math.trunc(element.utilization * 100) + '%'
    })

    state.innoDbBufferPool = param
  },

  reset: () => {}
}
