'use strict'

const db = require('../server/db')
const fs = require('fs')
var path = require('path');
const { User, Challenge, Planet } = require('../server/db/models')

const greetingSpecs = fs.readFileSync(path.join(__dirname, '/specs/greeting.spec.js'), (err, specData) => {
  if (err) throw err
  console.log('read file success!')
  return specData
})
const thereminSpecs = fs.readFileSync(path.join(__dirname, '/specs/theremin.spec.js'), (err, specData) => {
  if (err) throw err
  console.log('read file success!')
  return specData
})
const repeatAStringSpecs = fs.readFileSync(path.join(__dirname, '/specs/repeatString.spec.js'), (err, specData) => {
  if (err) throw err
  console.log('read file success!')
  return specData
})
const vowelCountSpecs = fs.readFileSync(path.join(__dirname, '/specs/vowelCount.spec.js'), (err, specData) => {
  if (err) throw err
  console.log('read file success!')
  return specData
})
const askPolitelySpecs = fs.readFileSync(path.join(__dirname, '/specs/askPolitely.spec.js'), (err, specData) => {
  if (err) throw err
  console.log('read file success!')
  return specData
})
const lastDigitSpecs = fs.readFileSync(path.join(__dirname, '/specs/lastDigit.spec.js'), (err, specData) => {
  if (err) throw err
  console.log('read file success!')
  return specData
})
const nicknameGeneratorSpecs = fs.readFileSync(path.join(__dirname, '/specs/nicknameGenerator.spec.js'), (err, specData) => {
  if (err) throw err
  console.log('read file success!')
  return specData
})
const myJoinSpecs = fs.readFileSync(path.join(__dirname, '/specs/myJoin.spec.js'), (err, specData) => {
  if (err) throw err
  console.log('read file success!')
  return specData
})
const isPalindromeSpecs = fs.readFileSync(path.join(__dirname, '/specs/isPalindrome.spec.js'), (err, specData) => {
  if (err) throw err
  console.log('read file success!')
  return specData
})


