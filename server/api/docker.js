const router = require('express').Router()
const axios = require('axios')
const fs = require('fs')
const glob = require('glob')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const [specsFile] = glob.sync(req.body.problemId + '/*.spec.js', {
      cwd: 'practiceProblems',
      realpath: true
    })
    const specs = fs.readFileSync(specsFile, (err, data) => {
      if (err) throw err
      console.log('read file success!')
      return data
    })
    const {data} = await axios.post(
      'https://space-explorers-api.herokuapp.com/',
      {
        code: req.body.code,
        specs
      }
    )
    // if passed all tests, update user database
    res.json(data)
  } catch (err) {
    next(err)
  }
})
