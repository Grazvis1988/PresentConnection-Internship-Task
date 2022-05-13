const logger = require('./logger')

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}


const unknownEndPoint = (request, response) => {
	response.status(404).send({ error: 'Uknown endpoint' })
}


module.exports = {
	requestLogger,
	unknownEndPoint,
}
