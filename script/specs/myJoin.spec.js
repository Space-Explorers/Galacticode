const {expect} = require('chai')

describe('myJoin', function() {
  it('is a function', function() {
    expect(myJoin).to.be.a('function');
  });

  it('accepts an array argument and returns a string', function() {
    var returnValue = myJoin([]);
    expect(returnValue).to.equal('');
  });

  it('takes each value from the array and places the values in their same position as a string', function() {
    var returnValue = myJoin(['iced', 'coffee', 2]);
    expect(returnValue).to.equal('iced,coffee,2');
  });

  it('separates the values in the string with the second argument (the delimiter', function() {
    var returnValue = myJoin([1, 2, 3], '+');
    expect(returnValue).to.equal('1+2+3');
  });
});
