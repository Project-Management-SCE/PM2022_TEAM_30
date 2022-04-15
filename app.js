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

//////////////////////////////////////////////sign up as a user///////////////////////////////////////////////////
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
  if (req.body.IsHelper) {
    var Supported_Areas =req.body.Supported_Areas;
    var cost_per_hour =req.body.cost_per_hour;
    var Desc =req.body.Desc;
    var data = {
      "firstname": firstname,
      "lastname": lastname,
      "username" : username,
      "email": email,
      "password":pass,
      "phonenumber":phonenumber,
      "address":address,
      "IsHelper":IsHelper,
      "Supported_Areas": Supported_Areas,
      "cost_per_hour": cost_per_hour,
      "Desc" : Desc
    }
}

  db.collection('users').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
	});
	return res.redirect('signup_success.html');
})

//This reponds a post request for the login page
app.post('/login', function (req, res) {
  console.log("Got a POST request for the login");
//  data = {
  //    "email": req.body.email,
    //  "password": req.body.password
     //};
	data.email=req.body.email;
	data.password=req.body.password;


console.log(check);
  console.log(data);
});
  //Data insertion code


			app.get('/login', function (req, res){
				var MongoClient = require('mongodb').MongoClient;
			  var url = "mongodb://localhost:27017/";
				var user_analyzer="";

			  MongoClient.connect(url, function(err, db) {
			      if (err) throw err;
			      var dbo = db.db("EVwaze");
			      var query = { email: data.email };
			      console.log(query);
						console.log(data);
if (data.email==null || data.password==null){
	res.redirect('/Sign-in.html');
	console.log("faild login");
}//////////////////////////////////admin

			 /////////////////////////////////////////////////////
			 else{console.log(query);

         dbo.collection("users").find(query).toArray(function(err, result) {
             if (err) throw err;
             console.log(result);
             if(result[0].password == data.password){
                 if(result[0].IsHelper == null){
                   console.log("success login an user ");
									 user_analyzer="user";
									res.render('Home_user',{style:'Home_user.css' , username: result[0].username} )
								 }
              /////////////////////////////////helper
							/////////////////////////////////
            else{

                 res.redirect('/Sign-in.html');
                 console.log("faild login");
             }
             db.close();

         });

			 }//end else
}

  });//end mongo client

});//end



app.listen(3000,function(){
  console.log("server is running at port 3000");
});
