const Greetings = require("../greetings");
const greetings = Greetings();
const pg = require("pg");
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
	useSSL = true;
}
// which db connection to use
const connectionString =
	process.env.DATABASE_URL ||
	"postgresql://postgres:3201@localhost:5432/greetingswebapp";
const pool = new Pool({
	connectionString,
	ssl: useSSL,
});

module.exports = function GreetMe() {
	async function home(req, res) {
		var data = await pool.query("select * from users");
		var newdata = data.rows[data.rows.length - 1];
		var names = [];
		data.rows.forEach((obj) => {
			if (names.indexOf(obj.user_name) === -1) {
				names.push(obj.user_name);
			} else {
			}
		});
		try {
			res.render("index", {
				getTheName: newdata.user_name,
				language: newdata.greet_msg,
				countGreetedNames: names.length,
			});
		} catch (error) {
			// res.render("index", { countGreetedNames: names.length });
			console.log(error)

		}
	}
	let greeted = async function (req, res) {
		var data = await pool.query("select * from users");
		var newdata = data.rows;

		try {
			res.render("greeted", {
				nameList: newdata,
			});
		} catch (error) {
			// res.render("greeted");
			console.log(error)

		}
	};
	async function greetedCount(req, res) {
		var data = await pool.query("select * from users");
		var newdata = data.rows;
		try {
			res.render("counter", {
				namesList: newdata,
			});
		} catch (error) {
			// res.render("counter");
			console.log(error)
		}
	}

	async function greetMsg(req, res) {
		greetings.setTheName(req.body.name);
		greetings.setLanguage(req.body.language);

		greetings.setGreetMessage();
		let greetMsg = greetings.getGreetMessage();

		// let count = greetings.countGreetedNames();
		let getTheName = greetings.getTheName();

		let language = greetings.getLanguage();
		var checkName = await pool.query(
			"select user_name from users where user_name = $1",
			[getTheName]
		);
			if (checkName.rowCount < 1) {
				await pool.query(
					"insert into users(user_name, greet_msg, counter)values($1,$2,$3)",
					[getTheName, greetMsg, 1]
				);
			} else {
				await pool.query(
					"update users set counter=counter+1 where user_name = $1",
					[getTheName]
				);
			}
		
		greetings.setNamesGreeted(req.body.name);
		res.redirect("/");
	}

	async function deleteUsers(req, res) {
		await pool.query("delete from users");
		res.redirect("/");
	}
    // async function validName(){
    //     if (getTheName === "") {
	// 		req.flash("error", "Please enter your name!");
	// 	} else if (language === undefined) {
	// 		req.flash("error", "Please choose a language!");
	// 		}
    //     }
    return {
			home,
			greeted,
			greetedCount,
			greetMsg,
			deleteUsers,
			// validName,
		};
};
