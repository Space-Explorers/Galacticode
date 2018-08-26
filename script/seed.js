'use strict'

const db = require('../server/db')
const fs = require('fs')
var path = require('path')
const { Challenge, Planet } = require('../server/db/models')

const greetingSpecs = fs.readFileSync(
  path.join(__dirname, '/specs/greeting.spec.js'),
  (err, specData) => {
    if (err) throw err
    console.log('read file success!')
    return specData
  }
)
const thereminSpecs = fs.readFileSync(
  path.join(__dirname, '/specs/theremin.spec.js'),
  (err, specData) => {
    if (err) throw err
    console.log('read file success!')
    return specData
  }
)
const repeatAStringSpecs = fs.readFileSync(
  path.join(__dirname, '/specs/repeatString.spec.js'),
  (err, specData) => {
    if (err) throw err
    console.log('read file success!')
    return specData
  }
)
const vowelCountSpecs = fs.readFileSync(
  path.join(__dirname, '/specs/vowelCount.spec.js'),
  (err, specData) => {
    if (err) throw err
    console.log('read file success!')
    return specData
  }
)
const askPolitelySpecs = fs.readFileSync(
  path.join(__dirname, '/specs/askPolitely.spec.js'),
  (err, specData) => {
    if (err) throw err
    console.log('read file success!')
    return specData
  }
)
const lastDigitSpecs = fs.readFileSync(
  path.join(__dirname, '/specs/lastDigit.spec.js'),
  (err, specData) => {
    if (err) throw err
    console.log('read file success!')
    return specData
  }
)
const nicknameGeneratorSpecs = fs.readFileSync(
  path.join(__dirname, '/specs/nicknameGenerator.spec.js'),
  (err, specData) => {
    if (err) throw err
    console.log('read file success!')
    return specData
  }
)
const myJoinSpecs = fs.readFileSync(
  path.join(__dirname, '/specs/myJoin.spec.js'),
  (err, specData) => {
    if (err) throw err
    console.log('read file success!')
    return specData
  }
)
const isPalindromeSpecs = fs.readFileSync(
  path.join(__dirname, '/specs/isPalindrome.spec.js'),
  (err, specData) => {
    if (err) throw err
    console.log('read file success!')
    return specData
  }
)
const demoSpecs = fs.readFileSync(
  path.join(__dirname, '/specs/demo.spec.js'),
  (err, specData) => {
    if (err) throw err
    console.log('read file success!')
    return specData
  }
)

