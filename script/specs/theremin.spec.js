const {expect} = require('chai')

describe('doYouPlayTheTheremin', function() {
  it('doYouPlayTheTheremin is a function', function() {
    expect(doYouPlayTheTheremin).to.be.a('function')
  })

  it('doYouPlayTheTheremin returns a string value', function() {
    const returnValue = doYouPlayTheTheremin('Zeke'),
      typeOf = typeof returnValue

    expect(typeOf).to.be.a('string')
  })

  it('if the arguments first character is an uppercase "S" return the string "argument(name) + plays the Theremin!"', function() {
    const upperCase = doYouPlayTheTheremin('Scott')

    expect(upperCase).to.equal('Scott plays the Theremin!')
  })

  it('if the arguments first character is a lowercase "s" return the string "argument(name) + plays the Theremin!', function() {
    const lowerCase = doYouPlayTheTheremin('stan')

    expect(lowerCase).to.equal('stan plays the Theremin!')
  })

  it('if the arguments first character is not an uppercase or lowercase "s" return the string "argument(name) + does not play the Theremin!', function() {
    const returnValue = doYouPlayTheTheremin('Omri')

    expect(returnValue).to.equal('Omri does not play the Theremin!')
  })
})
