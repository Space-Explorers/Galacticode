describe('doYouPlayTheTheremin', function () {
	it('doYouPlayTheTheremin is a function', function () {
		var functionType = typeof doYouPlayTheTheremin;

		expect(functionType).toEqual('function');
	});

	it('doYouPlayTheTheremin returns a string value', function () {
		var returnValue = doYouPlayTheTheremin('Zeke'),
			stringType = typeof returnValue;

		expect(stringType).toEqual('string');
	});

	it('if the arguments first character is an uppercase "S" return the string "argument(name) + plays the Theremin!"', function () {
		// return value
		var upperCase = doYouPlayTheTheremin('Scott');

		expect(upperCase).toEqual('Scott plays the Theremin!');
	});

	it('if the arguments first character is a lowercase "s" return the string "argument(name) + plays the Theremin!', function () {
		// return value
		var lowerCase = doYouPlayTheTheremin('stan');

		expect(lowerCase).toEqual("stan plays the Theremin!");
	});

	it('if the arguments first character is not an uppercase or lowercase "s" return the string "argument(name) + does not play the Theremin!', function () {
		var returnValue = doYouPlayTheTheremin("Omri");

		expect(returnValue).toEqual("Omri does not play the Theremin!");
	});
});