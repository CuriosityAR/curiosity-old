'use strict'

const express    = require('express')
const app        = express()
const bodyParser = require('body-parser')
const env        = require('./env.json')

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/static', express.static(__dirname + '/public'))

app.use('/', require('./routes/index'))

app.listen(env.port, env.host, () => console.log(`Server started at ${env.host}:${env.port}`))