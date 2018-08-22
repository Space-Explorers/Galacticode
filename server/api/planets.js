const router = require('express').Router()
const { Planet, Challenge } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const planets = await Planet.findAll()
    res.json(planets)
  } catch (err) {
    next(err)
  }
})

router.get('/:planetId/challenges', async (req, res, next) => {
  try {
    const planet = await Planet.findById(req.params.planetId, {
      include: {
        model: Challenge,
        attributes: ['id', 'name']
      }
    })
    res.json(planet)
  } catch (err) {
    next(err)
  }
})
