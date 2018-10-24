'use strict'

const router = require('express').Router()
const mysql  = require('mysql')
const env    = require('./../env.json')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/locations', (req, res) => {
    let con = mysql.createConnection({
        host: env.sql.host,
        user: env.sql.user,
        password: env.sql.passwd,
        port: env.sql.port
    })

    con.connect(err => {
        if (err) throw err

        con.query('SELECT * FROM curiosity.locations', (err, result) => {
            if (err) throw err

            res.send(result)
        })
    })
})

router.post('/locations', (req, res) => {
    let con = mysql.createConnection({
        host: env.sql.host,
        user: env.sql.user,
        password: env.sql.passwd,
        port: env.sql.port
    })

    con.connect(err => {
        if (err) throw err

        con.query(`SELECT * FROM curiosity.locations WHERE label = "${req.body.label}"`, (err, result) => {
            if (err) throw err

            if (!result.length) {
                let query = 'INSERT INTO curiosity.locations (`label`, `describe`, `lat`, `lon`) VALUES '
                query += `("${req.body.label}", "${req.body.describe}", ${req.body.lat}, ${req.body.lon})`
        
                con.query(query, (err, result) => {
                    if (err) throw err
        
                    res.send('OK')
                })
            } else {
                res.send('KO')
            }
        })
    })
})

module.exports = router