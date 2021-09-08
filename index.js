var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const Greetings = require("./greetings");
const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
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

const app = express();
const greetings = Greetings();

app.use(express.static("public"));
app.use(express.static("views"));

const handlebarSetup = exphbs({
	partialsDir: "./views/partials",
	viewPath: "./views",
	layoutsDir: "./views/layouts",
});
app.engine("handlebars", handlebarSetup);
app.set("view engine", "handlebars");

app.use(
	session({
		secret: "Se ke string saka",
		resave: false,
		saveUninitialized: true,
	})
);
// initialise the flash middleware
app.use(flash());

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());

app.get("/", async function(req, res){
	var data = await pool.query('select * from users')
	var newdata = data.rows[data.rows.length-1]
	var names = [];
	data.rows.forEach((obj)=>{
		if(names.indexOf(obj.user_name) === -1){
			names.push(obj.user_name)
		}else{

		}
	})
	try {
			res.render("index", {
				getTheName: newdata.user_name,
				language: newdata.greet_msg,
				// getGreetMessage: greetings.getGreetMessage(),
				countGreetedNames: names.length,
			});
	} catch (error) {
		 res.render("index", {countGreetedNames: names.length});

	}


});
app.get("/greeted", async function(req, res){
	var data = await pool.query('select * from users')
	var newdata = data.rows
	console.log(data.rows)
	var names = [];
	
	try {
		res.render("greeted", {
			nameList: newdata,
			getTheName: newdata.user_name,
			language: newdata.greet_msg,
		});
	} catch (error) {
		res.render("greeted");
	}
});
app.post("/greetings", async function(req, res){
	greetings.setTheName(req.body.name);
	greetings.setLanguage(req.body.language);

	greetings.setGreetMessage();
	let greetMsg = greetings.getGreetMessage();

	let count = greetings.countGreetedNames();
	let getTheName = greetings.getTheName();

	let language = greetings.getLanguage();
	if (getTheName && getTheName !== "") {
		console.log(getTheName, greetMsg, count);
		await pool.query(
			'insert into users (user_name, greet_msg, counter) values ($1, $2, $3)',
			[getTheName, greetMsg, count]
		)
	}
	if (getTheName === "") {
		req.flash("error", "Please enter your name!");
	} else if (language === undefined) {
		req.flash("error", "Please choose a language!");
	}

	
	greetings.setNamesGreeted(req.body.name);
	res.redirect("/");
});
app.get('/delete', async function(req, res){
		await pool.query(
			'delete from users'
		)
	res.redirect('/');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("This App is listening on port:", PORT);
});
