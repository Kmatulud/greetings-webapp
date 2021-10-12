const Greetings = require("../greetings");

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
	"ec2-34-203-91-150.compute-1.amazonaws.com://jflgvlaykiztti:3201@localhost:bd6e9b2986f57e9445790e42484f9a38c6c6e9ee36b97634e97d7651a3bb959a/d7p9oilcmevko";
const pool = new Pool({
	connectionString,
	ssl: useSSL,
});

const greetings = Greetings(pool);

module.exports = function GreetMe() {
	const home = async (req, res, next) => {
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
			res.render("index", { countGreetedNames: names.length });
			// console.log(error)

		}

	}
	let greeted = async function (req, res, next) {
		var data = await pool.query("select * from users");
		var newdata = data.rows;

		try {
			res.render("greeted", {
				nameList: newdata,
			});
		} catch (error) {
			res.render("greeted");
			// console.log(error)

		}
	};
	 const greetedCount = async (req, res, next) => {
		var data = await pool.query("select * from users");
		var newdata = data.rows;
		try {
			res.render("counter", {
				namesList: newdata,
			});
		} catch (error) {
			res.render("counter");
			// console.log(error)
		}
	}

	const greetingMsg = async (req, res) => {
		greetings.setTheName(req.body.name);
		greetings.setLanguage(req.body.language);
        greetings.setGreetMessage();

		let getTheName = greetings.getTheName();
		let greetMsg = greetings.getGreetMessage();

		let language = greetings.getLanguage();
		if(!language && getTheName == ""){
            req.flash('error', 'Please enter name and language')
            res.redirect("/")
            return
        }else if(getTheName == ""){
            req.flash('error', 'Please enter your name')
            res.redirect("/")
            return
        }else if(!language){
            req.flash('error', 'Please a choose language')
            res.redirect("/")
            return
        }else if(!getTheName.match(/^[a-zA-Z]{3,15}$/gi)){
            req.flash('error', 'Please enter a valid name')
            res.redirect("/")
            return
        }
		
		
		
		
		
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
		res.redirect("/");
	}

	 const deleteUsers = async (req, res) => {
		await pool.query("delete from users");
		res.redirect("/");
	}
	async function countGreetedNames() {
		let names = await pool.query("select * from users")
		return names.rowCount;
	}
	async function countGreetMsg(){
		let count = await pool.query("select counter from users where name=$1", [user_name])
		return count.rows[0].count;
	}
    return {
			home,
			greeted,
			greetedCount,
			greetingMsg,
			deleteUsers,
			countGreetedNames,
			countGreetMsg,
		};
};
