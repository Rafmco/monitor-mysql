
const validate = require('validate.js')

module.exports = app => {
  const usersList = async(req, res) => {
    try {
      const sql = `CALL audit.sp_monitor_report_users;`;

      const sqlQuery = await app.db.raw(sql);
      // console.log(sqlQuery[0][0]);
      return res.json(sqlQuery[0][0]);
    } catch (error) {
      return res.json({ erro: error.message });
    }
  }

  const rolesDropdown = async (_req, res) => {
    try {
      const findAll = await app.db("audit.admin_roles")
        .column(
          "id",
          "description"
        )
        .select();

      return res.json(findAll);
    } catch (error) {
      return res.json({ erro: error });
    }
  }

  const showCreate = async (req, res) => {
    try {
      const sql = `SHOW CREATE USER `+ req.query.user +`;`;

      const sqlQuery = await app.db.raw(sql);

      return res.json(sqlQuery[0][0]);
    } catch (error) {
      return res.json({ erro: error });
    }
  }

  const showGrants = async (req, res) => {
    try {
      const sql = `SHOW GRANTS FOR '`+ req.query.user +`'@'` + req.query.host + `';`;

      const sqlQuery = await app.db.raw(sql);

      return res.json(sqlQuery[0][0]);
    } catch (error) {
      return res.json({ erro: error });
    }
  }

  const createUser = async (req, res) => {
    try {
      // console.log(req.query);
      const sql = `CREATE USER '`+ req.query.user +`'@'` + req.query.host + `' IDENTIFIED BY '`+ req.query.password +`';`
      // console.log(sql);
      const sqlQuery = await app.db.raw(sql);
      // console.log(sqlQuery[0])
      return res.json(sqlQuery[0][0]);
    } catch (error) {
      return res.json({ erro: error });
    }
  }

  const dropUser = async (req, res) => {
    try {
      const sql = `DROP USER `+ req.query.user +`;`;

      const sqlQuery = await app.db.raw(sql);

      return res.json(sqlQuery[0][0]);
    } catch (error) {
      return res.json({ erro: error });
    }
  }

  return {
    usersList,
    rolesDropdown,
    showCreate,
    showGrants,
    createUser,
    dropUser
  }

}