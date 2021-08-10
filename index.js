var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const Greetings = require("./greetings");

const app = express();
const greetings = Greetings();

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

app.get("/", (req, res) => {
	res.render("index", {
		 getTheName: greetings.getTheName(),
		getGreetMessage: greetings.getGreetMessage(),
		countGreetedNames: greetings.countGreetedNames(),
	});
});

app.post("/greetings", (req, res) => {
	let theName = greetings.setTheName(req.body.name);
	greetings.setLanguage(req.body.language);
	greetings.setGreetMessage();
	// greetings.setNamesGreeted();
	greetings.countGreetedNames();

	greetings.checkNameExist();
	res.redirect("/");
});
app.get("/greeted", (req, res) => {
	res.render("greeted");
	// res.redirect("/");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("This App is listening on port:", port);
});
