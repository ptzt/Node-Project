const express = require('express')
const morgan = require('morgan')

// Routes
const productsRoutes = require('./routes/productsRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const app = express()

// Settings
app.set("port", 8080)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/products', productsRoutes)
app.use('/api/category', categoryRoutes)

module.exports = app