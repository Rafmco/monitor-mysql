
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

  const showCreate = async (req, res) => {
    try {
      const sql = `SHOW CREATE EVENT audit.`+ req.query.event_name +`;`;
      // console.log(sql);
      const sqlQuery = await app.db.raw(sql);
      // console.log(sqlQuery[0][0]);
      return res.json(sqlQuery[0][0]);
    } catch (error) {
      return res.json({ erro: error });
    }
  }

  const createEvent = async (req, res) => {
    try {
      const sql = `CREATE EVENT audit.`+ req.query.event_name +
        ` ON SCHEDULE `+ req.query.schedule +
        (req.query.comment ? ` COMMENT '`+ req.query.comment +`'` : ``) +
        ` DO `+ req.query.statement +`;`;
      console.log(sql);
      // const sqlQuery = await app.db.raw(sql);
      // console.log(sqlQuery[0]);
      return res.json(sqlQuery[0][0]);
    } catch (error) {
      return res.json({ erro: error.message });
    }
  }

  return {
    eventsList,
    showCreate,
    createEvent
  }
}
