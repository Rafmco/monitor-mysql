/**
 * @author Rafael Machado
 * @class User
 * @description Função Controller Class
 * @param {this} app
 */

const validate = require('validate.js')

module.exports = app => {
  const validateColumns = {
    login: { presence: true, type: 'string' },
    name: { presence: true, type: 'string' },
    email: { presence: true, type: 'string' },
    status: { presence: true, type: 'number' },
    profile_id: { presence: true, type: 'number' }
  }

  const validateSalvar = {
    password: { presence: true, type: 'string' },
    ...validateColumns
  }

  const validateEditar = {
    id: { presence: true, type: 'integer' },
    ...validateColumns
  }

  const isUniqueConstraintError = async (err) => {
    if (!err) return false;

    var re = /^Duplicate entry/;
    return re.test(err.sqlMessage);
  }

  const listar = async (req, res) => {
    try {
      const resp = await app.db('user')
        .select('user.id', 'login', 'name', 'email', 'status', 'profile_id', 'profile.description')
        .innerJoin('profile', 'profile.id', 'user.profile_id')
        // .limit(req.query.limit || 10)
        // .offset(req.query.offset || 1)
        .orderBy(req.query.orderBy || 'id')
        .whereNull('user.deleted_at')
        // .where({
        //   deleted_at: null
        // })
        .modify(function(queryBuilder) {
          if (req.query.login) {
            queryBuilder.where('login', 'like', '%' + req.query.login + '%')
          }
          if (req.query.name) {
            queryBuilder.where('name', 'like', '%' + req.query.name + '%')
          }
          if (req.query.profileId) {
            queryBuilder.where({
              profile_id: req.query.profileId
            })
          }
        })

      return res.json(resp)
    } catch (error) {
      return res.json({ erro: error.message })
    }
  }

  const exibir = async (req, res) => {
    try {
      const resp = await app.db('user')
      .select('id', 'login', 'name', 'email', 'status', 'profile_id')
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
        .first()

      if (!findOne) throw new Error('Usuário não encontrado')

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
      return res.json({ erro: (isUniqueConstraintError(error) ? 'Login já cadastrado' : error.message) })
    }
  }

  const deletar = async (req, res) => {
    try {
      const findOne = await app.db('user')
        .where({
          id: req.params.id
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