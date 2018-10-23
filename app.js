'use strict'

const express = require('express')
const app     = express()
const env     = require('./env.json')

app.use('/static', express.static(__dirname + '/public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.use('/', require('./routes/index'))

app.listen(env.port, env.host, () => console.log(`Server started at ${env.host}:${env.port}`))