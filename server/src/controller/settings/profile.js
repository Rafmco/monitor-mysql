/**
 * @author Rafael Machado
 * @class Profile
 * @description Função Controller Class
 * @param {this} app
 */

const validate = require('validate.js')

module.exports = app => {

  const validateSalvar = {
    description: { presence: true, type: 'string' },
    obs: { presence: true, type: 'string' }
  }

  const validateEditar = {
    id: { presence: true, type: 'integer' },
    ...validateSalvar
  }

  const validateMenu = {
    profileId: { presence: true, type: 'integer' },
    menuId: { presence: true, type: 'integer' }
  }

  const isUniqueConstraintError = async (err) => {
    if (!err) return false;

    var re = /^Duplicate entry/;
    return re.test(err.sqlMessage);
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
            queryBuilder.where('description', 'like', '%' + req.query.description + '%')
          }
        });

      return res.json(resp)
    } catch (error) {
      return res.json({ erro: error.message })
    }
  }

  const exibir = async (req, res) => {
    try {
      // const outputFormatter = (output, menu) => {
      //   output.profile = menu.profile
      //   if (!output.menus) {
      //     output.menus = []
      //   }
      //   output.menus.push(menu.menu)
      //   return output
      // }

      // const profile = await app.db('profile')
      //   .select('profile.*', 'menu.id AS menu_id', 'menu.name AS menu_name', 'menu.url AS menu_url', 'menu.parent_id AS menu_parent_id')
      //   .innerJoin('profile_menu', 'profile_id', 'profile.id')
      //   .innerJoin('menu', 'menu.id', 'profile_menu.menu_id')
      //   .where('profile.id', req.params.id)
      //   .options({nestTables: true})
      //   .then(records => records.reduce(outputFormatter, {}))

      let profile = await app.db('profile')
        .where({
          'profile.id': req.params.id
        }).first()

      profile.menus = await app.db('profile')
        .select('menu.id', 'menu.name AS menu_name', 'menu.url AS menu_url', 'menu_pai.name AS menu_pai_name')
        .innerJoin('profile_menu', 'profile_menu.profile_id', 'profile.id')
        .innerJoin('menu', 'menu.id', 'profile_menu.menu_id')
        .leftJoin('menu as menu_pai', 'menu_pai.id', 'menu.parent_id')
        .where({
          'profile.id': req.params.id
        })

      return res.json(profile)
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
      .first()

      if (!findOne) throw new Error('Perfil não encontrado')

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
      return res.json({ erro: (isUniqueConstraintError(error) ? 'Perfil já cadastrado' : error.message) })
    }
  }

  const salvarMenu = async (req, res) => {
    try {
      const err = validate(req.body, validateMenu)
      if (err) return res.json(err)

      const existeCadastroProfileMenu = await app.db('profile_menu')
        .where({
          profile_id: req.body.profileId,
          menu_id: req.body.menuId
        })
        .first()

      if (existeCadastroProfileMenu) {
        throw new Error("Menu já cadastrado para o Perfil informado!");
      }

      await app.db('profile_menu')
        .insert({
          profile_id: req.body.profileId,
          menu_id: req.body.menuId
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
          id: req.params.id
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

  const deletarMenu = async (req, res) => {
    try {
      const findOne = await app.db('profile_menu')
        .where({
          profile_id: req.body.profileId,
          menu_id: req.body.menuId
        })

      if (!findOne) throw new Error('Menu não encontrado')

      await app.db('profile_menu')
        .where({
          profile_id: req.body.profileId,
          menu_id: req.body.menuId
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
    salvarMenu,
    deletar,
    deletarMenu
  };
};
