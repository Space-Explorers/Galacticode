describe('greeting', function () {

	it('greeting is a function', function () {
		var functionType = typeof greeting;
		expect(functionType).toEqual('function');
	})

	it('returns a string value', function () {
		var returnValue = greeting(),
			stringType = typeof returnValue;

		expect(stringType).toEqual('string');
	})

	it('returns the string "Hello!" when an argument is NOT passed', function () {
		var returnValue = greeting();

		expect(returnValue).toEqual("Hello!");
	})

	it('returns the string "Hello, Joe!" when an argument IS passed', function () {
		var returnValue = greeting('Joe');

		expect(returnValue).toEqual('Hello, Joe!');
	})

})