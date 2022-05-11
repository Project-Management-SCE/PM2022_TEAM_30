// console.log("Success");
const app = require('./app');

	
// describe("Testing", () => {
// 	test("Creating user",async()=> {
// 		const response = await request(app).post("/User").send({style:'Home_user.css',firstnamex : "user1",lastnamex :" aa"});
// 		exepct(response.statusCode).toEqual(200);
// 	})
// })

describe('GET /sign_up', function(){
  it('respond with json', function(done){
    request(app)
      .get('/sign_up')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
      .expect(200, done);
  })
})
