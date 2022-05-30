var jwt = require('jsonwebtoken');
const validate = require('validate.js')

module.exports = app => {
  const validarUsuario = {
    login: { presence: true, type: 'string' },
    password: { presence: true, type: 'string' }
  }

  const validarProfile = {
    id: { presence: true, type: 'string' }
  }

  const login = async (req, res) => {
    try {
      const err = await validate(req.body, validarUsuario)
      if (err) return res.json({ erro: err })

      const user = await app.db('user')
        .select()
        .first()
        .where({
          login: req.body.login,
          password: req.body.password
        })

      if (!user) return res.json({ erro: "Usuário ou senha inválidos!" })

      const menus = await app.db('profile_menu')
        .select('menu.*')
        .where({
          'profile_menu.profile_id': user.profile_id
        })
        .innerJoin('menu', 'menu.id', 'profile_menu.menu_id')
        .groupBy('menu.id')

      const server = await app.db('profile_server')
        .select('server.*')
        .first()
        .where({
          'profile_server.profile_id': user.profile_id
        })
        .innerJoin('server', 'server.id', 'profile_server.server_id')
        .groupBy('server.id')
        .orderBy('profile_server.default', 'desc')

      const token = jwt.sign({
        data: {
          id: user.id,
          login: user.login,
          name: user.name,
          email: user.email,
          status: user.status,
          profile_id: user.profile_id
        }
      }, process.env.APP_KEY, { expiresIn: '6h' });

      return res.json({
        token,
        payload: {
          id: user.id,
          login: user.login,
          name: user.name,
          email: user.email,
          status: user.status,
          profile_id: user.profile_id,
          menu: menus,
          // server: servers
          default_server_id: server.id
        }
      })

    } catch (error) {
      return res.json({ erro: error.message })
    }
  }

  const listarMenu = async (req, res) => {
    try {
      const err = await validate(req.params, validarProfile)
      if (err) return res.json({ erro: err })

      const menu = await app.db('profile_menu')
        .select('menu.*')
        .where({
          'profile_menu.profile_id': req.params.id
        })
        .innerJoin('menu', 'menu.id', 'profile_menu.menu_id')
        .groupBy('menu.id')

      if (!menu)
        return res.json({ erro: "Menu não encontrado para o Usuário!" })

      return res.json(menu)

    } catch (error) {
      return res.json({ erro: error.message })
    }
  }

  const listarServer = async (req, res) => {
    try {
      const err = await validate(req.params, validarProfile)
      if (err) return res.json({ erro: err })

      const server = await app.db('profile_server')
        .select('server.*')
        .where({
          'profile_server.profile_id': req.params.id
        })
        .innerJoin('server', 'server.id', 'profile_server.server_id')
        .groupBy('server.id')
        .orderBy('profile_server.default', 'desc')
        .orderBy('server.id')

      if (!server)
        return res.json({ erro: "Servidor não encontrado para o Usuário!" })

      return res.json(server)

    } catch (error) {
      return res.json({ erro: error.message })
    }
  }

  return {
    login,
    listarMenu,
    listarServer
  }
}
