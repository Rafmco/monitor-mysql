const jwt = require('jsonwebtoken');

module.exports = app => {
  app.post('/login', app.src.auth.login.login)
  app.get('/login/menu/:id', app.src.auth.login.listarMenu)
  app.get('/login/server/:id', app.src.auth.login.listarServer)

  // Valida autenticação
  app.all('*', app.src.auth.verifyToken.verify)

  app.get('/menu/dropdown', app.src.controller.settings.menu.dropdown)
  app.get('/menu',          app.src.controller.settings.menu.listar)
  app.get('/menu/:id',      app.src.controller.settings.menu.exibir)
  app.put('/menu',          app.src.controller.settings.menu.editar)
  app.post('/menu',         app.src.controller.settings.menu.salvar)
  app.delete('/menu/:id',   app.src.controller.settings.menu.deletar)

  app.get('/profile/dropdown',     app.src.controller.settings.profile.dropdown)
  app.get('/profile',              app.src.controller.settings.profile.listar)
  app.get('/profile/:id',          app.src.controller.settings.profile.exibir)
  app.put('/profile',              app.src.controller.settings.profile.editar)
  app.post('/profile',             app.src.controller.settings.profile.salvar)
  app.post('/profile/salvarMenu',  app.src.controller.settings.profile.salvarMenu)
  app.delete('/profile/:id',       app.src.controller.settings.profile.deletar)
  app.post('/profile/deletarMenu', app.src.controller.settings.profile.deletarMenu)

  app.get('/server',        app.src.controller.settings.server.listar)
  app.get('/server/:id',    app.src.controller.settings.server.exibir)
  app.put('/server',        app.src.controller.settings.server.editar)
  app.post('/server',       app.src.controller.settings.server.salvar)
  app.delete('/server/:id', app.src.controller.settings.server.deletar)

  app.get('/user',        app.src.controller.settings.user.listar)
  app.get('/user/:id',    app.src.controller.settings.user.exibir)
  app.put('/user',        app.src.controller.settings.user.editar)
  app.post('/user',       app.src.controller.settings.user.salvar)
  app.delete('/user/:id', app.src.controller.settings.user.deletar)

  /***/
  app.get('/monitor/users/usersList',     app.src.controller.monitor.users.usersList)
  app.get('/monitor/users/rolesDropdown', app.src.controller.monitor.users.rolesDropdown)
  app.get('/monitor/users/showGrants',    app.src.controller.monitor.users.showGrants)
  app.get('/monitor/users/showCreate',    app.src.controller.monitor.users.showCreate)
  app.get('/monitor/users/createUser',    app.src.controller.monitor.users.createUser)
  app.get('/monitor/users/dropUser',      app.src.controller.monitor.users.dropUser)

  app.get('/monitor/dashboard/hostInfo',           app.src.controller.monitor.dashboard.hostInfo)
  app.get('/monitor/dashboard/instanceInfo',       app.src.controller.monitor.dashboard.instanceInfo)
  app.get('/monitor/dashboard/connectedUsersList', app.src.controller.monitor.dashboard.connectedUsersList)
  app.get('/monitor/dashboard/dbSizeList',         app.src.controller.monitor.dashboard.dbSizeList)
  app.get('/monitor/dashboard/processList',        app.src.controller.monitor.dashboard.processList)
  app.get('/monitor/dashboard/connectionsCount',   app.src.controller.monitor.dashboard.connectionsCount)
  app.get('/monitor/dashboard/bytesCount',         app.src.controller.monitor.dashboard.bytesCount)
  app.get('/monitor/dashboard/statementsCount',    app.src.controller.monitor.dashboard.statementsCount)
  app.get('/monitor/dashboard/innoDbBufferPool',   app.src.controller.monitor.dashboard.innoDbBufferPool)

  app.get('/monitor/variables/systemVariablesList', app.src.controller.monitor.variables.systemVariablesList)
  app.get('/monitor/variables/setVariable',         app.src.controller.monitor.variables.setVariable)

  app.get('/monitor/events/eventsList',  app.src.controller.monitor.events.eventsList)
  app.get('/monitor/events/showCreate',  app.src.controller.monitor.events.showCreate)
  app.get('/monitor/events/createEvent', app.src.controller.monitor.events.createEvent)

  app.get('/monitor/schemas/schemasDropdown', app.src.controller.monitor.schemas.schemasDropdown)
}