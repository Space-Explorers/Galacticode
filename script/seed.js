'use strict'

const db = require('../server/db')
const { User, Challenge, Example } = require('../server/db/models')

const challenges = [
  {
    name: 'Ask Politely',
    prompt: 'Create the function askPolitely that accepts a sentence as an argument. If the last character of the sentence is a question mark, then make sure the question ends with the word "please?". If a question is already polite(meaning it already ends with "please") or the sentence is not a question, then return the inputted string without modification.',
    solution: 'function askPolitely(sentence) {if (sentence.slice(-1) === "?") {if (sentence.slice(-7) === "please?") { return sentence } else { return sentence.slice(0, -1) + " please?"} } else { return sentence } }'
  },
  {
    name: 'Last Digit',
    prompt: 'Create the function lastDigit that accepts two non-negative integer values and returns true if they have the same last digit, such as 27 and 57. The function accepts two non-negative integer arguments and returns true or false if they have the same last digit.',
    solution: 'function lastDigit(num1, num2) {num1 = num1.toString(); num2 = num2.toString(); if (num1[num1.length - 1] === num2[num2.length - 1]) {return true;} else { return false;}}'
  }
]

const examples = [
  {
    input: 'askPolitely("May I borrow your pencil?");',
    output: 'May I borrow your pencil please?',
    challengeId: 1
  },
  {
    input: 'askPolitely("May I ask a question please?");',
    output: 'May I ask a question please?',
    challengeId: 1
  },
  {
    input: 'askPolitely("My name is Grace Hopper.");',
    output: 'My name is Grace Hopper.',
    challengeId: 1
  },
  {
    input: 'lastDigit(22,32);',
    output: 'true',
    challengeId: 2
  },
  {
    input: 'lastDigit(77, 999);',
    output: 'false',
    challengeId: 2
  },
  {
    input: 'lastDigit(33,3);',
    output: 'true',
    challengeId: 2
  }
]

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  await Promise.all(challenges.map(challenge => Challenge.create(challenge)))

  await Promise.all(examples.map(example => Example.create(example)))

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' })
  ])


  // console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
