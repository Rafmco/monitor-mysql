const jwt = require('jsonwebtoken');

module.exports = app => {
  app.post('/login', app.src.auth.login.login)

  // Valida autenticação
  app.all('*', app.src.auth.verifyToken.verify)

  app.get('/profile/dropdown', app.src.controller.profile.dropdown)

  app.get('/user', app.src.controller.user.listar)
  app.get('/user/:id', app.src.controller.user.exibir)
  app.put('/user', app.src.controller.user.editar)
  app.post('/user', app.src.controller.user.salvar)
  app.delete('/user/:id', app.src.controller.user.deletar)

  app.get('/menu', app.src.controller.menu.listar)

  /***/
  app.get('/monitor/users/usersList', app.src.controller.monitor.users.usersList)

  app.get('/monitor/dashboard/hostInfo', app.src.controller.monitor.dashboard.hostInfo)
  app.get('/monitor/dashboard/instanceInfo', app.src.controller.monitor.dashboard.instanceInfo)
  app.get('/monitor/dashboard/usersList', app.src.controller.monitor.dashboard.usersList)
  app.get('/monitor/dashboard/dbSizeList', app.src.controller.monitor.dashboard.dbSizeList)
  app.get('/monitor/dashboard/processList', app.src.controller.monitor.dashboard.processList)
  app.get('/monitor/dashboard/connectionsCount', app.src.controller.monitor.dashboard.connectionsCount)
  app.get('/monitor/dashboard/bytesCount', app.src.controller.monitor.dashboard.bytesCount)
  app.get('/monitor/dashboard/statementsCount', app.src.controller.monitor.dashboard.statementsCount)

  app.get('/monitor/variables/systemVariablesList', app.src.controller.monitor.variables.systemVariablesList)

  app.get('/monitor/events/eventsList', app.src.controller.monitor.events.eventsList)
}