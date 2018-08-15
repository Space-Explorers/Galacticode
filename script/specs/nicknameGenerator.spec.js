const {expect} = require('chai')

describe('nicknameGenerator', function() {
  it('is a function', function() {
    expect(nicknameGenerator).to.be.a('function');
  });

  it('returns a string', function() {
    var returnValue = nicknameGenerator('Casey')
    expect(returnValue).to.be.a('string');
  });

  it('returns the argument if the length is 3 or less', function() {
    var returnValue = nicknameGenerator('Joe');
    expect(returnValue).to.equal('Joe');
  });

  it('returns first three letters of the argument string', function() {
    var returnValue = nicknameGenerator('Daniel');
    expect(returnValue).to.equal('Dan');
  });

  it('returns the first 4 letters if the third letter is a vowel', function() {
    var returnValue = nicknameGenerator('Beowulf');
    expect(returnValue).to.equal('Beow');
  });
});
