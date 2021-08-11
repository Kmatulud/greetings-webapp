module.exports = function Greetings() {
	var greetMessage;
	var greetLanguage;
	var greetedNames = [];
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
			name.charAt(0).toUpperCase() + nameOfUser.toLowerCase().slice(1);
	}
	function getTheName() {
		return (
			nameOfUser
		);
	}
	// function setNamesGreeted(theNames) {
	// 	greetedNames.push(theNames);
	// }
	// function getNamesGreeted() {
	// 	return greetedNames;
	// }

	function checkNameExist() {
		if (!greetedNames.includes(nameOfUser)) {
			greetedNames.push(nameOfUser);
		}
		return greetedNames;
	}

	function countGreetedNames() {
		count = greetedNames.length;
		return count;
	} 

	return {
		setLanguage,
		getLanguage,
		setGreetMessage,
		getGreetMessage,
		setTheName,
		getTheName,
		// getNamesGreeted,
		// setNamesGreeted,
		checkNameExist,
		countGreetedNames,
	};
};