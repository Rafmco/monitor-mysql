const jwt = require('jsonwebtoken');

module.exports = app => {
  app.post('/login', app.src.auth.login.login)

  // Valida autenticação
  app.all('*', app.src.auth.verifyToken.verify)

  app.get('/menu',        app.src.controller.settings.menu.listar)
  app.get('/menu/:id',    app.src.controller.settings.menu.exibir)
  app.put('/menu',        app.src.controller.settings.menu.editar)
  app.post('/menu',       app.src.controller.settings.menu.salvar)
  app.delete('/menu/:id', app.src.controller.settings.menu.deletar)

  app.get('/profile/dropdown', app.src.controller.settings.profile.dropdown)
  app.get('/profile',          app.src.controller.settings.profile.listar)
  app.get('/profile/:id',      app.src.controller.settings.profile.exibir)
  app.put('/profile',          app.src.controller.settings.profile.editar)
  app.post('/profile',         app.src.controller.settings.profile.salvar)
  app.delete('/profile/:id',   app.src.controller.settings.profile.deletar)

  app.get('/user',        app.src.controller.settings.user.listar)
  app.get('/user/:id',    app.src.controller.settings.user.exibir)
  app.put('/user',        app.src.controller.settings.user.editar)
  app.post('/user',       app.src.controller.settings.user.salvar)
  app.delete('/user/:id', app.src.controller.settings.user.deletar)

  /***/
  app.get('/monitor/users/usersList', app.src.controller.monitor.users.usersList)
  app.get('/monitor/users/rolesDropdown', app.src.controller.monitor.users.rolesDropdown)

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

  app.get('/monitor/schemas/schemasDropdown', app.src.controller.monitor.schemas.schemasDropdown)
}