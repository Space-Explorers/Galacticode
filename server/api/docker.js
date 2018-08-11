const router = require('express').Router()
const axios = require('axios')
const fs = require('fs')
const path = require('path')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    // console.log('REQ>BODY', req.body)
    const specs = fs.readFileSync(
      path.join(
        __dirname,
        '..',
        '..',
        'practiceProblems',
        `${req.body.problemId}`,
        'askPolitely.spec.js'
      ),
      // `../../practiceProblems/${+req.body.problemId}/askPolitely.spec.js`,
      (err, data) => {
        if (err) throw err
        console.log('read file success!')
        return data
      }
    )
    // const stringifiedCode = JSON.stringify(req.body.code)
    // const payload = {
    //   code: stringifiedCode,
    //   specs
    // }
    const {data} = await axios.post('http://localhost:8081/', {
      code: req.body.code,
      specs
    })
    const parsed = JSON.parse(data)
    // if passed all tests, update user database
    res.json(parsed)
  } catch (err) {
    next(err)
  }
})
