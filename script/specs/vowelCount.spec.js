const {expect} = require('chai')

describe('vowelCount', function() {
  it('vowelCount is a function', function() {
    const typeOf = typeof vowelCount
    expect(typeOf).to.equal('function')
  })

  it('vowelCount returns a number value', function() {
    const returnValue = vowelCount('Grace Hopper')
    const typeOf = typeof returnValue
    expect(typeOf).to.equal('number')
  })

  it('returns the total amount of vowels in the string argument', function() {
    expect(vowelCount('JavaScript')).to.equal(3)
    expect(vowelCount('Angular')).to.equal(3)
    expect(vowelCount('New York City')).to.equal(3)
  })
})
