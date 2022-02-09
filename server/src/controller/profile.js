/**
 * @author Eder Ferraz Caciano
 * @class Profile
 * @description Função Controller Class
 * @param {this} app
 */
 module.exports = app => {
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

  return {
    dropdown
  };
};
