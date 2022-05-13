const itemRouter = require('express').Router()
const items = require('../data')

itemRouter.get('/', async (req, res) => {
  if(items){
    res.json(items)
  } else {
    res.status(500).end()
  }
})

itemRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  console.log('id requested', id)
  const item = items.find(i => i.id == id)
  if(item){
    res.json(item)
    res.status(200)
  } else {
    res.status(500).end()
  }
})


itemRouter.post('/', async (req, res) => {
	const body = req.body

	if (!!body.title && !!body.body && !!body.userId){
		const savedItem = {
      title: body.title,
      body: body.body,
      userId: body.userId,
      id: items.length + 1 // uuid would be better but let's leave at that
		}

    items.push(savedItem)
		res.json(savedItem)
    res.status(200)
	} else{
		res.status(400).end()
	}
})

module.exports = itemRouter
