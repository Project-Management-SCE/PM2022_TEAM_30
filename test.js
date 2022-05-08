// console.log("Success");
const app = require('./app');

	
describe("Testing", () => {
	test("Creating user" {
		const response = await request(app).post("/User").send({style:'Home_user.css',firstnamex : "user1",lastnamex :" aa"});
		exepct(response.statusCode).toEqual(200);
	})
})
