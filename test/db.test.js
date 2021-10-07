const assert = require("assert");
const Greetings = require("../greetings");
const GreetMe = require("../routes/routes")


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

const greetings = Greetings(pool);
const greetMe = GreetMe(pool);

describe('The greetings app database tests', function () {

    it('should set the names and get them from database', async ()=> {
        await greetings.setTheName("Kgotso")
        assert.deepEqual("Kgotso", greetings.getTheName())
    });
    it('should count the names in the database', async ()=> {
        await greetings.setTheName("Kgotso")
        await greetings.setTheName("Nape")
        greetings.getNamesGreeted();
        assert.equal(2, await greetMe.countGreetedNames())
    });
    it('should test for duplicate names in the database', async ()=> {
        await greetings.setTheName("Nape")
        await greetings.setTheName("Nape")
        assert.equal(1, await greetMe.countGreetedNames())
    });
    it('should count how many times each user has been greeted', async ()=> {
        await greetings.setTheName("joe")
        await greetings.setTheName("joe")
        await greetings.setTheName("joe")

        greetings.getTheName()
        assert.equal(3, await greetMe.countGreetedNames())
    });
    it('should be able to reset the database', async ()=> {
        await greetings.setTheName("Blessed")
        greetMe.deleteUsers();
        assert.equal(0, await greetMe.countGreetedNames())
    });
});