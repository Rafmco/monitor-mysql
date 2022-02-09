var jwt = require('jsonwebtoken');
const validate = require('validate.js')

module.exports = app => {
  const validarUsuario = {
    login: { presence: true, type: 'string' },
    password: { presence: true, type: 'string' }
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
      // return res.json(user)
      if (!user) return res.json({ erro: "Usuário ou senha inválidos!" })

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
          profile_id: user.profile_id
        }
      })
    } catch (error) {
      return res.json({ erro: error.message })
    }
  }

  return {
    login
  }
}
