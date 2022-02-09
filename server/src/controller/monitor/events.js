
const validate = require('validate.js')

module.exports = app => {
  const eventsList = async(req, res) => {
    try {
      const sql = `CALL audit.sp_monitor_report_events();`;

      const sqlQuery = await app.db.raw(sql);

      return res.json(sqlQuery[0][0]);
    } catch (error) {
      return res.json({ erro: error.message });
    }
  }

  return {
    eventsList
  }
}