require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const consign = require('consign')
const knex = require('knex')
const config = require('./src/config/db')


const app  = express()

app.use(cors())
app.use(bodyParser.json())

const database = knex(config)
app.db = database

consign()
.include('./src/controller')
.include('./src/auth')
.include('./src/router')
.into(app)

app.listen(process.env.APP_PORT, () => {
  console.log(`Rodando na porta ${process.env.APP_PORT}`)
})