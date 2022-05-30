const Knex = require('knex');

module.exports = app => {
  const writeConfig = async (id) => {
    try {
        const server = await app.db('server')
            .select('ip', 'port')
            .first()
            .where({
                id: id
            });

        return ({
            client: process.env.DB_CLIENT,
            connection: {
                host: server.ip,
                port: server.port,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_AUDIT,
                timezone: 'UTC'
            },
            pool: { min: 2, max: 10 },
            migrations: {
                tableName: 'migrations'
            }
        })
    } catch (error) {
        return error.message
    }
  }

  const usersList = async(req, res) => {
    try {
      const sql = `CALL audit.sp_monitor_report_users;`;

      const db = Knex(await writeConfig(req.query.server_id))
      const sqlQuery = await db.raw(sql);
      db.destroy();

      return res.json(sqlQuery[0][0]);
    } catch (error) {
      return res.json({ erro: error.message });
    }
  }

  const rolesDropdown = async (req, res) => {
    try {

      const db = Knex(await writeConfig(req.query.server_id))

      const findAll = await db("audit.admin_roles")
        .column(
          "id",
          "description"
        )
        .select();

      db.destroy();

      return res.json(findAll);
    } catch (error) {
      return res.json({ erro: error });
    }
  }

  const showCreate = async (req, res) => {
    try {
      const sql = `SHOW CREATE USER `+ req.query.user +`;`;

      const db = Knex(await writeConfig(req.query.server_id))
      const sqlQuery = await db.raw(sql);
      db.destroy();

      return res.json(sqlQuery[0][0]);
    } catch (error) {
      return res.json({ erro: error });
    }
  }

  const showGrants = async (req, res) => {
    try {
      const sql = `SHOW GRANTS FOR '`+ req.query.user +`'@'` + req.query.host + `';`;

      const db = Knex(await writeConfig(req.query.server_id))
      const sqlQuery = await db.raw(sql);
      db.destroy();

      return res.json(sqlQuery[0][0]);
    } catch (error) {
      return res.json({ erro: error });
    }
  }

  const createUser = async (req, res) => {
    try {
      const sql = `CREATE USER '`+ req.query.user +`'@'` + req.query.host + `' IDENTIFIED BY '`+ req.query.password +`';`

      const db = Knex(await writeConfig(req.query.server_id))
      const sqlQuery = await db.raw(sql);
      db.destroy();

      return res.json(sqlQuery[0][0]);
    } catch (error) {
      return res.json({ erro: error });
    }
  }

  const dropUser = async (req, res) => {
    try {
      const sql = `DROP USER `+ req.query.user +`;`;

      const db = Knex(await writeConfig(req.query.server_id))
      const sqlQuery = await db.raw(sql);
      db.destroy();

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