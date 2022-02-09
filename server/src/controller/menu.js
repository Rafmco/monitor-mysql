/**
 * @author Rafael Machado
 * @class Menu
 * @description Função Controller Class
 * @param {this} app
 */
module.exports = app => {

  const listar = async (req, res) => {
    try {
      const resp = await app.db('menu')
        .select('id', 'name', 'description', 'url', 'icon', 'order', 'icon_color', 'parent_id')
        .orderBy(req.query.orderBy || 'id')
        .where({
          deleted_at: null
        });

      return res.json(resp)
    } catch (error) {
      return res.json({ erro: error.message })
    }
  }

  return {
    listar
  };
};
