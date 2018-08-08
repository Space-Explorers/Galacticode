const { expect } = require('chai')

function lastDigit(num1, num2) {
	num1 = num1.toString();
	num2 = num2.toString();

	if (num1[num1.length - 1] === num2[num2.length - 1]) {
		return true;
	} else {
		return false;
	}
}


describe("lastDigit", function () {
	it("lastDigit is a function", function () {
		expect(lastDigit).to.be.a("function");
	});

	it("lastDigit returns a boolean value (true or false)", function () {
		var returnValue = lastDigit(22, 53)

		expect(returnValue).to.be.a("boolean");
	});

	it("if the two number arguments passed to lastDigit have the same last two digits (ones column) return the boolean value true", function () {
		var returnValue = lastDigit(352, 7892);

		expect(returnValue).to.equal(true);
	});

	it("if the last two digits (ones column) of the number arguments passed to last digit are NOT the same return the boolean value false", function () {
		var returnValue = lastDigit(357, 7894);

		expect(returnValue).to.equal(false);
	});
});
