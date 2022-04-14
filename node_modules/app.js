var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/EVwaze');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})





const app = express();
app.use(express.static('views'));

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));


app.set("view engine","ejs");
app.get('/', function (req, res) {


  res.render('Home',{style:'Home.css'} );

});

app.get('/succeeded-signup',(req,res) => {
	res.send('regestred Successfully');
});

app.post('/sign_up', function(req,res){
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email =req.body.email;
	var pass = req.body.password;
	var phone =req.body.phone;
	var address =req.body.address;

	var data = {
		"firstname": firstname,
		"lastname": lastname,
		"email":email,
		"password":pass,
		"phone":phone,
		"address":address
	}
    db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");

	});

	return res.redirect('Home');
})



/*
const http=require('http');
const server =http.createServer((req,res) => {
	console.log('request made');
});

server.listen(3000,'localhost',()=>{
	console.log("server is running at port 3000");
});
*/



app.listen(3000,function(){
  console.log("server is running at port 3000");
});
