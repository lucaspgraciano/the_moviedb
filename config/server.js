const express = require('express')
const expressValidator = require('express-validator')
const consign = require('consign')
const bodyParser = require('body-parser')
const session = require('express-session')

var app = express()

app.set('view engine', 'ejs')
app.set('views', './app/views')

app.use(express.static('./app/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator())
app.use(session({
    secret: 'kjsdhdreytuksf',
    resave: false,
    saveUninitialized: false,
}))

consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(app)
    
module.exports = app