const router = require('express').Router()
const axios = require('axios')
const fs = require('fs')
const glob = require('glob')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    console.log(req)
    const [specsFile] = glob.sync(req.body.problemId + '/*.spec.js', {
      cwd: 'practiceProblems',
      realpath: true
    })
    const specs = fs.readFileSync(specsFile, (err, specData) => {
      if (err) throw err
      console.log('read file success!')
      return specData
    })
    const { data } = await axios.post(
      // 'http://localhost:8081/',
      'https://space-explorers-api.herokuapp.com/',
      {
        code: req.body.code,
        specs
      }
    )
    // if passed all tests, update user database

    const responseInfo = JSON.parse(Buffer.from(data))
    const results = {
      stats: responseInfo.stats,
      tests: responseInfo.suites.suites[0].tests
    }
    res.json(results)
  } catch (err) {
    next(err)
  }
})
