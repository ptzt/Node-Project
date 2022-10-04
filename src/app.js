const express = require('express')
const morgan = require('morgan')

// Routes
const rootRouter = require('./routes/productsRoutes')
const app = express()

// Settings
app.set("port", 8080)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api', rootRouter)

module.exports = app