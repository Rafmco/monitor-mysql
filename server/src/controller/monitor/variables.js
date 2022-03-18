
const validate = require('validate.js')

module.exports = app => {
  const systemVariablesList = async(req, res) => {
    try {
      const sql = `CALL audit.sp_monitor_system_variables();`;

      const sqlQuery = await app.db.raw(sql);

      return res.json(sqlQuery[0][0]);
    } catch (error) {
      return res.json({ erro: error.message });
    }
  }

  const setVariable = async (req, res) => {
    try {
      const sql = `SET GLOBAL `+ req.query.variable +` = '`+ req.query.value +`';`;

      const sqlQuery = await app.db.raw(sql);
      // console.log(sqlQuery[0]);
      return res.json(sqlQuery[0][0]);
    } catch (error) {
      return res.json({ erro: error.message });
    }
  }

  return {
    systemVariablesList,
    setVariable
  }
}