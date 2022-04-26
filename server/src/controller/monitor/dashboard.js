
 module.exports = app => {
    const hostInfo = async (req, res) => {
        try {
            const sql = `CALL audit.sp_monitor_host_info;`;

            const sqlQuery = await app.db.raw(sql);
            return res.json(sqlQuery[0][0]);
        } catch (error) {
            return res.json({ erro: error.message });
        }
    }

    const instanceInfo = async (req, res) => {
        try {
            const sql = `CALL audit.sp_monitor_instance_info;`;

            const sqlQuery = await app.db.raw(sql);
            return res.json(sqlQuery[0][0]);
        } catch (error) {
            return res.json({ erro: error.message });
        }
    }

    const connectedUsersList = async (req, res) => {
        try {
            const sql = `CALL audit.sp_monitor_connected_users_list;`;

            const sqlQuery = await app.db.raw(sql);

            return res.json(sqlQuery[0][0]);
        } catch (error) {
            return res.json({ erro: error.message });
        }
    }

    const dbSizeList = async (req, res) => {
        try {
            const sql = `CALL audit.sp_monitor_database_size;`;

            const sqlQuery = await app.db.raw(sql);

            return res.json(sqlQuery[0][0]);
        } catch (error) {
            return res.json({ erro: error.message });
        }
    }

    const processList = async (req, res) => {
        try {
            const sql = `CALL audit.sp_monitor_process_list;`;

            const sqlQuery = await app.db.raw(sql);

            return res.json(sqlQuery[0][0]);
        } catch (error) {
            return res.json({ erro: error.message });
        }
    }

    const connectionsCount = async (req, res) => {
        try {
            const sql = `CALL audit.sp_monitor_connections;`;

            const sqlQuery = await app.db.raw(sql);

            return res.json(sqlQuery[0][0]);
        } catch (error) {
            return res.json({ erro: error.message });
        }
    }

    const bytesCount = async (req, res) => {
        try {
            const sql = `CALL audit.sp_monitor_bytes;`;

            const sqlQuery = await app.db.raw(sql);

            return res.json(sqlQuery[0][0]);
        } catch (error) {
            return res.json({ erro: error.message });
        }
    }

    const statementsCount = async (req, res) => {
        try {
            const sql = `CALL audit.sp_monitor_statements;`;

            const sqlQuery = await app.db.raw(sql);

            return res.json(sqlQuery[0][0]);
        } catch (error) {
            return res.json({ erro: error.message });
        }
    }

    return {
        hostInfo,
        instanceInfo,
        connectedUsersList,
        dbSizeList,
        processList,
        connectionsCount,
        bytesCount,
        statementsCount
    };
  };