const challenges = [
  {
    id: 1,
    name: 'Greeting',
    prompt:
      'Create a function greeting(name) that accepts a string argument (a name, ex: “Oliver”), and returns a personalized greeting if a name is present.\nThe function takes a name as its only argument, and returns one of the following strings:',
    solution:
      'function greeting(name) { if (name) { return "Hello, " + name + "!"; } else { return "Hello!"; } }',
    specs: greetingSpecs,
    points: 10,
    skillLevel: 'Easy',
    examples: 'greeting("Kathy");\n// OUTPUT: "Hello, Kathy!";\n\ngreeting();\n// OUTPUT: "Hello!"',
    startingText: 'function greeting(name) {\n  // YOUR CODE HERE\n}',
    planetId: 1
  },
  {
    id: 2,
    name: 'Do You Play The Theremin?',
    prompt:
      'Create the function "doYouPlayTheTheremin". If your name starts with the letter "S" or "s", you are playing the Theremin!',
    solution:
      'function doYouPlayTheTheremin(name) {if (name[0].toLowerCase() === "s") {return name + " plays the Theremin!";} else {return name + " does not play the Theremin!";}}',
    specs: thereminSpecs,
    points: 10,
    skillLevel: 'Easy',
    examples: 'doYouPlayTheTheremin("Amy")\n// OUTPUT: "Amy does not play the Theremin!";\n\ndoYouPlayTheTheremin("Sally");\n// OUTPUT: "Sally plays the Theremin!"',
    startingText: 'function doYouPlayTheTheremin(name) {\n  // YOUR CODE HERE\n}',
    planetId: 1
  },
  {
    id: 3,
    name: 'Repeat A String',
    prompt:
      'Create a function "repeat" that accepts two arguments, the string to repeat and the a number that represtents how many times to repeat the string argument.  Return a string that concatenates all the times the string is repeated. *NOTE: Do NOT use the Array.prototype.repeat*',
    solution:
      'function repeat(str, num) {var finalStr = "";for (num; num > 0; num--) { finalStr += str; } return finalStr; }',
    specs: repeatAStringSpecs,
    points: 15,
    skillLevel: 'Easy',
    examples: 'repeat("yo",5);\n// OUTPUT: "yoyoyoyoyo"\n\nrepeat("yo",0);\n// OUTPUT:""\n\nrepeat("bye",3);\n// OUTPUT: "byebyebye"',
    startingText: 'function repeat(str, num) {\n  // YOUR CODE HERE\n}',
    planetId: 1
  },
  {
    id: 4,
    name: 'Vowel Count',
    prompt:
      'Create the function **vowelCount(str)** that takes a **str** parameter and returns the number of vowels the string contains (ie. "Fullstack Academy" would return 5).<br>Do not count "y" as a vowel for this challenge.',
    solution:
      'function vowelCount(string) {var vowels = "aeiou", string = string.toLowerCase(), count = 0; for (var i = 0; i < string.length; i++) { if (vowels.indexOf(string[i]) >= 0) { count++; }}return count;}',
    specs: vowelCountSpecs,
    points: 15,
    skillLevel: 'Easy',
    examples: 'vowelCount("Grace Hopper");\n// OUTPUT: 4\n\nvowelCount("Yellow");\n// OUTPUT: 2',
    startingText: 'function vowelCount(string) {\n  // YOUR CODE HERE\n}',
    planetId: 1
  },
  {
    id: 5,
    name: 'Ask Politely',
    prompt:
      'Create the function askPolitely that accepts a sentence as an argument. If the last character of the sentence is a question mark, then make sure the question ends with the word "please?". If a question is already polite(meaning it already ends with "please") or the sentence is not a question, then return the inputted string without modification.',
    solution:
      'function askPolitely(sentence) {if (sentence.slice(-1) === "?") {if (sentence.slice(-7) === "please?") { return sentence } else { return sentence.slice(0, -1) + " please?"} } else { return sentence } }',
    specs: askPolitelySpecs,
    points: 20,
    skillLevel: 'Medium',
    examples: 'askPolitely("May I borrow your pencil?");\n// OUTPUT: "May I borrow your pencil please?"\n\naskPolitely("May I ask a question please?");\n// OUTPUT: "May I ask a question please?";\n\naskPolitely("My name is Grace Hopper.");\n// OUTPUT: "My name is Grace Hopper."',
    startingText: 'function askPolitely(sentence) {\n  // YOUR CODE HERE\n}',
    planetId: 2
  },
  {
    id: 6,
    name: 'Last Digit',
    prompt:
      'Create the function lastDigit that accepts two non-negative integer values and returns true if they have the same last digit, such as 27 and 57. The function accepts two non-negative integer arguments and returns true or false if they have the same last digit.',
    solution:
      'function lastDigit(num1, num2) {num1 = num1.toString(); num2 = num2.toString(); if (num1[num1.length - 1] === num2[num2.length - 1]) {return true;} else { return false;}}',
    specs: lastDigitSpecs,
    points: 20,
    skillLevel: 'Medium',
    examples: 'lastDigit(22,32);\n// OUTPUT: true\n\nlastDigit(77, 999);\n// OUTPUT: false\n\nlastDigit(33,3);\n// OUTPUT: true',
    startingText: 'function lastDigit(num1, num2) {\n  // YOUR CODE HERE\n}',
    planetId: 2
  },
  {
    id: 7,
    name: 'Nickname Generator',
    prompt:
      `Write a function, nicknameGenerator that takes a string name as an argument and returns the first 3 or 4 letters as that name's nickname! If the 3rd letter is a vowel, return the first 4 letters.`,
    solution:
      'function nicknameGenerator(name) {var nickname = ""; var vowels = "aeiou"; if (vowels.indexOf(name[2]) >= 0) {nickname = name.slice(0,4);} else {nickname = name.slice(0,3);}return nickname;}',
    specs: nicknameGeneratorSpecs,
    points: 30,
    skillLevel: 'Medium',
    examples: 'nicknameGenerator("Daniel")\n// OUTPUT: "Dan"\n\nnicknameGenerator("Beowulf")\n// OUTPUT: "Beow"',
    startingText: 'function nicknameGenerator(name) {\n  // YOUR CODE HERE\n}',
    planetId: 2
  },
  {
    id: 8,
    name: 'My Join',
    prompt:
      `Write the function myJoin that mirrors the behavior of JavaScript's .join() array method.
      However, myJoin will accept the array to operate on as its first parameter, rather than being invoked as a method on that array. Try and mirror the behavior of the native .join() method exactly. If there is no delimiter argument, use a ',' character.
      Note: Do not use the native .join() method in your own implementation! Ignore the values undefined, null, and empty arrays.`,
    solution:
      `function myJoin(arr, delimiter) {if (delimiter === undefined) {delimiter = ",";}var newString = ""; for (var i = 0; i < arr.length; i++) {if (i === arr.length-1) {newString += arr[i];} else {newString += arr[i] + delimiter;}}return newString;}`,
    specs: myJoinSpecs,
    points: 40,
    skillLevel: 'Medium',
    examples: 'myJoin(["hello","world"], " ");\n// OUTPUT:  "hello world"\n\nmyJoin([2, "be", false]);\n// OUTPUT: 2,be,false',
    startingText: 'function myJoin(arr, delimiter) {\n  // YOUR CODE HERE\n}',
    planetId: 2
  },
  {
    id: 9,
    name: 'Is Palindrome',
    prompt:
      `A palindrome is a word that is spelled the same forward and backward. For example, "LEVEL", "RACECAR", and "KAYAK" are all palindromes, while "MOTOR", "RUDDER", and "DOGGED" are not palidromes.
      Write a recursive function, isPalindrome, to check if a string is a palindrome or not.`,
    solution:
      'function isPalindrome(string) {if (string.length <= 1) {return true;} else if (string[0].toLowerCase() === string[string.length-1].toLowerCase()) {return isPalindrome(string.slice(1, string.length-1));} else {return false;}}',
    specs: isPalindromeSpecs,
    points: 50,
    skillLevel: 'Hard',
    examples: 'isPalindrome("Kayak");\n// OUTPUT:  true\n\nisPalindrome("SELFLESS");\n// OUTPUT: false',
    startingText: 'function isPalindrome(string) {\n  // YOUR CODE HERE\n}',
    planetId: 2
  }
]

const planets = [
  {
    id: 1,
    name: 'Puchayria'
  },
  {
    id: 2,
    name: 'Stoxupra'
  },
  {
    id: 3,
    name: 'Aclade'
  },
  {
    id: 4,
    name: 'Ucrion'
  },
  {
    id: 5,
    name: 'Oiyama'
  },
  {
    id: 6,
    name: 'Jastreynov'
  },
]

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  await Promise.all(planets.map(planet => Planet.create(planet)))
  await Promise.all(challenges.map(challenge => Challenge.create(challenge)))

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123', progress: 60 }),
    User.create({ email: 'murphy@email.com', password: '123', progress: 95 })
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
