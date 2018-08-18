const passport = require('passport')
const router = require('express').Router()
const GitHubStrategy = require('passport-github').Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  console.log('Github client ID / secret not found. Skipping Github OAuth.')
} else {
  const githubConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
  }

  const strategy = new GitHubStrategy(
    githubConfig,
    (accessToken, refreshToken, profile, done) => {
      const githubId = profile.id
      const name = profile.displayName
      const email = profile.email
      console.log('PROFILE', profile)

      User.findOrCreate({
        where: {githubId},
        defaults: {name, email}
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get('/', passport.authenticate('github'))

  router.get(
    '/callback',
    passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  )
}
