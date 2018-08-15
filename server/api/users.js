const router = require('express').Router()
const { User, Challenge } = require('../db/models')
const Op = require('sequelize').Op;
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'progress'],

    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/challenges', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const challenges = await user.getChallenges({
      attributes: ['id']
    })
    res.json(challenges)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const progress = Number(req.body.points) + Number(req.body.userProgress)
    const [numberOfAffectedRows, affectedRows] = await User.update({
      progress
    }, {
        where: { id: +req.params.userId },
        returning: true,
        plain: true
      })
    await affectedRows.addChallenge(req.body.problemId)
    res.status(200).send("Success")
  } catch (err) {
    next(err)
  }
})