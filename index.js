var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var dotenv = require("dotenv").config();
var GreetMe = require("./routes/routes")
const flash = require("express-flash");
const session = require("express-session");


let greetMe = GreetMe();

const app = express();

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

app.get("/", greetMe.home);
app.get("/greeted", greetMe.greeted);
app.get("/counter", greetMe.greetedCount);
app.post("/greetings", greetMe.greetMsg);
app.get("/delete", greetMe.deleteUsers);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("This App is listening on port:", PORT);
});
