/**
* @author Rafael Machado
* @class server
* @description Função Controller Class
* @param {this} app
*/

const validate = require('validate.js')

module.exports = app => {
    const validateColumns = {
        name: { presence: true, type: 'string' },
        ip: { presence: true, type: 'string' },
        port: { presence: true, type: 'integer' }
    }

    const validateSalvar = {
        ...validateColumns
    }

    const validateEditar = {
        id: { presence: true, type: 'integer' },
        ...validateColumns
    }

    const isUniqueConstraintError = async (err) => {
        if (!err) return false;

        var re = /^Duplicate entry/;
        return re.test(err.sqlMessage);
    }

    const listar = async (req, res) => {
        try {
            const resp = await app.db('server')
                .select('id', 'name', 'description', 'ip', 'port')
                .orderBy(req.query.orderBy || 'id')
                .whereNull('server.deleted_at')
                .modify(function(queryBuilder) {
                    if (req.query.name) {
                        queryBuilder.where('name', 'like', '%' + req.query.name + '%')
                    }
                    if (req.query.desc) {
                        queryBuilder.where('description', 'like', '%' + req.query.desc + '%')
                    }
                })

            return res.json(resp)
        } catch (error) {
            return res.json({ erro: error.message })
        }
    }

    const exibir = async (req, res) => {
        try {
            const resp = await app.db('server')
                .select('id', 'name', 'description', 'ip', 'port')
                .where({
                    id: req.params.id
                })
                .first()

            return res.json(resp)
        } catch (error) {
            return res.json({ erro: error.message })
        }
    }

    const editar = async (req, res) => {
        try {
            const err = validate(req.body, validateEditar)
            if (err) return res.json(err)

            const findOne = await app.db('server')
                .where({
                    id: req.body.id
                })
                .first()

            if (!findOne) throw new Error('Servidor não encontrado')

            await app.db('server')
                .where({
                    id: req.body.id
                })
                .update({
                    name: req.body.name,
                    description: req.body.desc,
                    ip: req.body.ip,
                    port: req.body.port
                })

            return res.json({ message: 'Alterado' })
        } catch (error) {
            return res.json({ erro: error.message })
        }
    }

    const salvar = async (req, res) => {
        try {
            const err = validate(req.body, validateSalvar)
            if (err) return res.json({ erro: err })

            await app.db('server')
                .insert({
                    name: req.body.name,
                    description: req.body.desc,
                    ip: req.body.ip,
                    port: req.body.port
                })

            return res.json({ message: 'Inserido' })
        } catch (error) {
            return res.json({ erro: (isUniqueConstraintError(error) ? 'Servidor já cadastrado' : error.message) })
        }
    }

    const deletar = async (req, res) => {
        try {
            const findOne = await app.db('server')
                .where({
                    id: req.params.id
                })
                if (!findOne.length) throw new Error('Servidor não encontrado')

            await app.db('server')
                .where({
                    id: req.params.id
                })
                .del()

            return res.json({ message: 'Deletado' })

        } catch (error) {
            return res.json({ erro: error.message })
        }
    }

    return {
        listar,
        exibir,
        editar,
        salvar,
        deletar
    }
}