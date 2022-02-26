
const validate = require('validate.js')

module.exports = app => {
  const schemasList = async(req, res) => {
    try {
      const sql = `CALL audit.sp_monitor_report_users();`;

      const sqlQuery = await app.db.raw(sql);

      return res.json(sqlQuery[0][0]);
    } catch (error) {
      return res.json({ erro: error.message });
    }
  }

  const schemasDropdown = async (_req, res) => {
    try {
      const findAll = await app.db("information_schema.schemata")
        .column(
          "SCHEMA_NAME"
        )
        .orderBy("SCHEMA_NAME", "ASC")
        .select();

      return res.json(findAll);
    } catch (error) {
      return res.json({ erro: error });
    }
  }

  return {
    schemasList,
    schemasDropdown
  }

}