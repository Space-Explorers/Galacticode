const router = require('express').Router()
const axios = require('axios')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    // updated the URL below when deployed
    const results = await axios.post('http://docker.herokuapp.com', req.body)
    res.send(results)
  } catch (err) {
    next(err)
  }
})
