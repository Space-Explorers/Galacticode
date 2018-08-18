describe('vowelCount', function () {
	it('vowelCount is a function', function () {
		expect(typeof vowelCount).toEqual('function');
	});

	it('vowelCount returns a number value', function () {
		expect(typeof vowelCount("Grace Hopper")).toEqual('number');
	});

	it('returns the total amount of vowels in the string argument', function () {
		expect(vowelCount('JavaScript')).toEqual(3);
		expect(vowelCount('Angular')).toEqual(3);
		expect(vowelCount('New York City')).toEqual(3);
	});

});