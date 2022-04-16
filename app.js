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
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var check=false;
var data={
		"email": null,
		"password": null

};
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
}
else{
			if (data.email == "admin" && data.password == "1234"){
				user_analyzer="admin";
				res.render('Home_Admin',{style:'Home_Admin.css'} );

         console.log("success login an admin");
       }
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
                 else{
								 user_analyzer="helper";
								 res.render('Home_helper',{style:'Home_helper.css' , username: result[0].username} )
                   console.log("success login an helper");
                 }
							 }
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






app.post("/email", function(request, response) {
  // create reusable transporter object using the default SMTP transport
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: "abbasmohammeds2.ma@gmail.com", // this should be YOUR GMAIL account
			pass: "qkqwywipqowxkpmf" // this should be your password
		}
	});

	var textBody = `FROM: ${request.body.name} EMAIL: ${request.body.email} MESSAGE: ${request.body.message}`;
	var htmlBody = `<h2>Mail From Contact Form</h2><p>from: ${request.body.name} <a href="mailto:${request.body.email}">${request.body.email}</a></p><p>${request.body.message}</p>`;
	var mail = {
		from: request.body.name, // sender address
		to: "abbasmohammeds2.ma@gmail.com", // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
		subject: "Mail From Contact Form", // Subject line
		text: textBody,
		html: htmlBody
	};
	// send mail with defined transport object
	transporter.sendMail(mail, function (err, info) {

		if(err) {
			console.log(err);
			response.json({ message: "message not sent: an error occured; check the server's console log" });
		}
		else {
      console.log("HELLO");
			response.json({ message: `message sent: ${info.messageId}` });
		}
	});
});

app.get("/new-password",function(req,res){
  res.render('new-password',{style:'new-password.css'} );

});



app.post("/forget", function(request, response) {
  // create reusable transporter object using the default SMTP transport
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: "abbasmohammeds2.ma@gmail.com", // this should be YOUR GMAIL account
			pass: "qkqwywipqowxkpmf" // this should be your password
		}
	});
  global.globalString = request.body.email;
	var textBody = `To reset your password, please click on this link: http://localhost:3000/new-password  `;
	var mail = {
		from: "abbasmohammeds2.ma@gmail.com", // sender address
		to: request.body.email, // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
		subject: "Rest a Password", // Subject line
		text: textBody,
	};
	// send mail with defined transport object
	transporter.sendMail(mail, function (err, info) {

		if(err) {
			console.log(err);
			response.json({ message: "message not sent: an error occured; check the server's console log" });
		}
		else {
      console.log("HELLO");
			response.json({ message: `message sent: ${info.messageId}` });
		}
	});
});

app.post("/rest", function(req, res) {
  var new_password= req.body.new_password;
  db.collection('users').updateOne(
    { "email": globalString}, // Filter
    {$set: {"password": new_password}}, // Update
    {upsert: true}  // add document with req.body._id if not exists
    ,function(err) {
      if (err) throw err;
      else
      console.log("The password has changed");
    });


});




app.listen(3000,function(){
  console.log("server is running at port 3000");
});
