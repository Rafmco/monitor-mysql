/**
 * @author Rafael Machado
 * @class Profile
 * @description Função Controller Class
 * @param {this} app
 */
 module.exports = app => {

  const validateSalvar = {
    id: { presence: true, type: 'number' },
    description: { presence: true, type: 'string' },
    obs: { presence: true, type: 'string' }
  }

  const validateEditar = {
    id: { presence: true, type: 'integer' },
    ...validateSalvar
  }

  const dropdown = async (_req, res) => {
    try {
      const findAll = await app.db("profile")
        .column(
          "id",
          "description",
          "obs"
        )
        .select()
        .where({
          deleted_at: null
        });

      return res.json(findAll);
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const listar = async (req, res) => {
    try {
      const resp = await app.db('profile')
        .select('id', 'description', 'obs')
        .orderBy(req.query.orderBy || 'id')
        .whereNull('deleted_at')
        .modify(function(queryBuilder) {
          if (req.query.description) {
            queryBuilder.where('login', 'like', '%' + req.query.description + '%')
          }
        });

      return res.json(resp)
    } catch (error) {
      return res.json({ erro: error.message })
    }
  }

  const exibir = async (req, res) => {
    try {
      const resp = await app.db('profile')
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

      const findOne = await app.db('profile')
      .where({
        id: req.body.id
      })
      if (!findOne.length) throw new Error('Perfil não encontrado')

      await app.db('profile')
        .where({
          id: req.body.id
        })
        .update({
          description: req.body.description,
          obs: req.body.obs
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

      await app.db('profile')
        .insert({
          description: req.body.description,
          obs: req.body.obs
        })

      return res.json({ message: 'Inserido' })
    } catch (error) {
      return res.json({ erro: error.message })
    }
  }

  const deletar = async (req, res) => {
    try {
      const findOne = await app.db('profile')
        .where({
          id: req.body.id
        })
        if (!findOne.length) throw new Error('Perfil não encontrado')

      await app.db('profile')
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
    dropdown,
    listar,
    exibir,
    editar,
    salvar,
    deletar
  };
};
