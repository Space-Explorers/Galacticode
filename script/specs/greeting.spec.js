const {expect} = require('chai')

describe('greeting', function() {
  it('greeting is a function', function() {
    expect(greeting).to.be.a('function')
  })

  it('returns a string value', function() {
    const returnValue = greeting(),
      typeOf = typeof returnValue

    expect(typeOf).to.be.a('string')
  })

  it('returns the string "Hello!" when an argument is NOT passed', function() {
    const returnValue = greeting()

    expect(returnValue).to.equal('Hello!')
  })

  it('returns the string "Hello, Joe!" when an argument IS passed', function() {
    const returnValue = greeting('Joe')

    expect(returnValue).to.equal('Hello, Joe!')
  })
})