const challenges = [
  {
    id: 1,
    name: 'Greeting',
    prompt: [
      'Create a function "greeting" that accepts a name and returns a personalized greeting if a name is present.',
      'The function takes a name as its only argument, and returns one of the following strings:'
    ],
    solution:
      `function greeting(name) {\n\tif (name) {\n\t\treturn "Hello, " + name + "!";\n\t} else {\n\t\treturn "Hello!";\n\t}\n}`,
    specs: greetingSpecs,
    points: 10,
    skillLevel: 'Easy',
    examples:
      'greeting("Kathy");\n// OUTPUT: "Hello, Kathy!";\n\ngreeting();\n// OUTPUT: "Hello!"',
    startingText: 'function greeting(name) {\n  // YOUR CODE HERE\n}',
    planetId: 1
  },
  {
    id: 2,
    name: 'Do You Play The Theremin?',
    prompt: [
      'Create the function "doYouPlayTheTheremin." If your name starts with the letter "S" or "s", you are playing the Theremin!'
    ],
    solution:
      'function doYouPlayTheTheremin(name) {\n\tif (name[0].toLowerCase() === "s") {\n\t\treturn name + " plays the Theremin!";\n\t} else {\n\t\treturn name + " does not play the Theremin!";\n\t}\n}',
    specs: thereminSpecs,
    points: 10,
    skillLevel: 'Easy',
    examples:
      'doYouPlayTheTheremin("Amy")\n// OUTPUT: "Amy does not play the Theremin!";\n\ndoYouPlayTheTheremin("Sally");\n// OUTPUT: "Sally plays the Theremin!"',
    startingText:
      'function doYouPlayTheTheremin(name) {\n  // YOUR CODE HERE\n}',
    planetId: 1
  },
  {
    id: 3,
    name: 'Repeat A String',
    prompt: [
      'Create a function "repeat" that accepts two arguments, the string to repeat and a number that represents how many times to repeat the string argument. Return a string that concatenates all the times the string is repeated.',
      'NOTE: Do NOT use the Array.prototype.repeat method'
    ],
    solution:
      'function repeat(str, num) {\n\tvar finalStr = "";\n\tfor (num; num > 0; num--) { \n\t\tfinalStr += str; \n\t} \n\treturn finalStr; \n}',
    specs: repeatAStringSpecs,
    points: 20,
    skillLevel: 'Easy',
    examples:
      'repeat("yo",5);\n// OUTPUT: "yoyoyoyoyo"\n\nrepeat("yo",0);\n// OUTPUT:""\n\nrepeat("bye",3);\n// OUTPUT: "byebyebye"',
    startingText: 'function repeat(str, num) {\n  // YOUR CODE HERE\n}',
    planetId: 1
  },
  {
    id: 4,
    name: 'Vowel Count',
    prompt: [
      'Create the function "vowelCount" that takes a string parameter and returns the number of vowels the string contains (i.e. "Fullstack Academy" would return 5).',
      'Do not count "y" as a vowel for this challenge.'
    ],
    solution:
      'function vowelCount(string) {\n\tvar vowels = "aeiou",\n\tstring = string.toLowerCase(),\n\tcount = 0;\n\tfor (var i = 0; i < string.length; i++) {\n\t\tif (vowels.indexOf(string[i]) >= 0) {\n\t\t\tcount++;\n\t\t}\n\t}\n\treturn count;\n}',
    specs: vowelCountSpecs,
    points: 20,
    skillLevel: 'Easy',
    examples:
      'vowelCount("Grace Hopper");\n// OUTPUT: 4\n\nvowelCount("Yellow");\n// OUTPUT: 2',
    startingText: 'function vowelCount(string) {\n  // YOUR CODE HERE\n}',
    planetId: 1
  },
  {
    id: 5,
    name: 'Ask Politely',
    prompt: [
      'Create the function "askPolitely" that accepts a sentence as an argument. If the last character of the sentence is a question mark, then make sure the question ends with the word "please?".',
      'If a question is already polite(meaning it already ends with "please") or the sentence is not a question, then return the inputted string without modification.'
    ],
    solution:
      'function askPolitely(sentence) {\n\tif (sentence.slice(-1) === "?") {\n\t\tif (sentence.slice(-7) === "please?") {\n\t\t\treturn sentence\n\t\t} else {\n\t\t\treturn sentence.slice(0, -1) + " please?"\n\t\t}\n\t} else {\n\t\treturn sentence\n\t}\n}',
    specs: askPolitelySpecs,
    points: 15,
    skillLevel: 'Medium',
    examples:
      'askPolitely("May I borrow your pencil?");\n// OUTPUT: "May I borrow your pencil please?"\n\naskPolitely("May I ask a question please?");\n// OUTPUT: "May I ask a question please?";\n\naskPolitely("My name is Grace Hopper.");\n// OUTPUT: "My name is Grace Hopper."',
    startingText: 'function askPolitely(sentence) {\n  // YOUR CODE HERE\n}',
    planetId: 2
  },
  {
    id: 6,
    name: 'Last Digit',
    prompt: [
      'Create the function "lastDigit" that accepts two non-negative integer values and returns true if they have the same last digit.'
    ],
    solution:
      'function lastDigit(num1, num2) {\n\tnum1 = num1.toString();\n\tnum2 = num2.toString();\n\tif (num1[num1.length - 1] === num2[num2.length - 1]) {\n\t\treturn true;\n\t} else {\n\t\treturn false;\t\n}\n}',
    specs: lastDigitSpecs,
    points: 15,
    skillLevel: 'Medium',
    examples:
      'lastDigit(22,32);\n// OUTPUT: true\n\nlastDigit(77, 999);\n// OUTPUT: false\n\nlastDigit(33,3);\n// OUTPUT: true',
    startingText: 'function lastDigit(num1, num2) {\n  // YOUR CODE HERE\n}',
    planetId: 2
  },
  {
    id: 7,
    name: 'Nickname Generator',
    prompt: [
      `Create a function "nicknameGenerator" that takes a string name as an argument and returns the first 3 or 4 letters as that name's nickname! If the 3rd letter is a vowel, return the first 4 letters instead.`
    ],
    solution:
      'function nicknameGenerator(name) {\n\tvar nickname = "";\n\tvar vowels = "aeiou";\n\tif (vowels.indexOf(name[2]) >= 0) {\n\t\tnickname = name.slice(0,4);\n\t} else {\n\t\tnickname = name.slice(0,3);\n\t}\n\treturn nickname;\n}',
    specs: nicknameGeneratorSpecs,
    points: 20,
    skillLevel: 'Medium',
    examples:
      'nicknameGenerator("Daniel")\n// OUTPUT: "Dan"\n\nnicknameGenerator("Alexandra")\n// OUTPUT: "Alex"',
    startingText: 'function nicknameGenerator(name) {\n  // YOUR CODE HERE\n}',
    planetId: 2
  },
  {
    id: 8,
    name: 'My Join',
    prompt: [
      `Write the function "myJoin" that mirrors the behavior of JavaScript's .join() array method.`,
      `myJoin will accept the array to operate on as its first parameter, rather than being invoked as a method on that array. Try and mirror the behavior of the native .join() method exactly. If there is no delimiter argument, use a ',' character.`,
      `Note: Do not use the native .join() method in your own implementation! Ignore the values undefined, null, and empty arrays.`
    ],
    solution: `function myJoin(arr, delimiter) {\n\tif (delimiter === undefined) {\n\t\tdelimiter = ",";\n\t}\n\tvar newString = "";\n\tfor (var i = 0; i < arr.length; i++) {\n\t\tif (i === arr.length-1) {\n\t\t\tnewString += arr[i];\n\t\t} else {\n\t\t\tnewString += arr[i] + delimiter;\n\t}\n\treturn newString;\n}`,
    specs: myJoinSpecs,
    points: 20,
    skillLevel: 'Medium',
    examples:
      'myJoin(["hello","world"], " ");\n// OUTPUT:  "hello world"\n\nmyJoin([2, "be", false]);\n// OUTPUT: 2,be,false',
    startingText: 'function myJoin(arr, delimiter) {\n  // YOUR CODE HERE\n}',
    planetId: 2
  },
  {
    id: 9,
    name: 'Is Palindrome',
    prompt: [
      `A palindrome is a word that is spelled the same forward and backward. For example, "LEVEL", "RACECAR", and "KAYAK" are all palindromes, while "MOTOR", "RUDDER", and "DOGGED" are not.
      Write a recursive function "isPalindrome" to check if a string is a palindrome or not.`
    ],
    solution:
      'function isPalindrome(string) {\n\tif (string.length <= 1) {\n\t\treturn true;\n\t} else if (string[0].toLowerCase() === string[string.length-1].toLowerCase()) {\n\t\treturn isPalindrome(string.slice(1, string.length-1));\n\t} else {\n\t\treturn false;\n\t}\n}',
    specs: isPalindromeSpecs,
    points: 30,
    skillLevel: 'Hard',
    examples:
      'isPalindrome("Kayak");\n// OUTPUT:  true\n\nisPalindrome("SELFLESS");\n// OUTPUT: false',
    startingText: 'function isPalindrome(string) {\n  // YOUR CODE HERE\n}',
    planetId: 2
  },
  {
    id: 10,
    name: 'Demo',
    prompt: [
      `Write a function "demo" that simply returns the argument passed into it.`
    ],
    solution: 'function demo(value) {\n\treturn value\n}',
    specs: demoSpecs,
    points: 40,
    skillLevel: 'Easy',
    examples:
      'demo("Hello World");\n// OUTPUT:  "Hello World"\n\ndemo(["welcome", "friends", "and", "family"]);\n// OUTPUT: ["welcome", "friends", "and", "family"]',
    startingText: 'function demo(value) {\n  // YOUR CODE HERE\n}',
    planetId: 1
  }
]

const planets = [
  {
    id: 1,
    name: 'Puchayria',
    color: 'Blue',
    unlockedImg: '/Blue_Planet.png'
  },
  {
    id: 2,
    name: 'Stoxupra',
    color: 'Pink',
    unlockedImg: '/Pink_Planet.png'
  },
  {
    id: 3,
    name: 'Aclade',
    color: 'Orange'
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
  }
]

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  await Promise.all(planets.map(planet => Planet.create(planet)))
  await Promise.all(challenges.map(challenge => Challenge.create(challenge)))

  // console.log(`seeded ${users.length} users`)
  console.log(`panets and challenges seeded successfully`)
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
