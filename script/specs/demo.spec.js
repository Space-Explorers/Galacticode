const {expect} = require('chai')

describe('demo', function() {
  it('demo is a function', function() {
    expect(demo).to.be.a('function')
  })

  it('demo returns the string argument it was passed', function() {
    const arg = 'Hello World'
    const returnValue = demo(arg)

    expect(returnValue).to.equal(arg)
  })

  it('demo returns the number argument it was passed', function() {
    const arg = 15
    const returnValue = demo(arg)

    expect(returnValue).to.equal(arg)
  })

  it('demo returns the array argument it was passed', function() {
    const arg = [1, 2, 3]
    const returnValue = demo(arg)

    expect(returnValue).to.equal(arg)
  })
})
