const {expect} = require('chai')

describe('askPolitely', function() {
  it('askPolitely is a function', function() {
    expect(askPolitely).to.be.a('function')
  })

  it('askPolitely returns a string value', function() {
    var returnValue = askPolitely('May I borrow your pencil please?'),
      typeOf = typeof returnValue

    expect(typeOf).to.be.a('string')
  })

  it("if the string argument's last character is a '?', the last word should be please", function() {
    var returnValue = askPolitely('May I borrow your pencil?')
    let lastWord = ''
    if (returnValue.slice(-1) === '?') {
      lastWord = returnValue.slice(-7, -1)
    }

    expect(lastWord).to.equal('please')
  })

  it("if the string argument's last character is a '?', and the last word is please, return the sentence without modifications", function() {
    let inputStr = 'May I borrow your pencil please?'
    let returnValue = askPolitely(inputStr)
    expect(inputStr).to.equal(returnValue)
  })

  it("if the last character is not a '?', do not modify the sentence", function() {
    let inputStr = 'I have a pencil.'
    let returnValue = askPolitely(inputStr)
    expect(inputStr).to.equal(returnValue)
  })
})
