
const validate = require('validate.js')

module.exports = app => {
  const validateSalvar = {
    id: { presence: true, type: 'number' },
    login: { presence: true, type: 'string' },
    name: { presence: true, type: 'string' },
    email: { presence: true, email: true },
    password: { presence: true, type: 'string' },
    status: { presence: true, type: 'number' },
    profile_id: { presence: true, type: 'number' }
  }

  const validateEditar = {
    id: { presence: true, type: 'integer' },
    ...validateSalvar
  }

  const listar = async (req, res) => {
    try {
      const resp = await app.db('user')
      .select('id', 'login', 'name', 'email')
      .limit(req.query.limit || 10)
      .offset(req.query.offset || 1)
      .orderBy(req.query.orderBy || 'id')
      .where({
        deleted_at: null
      });

      return res.json(resp)
    } catch (error) {
      return res.json({ erro: error.message })
    }
  }

  const exibir = async (req, res) => {
    try {
      const resp = await app.db('user')
      .where({
        id: req.params.id
      })
      .first()

      return res.json(resp)
    } catch (error) {
      return res.json({ erro: error.message })
    }
  }

  const editar = async (req, res) => {
    try {
      const err = validate(req.body, validateEditar)
      if (err) return res.json(err)

      const findOne = await app.db('user')
      .where({
        id: req.body.id
      })
      if (!findOne.length) throw new Error('Usuário não encontrado')

      await app.db('user')
        .where({
          id: req.body.id
        })
        .update({
          login: req.body.login,
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          status: req.body.status,
          profile_id: req.body.profile_id
        })

      return res.json({ message: 'Alterado' })
    } catch (error) {
      return res.json({ erro: error.message })
    }
  }

  const salvar = async (req, res) => {
    try {
      const err = validate(req.body, validateSalvar)
      if (err) return res.json(err)

      await app.db('user')
        .insert({
          login: req.body.login,
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          status: req.body.status,
          profile_id: req.body.profile_id
        })

      return res.json({ message: 'Inserido' })
    } catch (error) {
      return res.json({ erro: error.message })
    }
  }

  const deletar = async (req, res) => {
    try {
      const findOne = await app.db('user')
        .where({
          id: req.body.id
        })
        if (!findOne.length) throw new Error('Usuário não encontrado')

      await app.db('user')
        .where({
          id: req.params.id
        })
        .del()

      return res.json({ message: 'Deletado' })

    } catch (error) {
      return res.json({ erro: error.message })
    }
  }

  return {
    listar,
    exibir,
    editar,
    salvar,
    deletar
  }
}