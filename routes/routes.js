const Greetings = require("../greetings");

const pg = require("pg");
const Pool = pg.Pool;

// which db connection to use
const connectionString =
	process.env.DATABASE_URL ||
	"postgres://jflgvlaykiztti:bd6e9b2986f57e9445790e42484f9a38c6c6e9ee36b97634e97d7651a3bb959a@ec2-34-203-91-150.compute-1.amazonaws.com:5432/d7p9oilcmevko";
const pool = new Pool({
	connectionString,
	ssl: { rejectUnauthorized: false},
});

const greetings = Greetings(pool);

module.exports = function GreetMe() {

	const home = async(req, res)=>{
		greetings.nameCount()
		.then(result => {
			res.render('index',{
				getTheName: greetings.getTheName(),
				language: greetings.getGreetMessage(),
				countGreetedNames: result
			})
			
		})
		.catch(error => console.log(error))
	}

	async function greeted(req, res) {
		greetings.nameList()
			.then(result => {
				res.render('greeted', {
					nameList: result
				});
			})
			.catch(error => console.log(error));
	}

	async function greetedCount(req, res) {
		greetings.greetingCount()
			.then(result => {
				res.render('counter', {
					greetedName: greetings.getTheName(),
					greetCount: result
				});
			})
			.catch(error => console.log(error));
	}
	async function greetingMsg(req, res) {
		greetings.setTheName(req.body.name);
		greetings.setLanguage(req.body.language);
		greetings.setGreetMessage();

		let getTheName = greetings.getTheName();
		let greetMsg = greetings.getGreetMessage();

		let language = greetings.getLanguage();
		if (!language && getTheName == "") {
			req.flash('error', 'Please enter name and language');
			res.redirect("/");
			return;
		} else if (getTheName == "") {
			req.flash('error', 'Please enter your name');
			res.redirect("/");
			return;
		} else if (!language) {
			req.flash('error', 'Please a choose language');
			res.redirect("/");
			return;
		} else if (!getTheName.match(/^[a-zA-Z]{3,15}$/gi)) {
			req.flash('error', 'Please enter a valid name');
			res.redirect("/");
			return;
		}
		res.redirect("/");
	}

	async function deleteUsers(req, res) {
		greetings.removeUsers();
		req.flash('error', 'reset successful');
		res.redirect('/');
	}
	function back(req, res) {
		res.redirect("/");
	}
    return {
			home,
			back,
			greeted,
			greetedCount,
			greetingMsg,
			deleteUsers,
		};
};
