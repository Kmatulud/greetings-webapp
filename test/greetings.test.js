const assert = require("assert");
const Greetings = require("../greetings");

describe("The Greetings Project", function () {
	const greetingfactory = Greetings();
	describe("Setting The Values", function () {
		it("should greet user with their name", function () {
			greetingfactory.setTheName("kgotso");
			assert.equal("Kgotso", greetingfactory.getTheName());
		});
		it("should greet different user with their name", function () {
			greetingfactory.setTheName("KAMOGELO");
			assert.equal("Kamogelo", greetingfactory.getTheName());
		});

		it("should be able to set language of greeting to Sepedi", () => {
			greetingfactory.setLanguage("sepedi");

			assert.equal("sepedi", greetingfactory.getLanguage());
		});

		it("should be able to set language of greeting to IsiZulu", () => {
			greetingfactory.setLanguage("zulu");

			assert.equal("zulu", greetingfactory.getLanguage());
		});

		it("should be able to set language of greeting to English", () => {
			greetingfactory.setLanguage("english");

			assert.equal("english", greetingfactory.getLanguage());
		});
	});
	describe("Using The Values", function () {
		it("should greet user in Sepedi if sepedi radio is chosen", function () {
			greetingfactory.setLanguage("Sepedi");
			greetingfactory.setGreetMessage();
			assert.equal("Dumela, ", greetingfactory.getGreetMessage());
		});
		it("should greet user in Isizulu if isizulu radio is chosen", function () {
			greetingfactory.setLanguage("Isizulu");
			greetingfactory.setGreetMessage();
			assert.equal("Sawubona, ", greetingfactory.getGreetMessage());
		});
		it("should greet user in English if english radio is chosen", function () {
			greetingfactory.setLanguage("English");
			greetingfactory.setGreetMessage();
			assert.equal("Hello, ", greetingfactory.getGreetMessage());
		});
		it("should store all the names greeted in an array", function () {
			greetingfactory.setTheName("Kgotso");
			greetingfactory.getTheName();
			greetingfactory.checkNameExist();
			greetingfactory.setTheName("Sane");
			greetingfactory.getTheName();
			greetingfactory.checkNameExist();
			greetingfactory.setTheName("Lesedi");
			greetingfactory.getTheName();
			greetingfactory.checkNameExist();
			greetingfactory.setTheName("Kabelo");
			greetingfactory.getTheName();
			greetingfactory.checkNameExist();

			greetingfactory.setTheName("Lebo");
			greetingfactory.getTheName();
			greetingfactory.checkNameExist();
			greetingfactory.setTheName("Sibo");
			greetingfactory.getTheName();
			greetingfactory.checkNameExist();
			greetingfactory.setTheName("Winny");
			greetingfactory.getTheName();
			greetingfactory.checkNameExist();
			greetingfactory.setTheName("Thabo");
			greetingfactory.getTheName();
			greetingfactory.checkNameExist();

			assert.deepEqual(
				[
					"Kgotso",
					"Sane",
					"Lesedi",
					"Kabelo",
					"Lebo",
					"Sibo",
					"Winny",
					"Thabo",
				],
				greetingfactory.checkNameExist()
			);
		});
	});
});
