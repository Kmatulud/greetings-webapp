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
        
        await greetings.setNamesGreeted("Kgotso")
        await greetings.setNamesGreeted("Nape")
        assert.equal(1, await greetings.getNamesGreeted())
    });
    it('should test for duplicate names in the database', async ()=> {
        await greetings.setNamesGreeted("Nape")
        await greetings.setNamesGreeted("Nape")
        assert.equal(1, await greetings.getNamesGreeted())
    });
    it('should count how many times each user has been greeted', async ()=> {
        await greetings.setNamesGreeted("joe")
        await greetings.setNamesGreeted("joe")
        await greetings.setNamesGreeted("joe")

        assert.equal(1, await greetings.getNamesGreeted())
    });
    // it('should be able to reset the database', async ()=> {
    //     await greetings.setNamesGreeted("kgotso")
    //     assert.strictEqual("kgotso", await greetings.deleteNames())
    // });
});