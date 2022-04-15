var express=require("express");
var bodyParser=require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");

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

app.post('/sign_up', function(req,res){

  var firstname = req.body.firstname;
	var lastname = req.body.lastname;
  var username = req.body.username;
	var email =req.body.email;
	var pass = req.body.password;
	var phonenumber =req.body.phonenumber;
	var address =req.body.address;
  var IsHelper = req.body.IsHelper;

  var data = {
		"firstname": firstname,
		"lastname": lastname,
    "username" : username,
		"email": email,
		"password":pass,
		"phonenumber":phonenumber,
		"address":address,
    "IsHelper":IsHelper
	}
  

  db.collection('users').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
	});
	return res.redirect('signup_success.html');
})




app.listen(3000,function(){
  console.log("server is running at port 3000");
});
