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

    const hostInfo = async (req, res) => {
        try {
            const sql = `CALL audit.sp_monitor_host_info;`;

            const db = Knex(await writeConfig(req.query.server_id))
            const sqlQuery = await db.raw(sql);
            db.destroy();

            return res.json(sqlQuery[0][0]);
        } catch (error) {
            return res.json({ erro: error.message });
        }
    }

    const instanceInfo = async (req, res) => {
        try {
            const sql = `CALL audit.sp_monitor_instance_info;`;
            
            const db = Knex(await writeConfig(req.query.server_id))
            const sqlQuery = await db.raw(sql);
            db.destroy();

            return res.json(sqlQuery[0][0]);
        } catch (error) {
            return res.json({ erro: error.message });
        }
    }

    const connectedUsersList = async (req, res) => {
        try {
            const sql = `CALL audit.sp_monitor_connected_users_list;`;

            const db = Knex(await writeConfig(req.query.server_id))
            const sqlQuery = await db.raw(sql);
            db.destroy();

            return res.json(sqlQuery[0][0]);
        } catch (error) {
            return res.json({ erro: error.message });
        }
    }

    const dbSizeList = async (req, res) => {
        try {
            const sql = `CALL audit.sp_monitor_database_size;`;

            const db = Knex(await writeConfig(req.query.server_id))
            const sqlQuery = await db.raw(sql);
            db.destroy();

            return res.json(sqlQuery[0][0]);
        } catch (error) {
            return res.json({ erro: error.message });
        }
    }

    const processList = async (req, res) => {
        try {
            const sql = `CALL audit.sp_monitor_process_list;`;
            
            const db = Knex(await writeConfig(req.query.server_id))
            const sqlQuery = await db.raw(sql);
            db.destroy();

            return res.json(sqlQuery[0][0]);
        } catch (error) {
            return res.json({ erro: error.message });
        }
    }

    const connectionsCount = async (req, res) => {
        try {
            const sql = `CALL audit.sp_monitor_connections;`;

            const db = Knex(await writeConfig(req.query.server_id))
            const sqlQuery = await db.raw(sql);
            db.destroy();

            return res.json(sqlQuery[0][0]);
        } catch (error) {
            return res.json({ erro: error.message });
        }
    }

    const bytesCount = async (req, res) => {
        try {
            const sql = `CALL audit.sp_monitor_bytes;`;

            const db = Knex(await writeConfig(req.query.server_id))
            const sqlQuery = await db.raw(sql);
            db.destroy();

            return res.json(sqlQuery[0][0]);
        } catch (error) {
            return res.json({ erro: error.message });
        }
    }

    const statementsCount = async (req, res) => {
        try {
            const sql = `CALL audit.sp_monitor_statements;`;

            const db = Knex(await writeConfig(req.query.server_id))
            const sqlQuery = await db.raw(sql);
            db.destroy();

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
