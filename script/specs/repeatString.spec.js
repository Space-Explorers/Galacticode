const chai = require('chai')
const sinon = require('sinon')
const expect = chai.expect
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

describe('repeat', function() {
  it('is a function', function() {
    expect(repeat).to.be.a('function')
  })

  it('is empty with 0 repeats', function() {
    const returnValue = repeat('yo', 0)
    expect(returnValue).to.equal('')
  })

  it('repeats its argument once', function() {
    const returnValue = repeat('yo', 1)
    expect(returnValue).to.equal('yo')
  })

  it('repeats its argument twice', function() {
    const returnValue = repeat('yo', 2)
    expect(returnValue).to.equal('yoyo')
  })

  it('repeats its argument many times', function() {
    const returnValue = repeat('yo', 10)
    expect(returnValue).to.equal('yoyoyoyoyoyoyoyoyoyo')
  })

  it('does not use the String.prototype.repeat method', function() {
    const spy = sinon.spy(String.prototype, 'repeat')
    repeat('yo', 3)
    expect(spy).not.to.have.been.called
  })
})
