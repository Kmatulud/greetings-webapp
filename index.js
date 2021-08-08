var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
const Greetings = require("./greetings")

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

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());


app.get('/', (req, res)=>{
    res.render("index", {
			getTheName: greetings.getTheName(),
			getGreetMessage: greetings.getGreetMessage(),
			countGreetedNames: greetings.countGreetedNames(),
            
		});
});

app.post("/greetings", (req, res) => {
	greetings.setTheName(req.body.name);
	greetings.setLanguage(req.body.language);
	greetings.setGreetMessage();
	// greetings.setNamesGreeted();
	greetings.countGreetedNames();
    
	greetings.checkNameExist()
	res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("This App is listening on port:", PORT);
});