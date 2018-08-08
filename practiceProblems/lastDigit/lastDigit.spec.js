describe("lastDigit", function () {
	xit("lastDigit is a function", function () {
		var functionType = typeof lastDigit;

		expect(functionType).toEqual("function");
	});

	xit("lastDigit returns a boolean value (true or false)", function () {
		var returnValue = lastDigit(22, 53),
			booleanType = typeof returnValue;

		expect(booleanType).toEqual("boolean");
	});

	xit("if the two number arguments passed to lastDigit have the same last two digits (ones column) return the boolean value true", function () {
		var returnValue = lastDigit(352, 7892);

		expect(returnValue).toEqual(true);
	});

	xit("if the last two digits (ones column) of the number arguments passed to last digit are NOT the same return the boolean value false", function () {
		var returnValue = lastDigit(357, 7894);

		expect(returnValue).toEqual(false);
	});
});