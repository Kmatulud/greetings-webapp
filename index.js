const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const GreetMe = require("./routes/routes")
const flash = require("express-flash");
const session = require("express-session");

const app = express();

const pg = require("pg");
const Pool = pg.Pool;

// // which db connection to use
const connectionString =
	process.env.DATABASE_URL ||
	"postgres://jflgvlaykiztti:bd6e9b2986f57e9445790e42484f9a38c6c6e9ee36b97634e97d7651a3bb959a@ec2-34-203-91-150.compute-1.amazonaws.com:5432/d7p9oilcmevko";
const pool = new Pool({
	connectionString,
	ssl: { rejectUnauthorized: false},
});

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


// const greetings = Greetings();
const greetMe = GreetMe();

app.get("/", greetMe.home);
app.get("/greeted", greetMe.greeted);
app.get("/counter", greetMe.greetedCount);
app.post("/greetings", greetMe.greetingMsg);
app.get("/delete", greetMe.deleteUsers);
app.get("/delete", greetMe.deleteUsers);
app.get("/back", greetMe.back);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("This App is listening on port:", PORT);
});