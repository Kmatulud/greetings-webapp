module.exports = function Greetings(pool) {
	var greetMessage;
	var greetLanguage;
	var nameOfUser = "";

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
	async function setTheName(name) {
		nameOfUser = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1).trim();
		await pool.query(
			"insert into users values($1)",
			[nameOfUser]
		);
	}
	function getTheName() {
		return (
			nameOfUser
		);
	}
	async function nameCount() {
		var names = await pool.query("select count(distinct user_name) from users");
		return names.rows[0].count;
	}
	async function greetingCount() {
		let count = await pool.query("select count(*) from users where user_name=$1", [nameOfUser]);
		return count.rows[0].count;
	}
	async function nameList() {
		var data = await pool.query("select distinct user_name from users");
		return data.rows;
	}
	
	async function removeUsers(req, res) {
		await pool.query('delete from users');
	}

	return {
		setLanguage,
		getLanguage,
		setGreetMessage,
		getGreetMessage,
		setTheName,
		getTheName,
		removeUsers,
		greetingCount,
		nameCount,
		nameList
	};
};