const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')

require("dotenv").config()

// Routes
const app = express()

// Settings
app.set("port", process.env.PORT || 8080)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api', routes)

module.exports = app