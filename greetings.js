module.exports = function Greetings(names) {
	var greetMessage;
	var greetLanguage;
	var greetedNames = names || [];
	var nameOfUser;
	var count = 0;

	function setLanguage(language) {
		greetLanguage = language;
	}

	function getLanguage() {
		return greetLanguage;
	}

	function setGreetMessage() {
		if (getLanguage() === "Sepedi") {
			greetMessage = "Dumela, ";
		}
		if (getLanguage() === "Isizulu") {
			greetMessage = "Sawubona, ";
		}
		if (getLanguage() === "English") {
			greetMessage = "Hello, ";
		}
	}

	function getGreetMessage() {
		return greetMessage;
	}
	function setTheName(name) {
		nameOfUser =
			name.charAt(0).toUpperCase() + name.toLowerCase().slice(1).trim();
	}
	function getTheName() {
		return (
			nameOfUser
		);
	}
	function setNamesGreeted() {
		greetedNames.push(nameOfUser);
	}
	function getNamesGreeted() {
		return greetedNames.length;
	}

	function checkNameExist() {
		if (!greetedNames.includes(nameOfUser)) {
			greetedNames.push(nameOfUser);
		}
		return greetedNames;
	}

	return {
		setLanguage,
		getLanguage,
		setGreetMessage,
		getGreetMessage,
		setTheName,
		getTheName,
		getNamesGreeted,
		setNamesGreeted,
		checkNameExist,
	};
};