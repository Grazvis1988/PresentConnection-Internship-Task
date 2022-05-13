const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const itemsRouter = require('./controlers/items')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/items', itemsRouter)

if(process.env.NODE_ENV === 'test') {
	const testRouter = require('./controlers/test')
	app.use('/api/testing', testRouter)
}

app.use(middleware.unknownEndPoint)

module.exports = app
