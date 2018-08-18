describe("repeat", function () {
	it("is empty with 0 repeats", function () {
		expect(repeat("yo", 0)).toEqual("");
	});
	it("repeats its argument once", function () {
		expect(repeat("yo", 1)).toEqual("yo");
	});
	it("repeats its argument twice", function () {
		expect(repeat("yo", 2)).toEqual("yoyo");
	});
	it("repeats its argument many times", function () {
		expect(repeat("yo", 10)).toEqual("yoyoyoyoyoyoyoyoyoyo");
	});
	it('does not use the String.prototype.repeat method', function () {
		spyOn(String.prototype, 'repeat').and.callThrough();

		repeat('yo', 3);

		expect(String.prototype.repeat.calls.any()).toEqual(false);
	});
});