var express=require("express");
var bodyParser=require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");
var session = require('express-session')
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/EVwaze');
//mongoose.connect('mongodb+srv://admin:admin123@cluster0.omcnp.mongodb.net/EVwaze?retryWrites=true&w=majority')
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})
const app = express();

app.use(express.static('views'));

//session use
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true

}))
///////////////////////////////////////////////////

var firstname ;
var lastname ;
var username ;
var email ;
var pass;
var phonenumber ;
var address ;
var IsHelper;
var data;
var Supported_Areas;
var cost_per_hour;
var Desc;

const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose');
const { stringify } = require("querystring");
AdminJS.registerAdapter(AdminJSMongoose)


const User = mongoose.model('User', {firstname: String ,lastname: String ,username: String , email: String, phonenumber: String, address: String,
 phonenumber: String ,Supported_Areas: String, cost_per_hour: String, Desc: String,})
 const Message = mongoose.model('message', {message: String,firstname:String,lastname:String,fulldate:String, })
 const Rating = mongoose.model('Rating', {rater: String,rated:String,rating:String, })

const adminJs = new AdminJS ({

//databases: [],
  rootPath: '/admin',
	resources: [User,Message,Rating],
})

const ADMIN={
	email: process.env.ADMIN_EMAIL  || 'admin@evwise.com',
	password: process.env.ADMIN_PASSWORD || '1234',
}
//const AdminJS =  new AdminJS(adminJsOptions)
const router = AdminJSExpress.buildAuthenticatedRouter(adminJs,{
	cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
	cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password-for-a-cookie-in-the-browser',

	authenticate: async (email, password) => {
		if(email===ADMIN.email && password=== ADMIN.password){

			return ADMIN
		}
		return null;
	}
})

app.use(adminJs.options.rootPath, router)

app.use(bodyParser.json());

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
	extended: true
}));
app.get('/admin/login', function(req,res){

	redirect('/');
})




app.set("view engine", "ejs");

app.get('/', function (req, res) {

  res.render('index',{style:'Home.css'} );
});

//////////////////////////////////////////////sign up as a user///////////////////////////////////////////////////
app.post('/sign_up', function(req,res){

   firstname =  req.body.firstname;
	 lastname = req.body.lastname;
   username = req.body.username;
	 email =req.body.email;
	 pass = req.body.password;
	 phonenumber =req.body.phonenumber;
	 address =req.body.address;
   IsHelper = req.body.IsHelper;
   latitude=req.body.latitude;
	longitude=req.body.longitude;

  data = {
		"firstname": firstname,
		"lastname": lastname,
    "username" : username,
		"email": email,
		"password":pass,
		"phonenumber":phonenumber,
		"address":address,
    "IsHelper":IsHelper
	}
  if (req.body.IsHelper)  {
	latitude=req.body.latitude;
	longitude=req.body.longitude;
    Supported_Areas =req.body.Supported_Areas;
    cost_per_hour =req.body.cost_per_hour;
    Desc =req.body.Desc;
    data = {
      "firstname": firstname,
      "lastname": lastname,
      "username" : username,
      "email": email,
      "password":pass,
      "phonenumber":phonenumber,
      "address":address,
      "IsHelper":IsHelper,
	  "latitude":latitude,
	  "longitude":longitude,
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


//users domain//////////////////////////////////////////////////////////

/*app.get("/Admin",function(req,res){
	res.render('Home_Admin',{style:'Home_Admin.css',firstnamex : firstname,lastnamex : lastname} );
});*/


app.get("/User",function(req,res){
	res.render('Home_user',{style:'Home_user.css',firstnamex : firstname,lastnamex : lastname ,emailx : email} );
});

app.get("/Helper",function(req,res){
		db.collection('messages').find({}).toArray().then((datam) => {



			//console.log(datas);
			  var massegex = [];
			  var massege=[];
			  for(var i=0 ; i<datam.length;i++){

				massege=[i,datam[i].message,datam[i].firstname,datam[i].lastname,datam[i].fulldate];
				  massegex.push(massege);
			  }
			  console.log(massegex);

//////////////////////
db.collection('ratings').find({rated:email}).toArray().then((ratem) => {
	var ratex = [];
	var per_rate=[];
	for(var j=0 ; j<ratem.length;j++){
		per_rate=[j,ratem[j].rated,ratem[j].rater,ratem[j].rating];
		ratex.push(per_rate);
}
console.log("/////////////////////////////////////");

console.log(ratex);
var sum =0;
var size=0;
var avg=0
for(var i=0 ; i<ratem.length;i++){
sum+=Number(ratem[i].rating);
size+=1;
}
	avg=sum/size;
avgx=avg.toFixed(1);

console.log(avgx);
res.render('Home_helper',{style:'Home_helper.css',firstnamex : firstname,lastnamex : lastname,emailx : email,massegesx:massegex,ratex:ratex,avgx:avgx} );


})
//////////////////////









		  }, err => {
			console.log(err);
	});

});






app.get("/helpers", function(req,res){
	db.collection('users').find({IsHelper:'on'}).toArray().then((datas) => {
/*		const pipeline = [
    { $match: { categories: "rated" } },
    { $group: { _id: "$rated", avg_val:{$avg:"$rating.value"} } }
];
	const avg=	db.collection('rating').aggregate(pipeline);

    console.log(avg);*/




  //console.log(datas);
	var locationsx = [];
	var local=[];
	for(var i=0 ; i<datas.length;i++){
		local=[i,datas[i].latitude,datas[i].longitude,datas[i].firstname+" "+datas[i].lastname,datas[i].cost_per_hour,datas[i].Desc,datas[i].Supported_Areas,datas[i].email,datas[i].phonenumber,datas[i].firstname];
		locationsx.push(local);
	}
	console.log(locationsx);

	db.collection('ratings').find().toArray().then((ratings) => {
	//	console.log(ratings[1].rating);
		var fullratings = [];
		var per_rate=[];
		for(var i=0 ; i<ratings.length;i++){
			var sum =0;
			var size=0;
			var avg=0;
				for(var j=0 ; j<ratings.length;j++){
					if(ratings[i].rated==ratings[j].rated){
						sum+=Number(ratings[j].rating);
						size+=1;
				//		console.log(sum ,ratings[j].rated);

					}

				}
				avg=sum/size;
per_rate=[ratings[i].rated,avg.toFixed(1)];
fullratings.push(per_rate);


	}

//console.log(fullratings);


for(var d=0; d<locationsx.length;d++){
	for(var z=0; z<fullratings.length;z++){
		if(locationsx[d][7]==fullratings[z][0]){
			locationsx[d][10]=fullratings[z][1];
		}
	}

}

res.render('need_help',{style:'need_help.css',firstnamex : firstname,lastnamex : lastname ,emailx : email,locationsx:locationsx} );

	})


}, err => {
  console.log(err);
});


});
app.get("/UpdateHelper",function(req,res){
	res.render('update-helper',{style:'update-helper.css',
	    	firstnamex : firstname,
				lastnamex : lastname,
				usernamex :username,
				emailx : email,
				passwordx : pass,
				phonenumberx : phonenumber,
				addressx : address,
				IsHelperx : IsHelper,
			  Supported_Areasx : Supported_Areas,
				cost_per_hourx :cost_per_hour,
				Descx: Desc,} );
});
app.get("/UpdateUser",function(req,res){
	res.render('update-user',{style:'update-user.css',
	    	firstnamex : firstname,
				lastnamex : lastname,
				usernamex :username,
				emailx : email,
				passwordx : pass,
				phonenumberx : phonenumber,
				addressx : address,
} );
});
app.get("/UpdateAdmin",function(req,res){
	res.render('update-admin',{style:'update-admin.css',
	    	firstnamex : firstname,
				lastnamex : lastname,
				usernamex :username,
				emailx : email,
				passwordx : pass,
				phonenumberx : phonenumber,
				addressx : address,} );
});

app.get("/users",function(req,res){
	var cursor=db.collection('users').find().toArray(function(err,result){
		res.render('users',{style:'users.css',data_res:result});

	});
});
app.get("/helperForm",function(req,res){
		res.render('helper_form',{style:'helper_form.css'});


});



app.post('/Helper', function(req,res){

	var message = req.body.message;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;

	/*let ts = Date.now();

	let date_ob = new Date(ts);

	let date = date_ob.getDate();
	let month = date_ob.getMonth() + 1;
	let year = date_ob.getFullYear();*/
	let date_time = new Date();

// get current date
// adjust 0 before single digit date
let date = ("0" + date_time.getDate()).slice(-2);
let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
let year = date_time.getFullYear();
let hours = date_time.getHours();
let minutes = date_time.getMinutes();
let seconds = date_time.getSeconds();

  	var fulldate = hours + ":" + minutes + ":" + seconds + "\n" + date + "-" + month + "-" + year ;
   data = {
		"message" : message,
		"firstname": firstname,
		"lastname": lastname,
		"fulldate" : fulldate

	 }
   db.collection('messages').insertOne(data,function(err, collection){
		 if (err) throw err;
		 console.log("message inserted Successfully");
		 console.log(data);
	 });
	 return res.redirect('Helper');
 })
////////////////////////////////////////////////////////////////////////
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


			app.get('/logged', function (req, res){
				var MongoClient = require('mongodb').MongoClient;
			  var url = "mongodb+srv://admin:admin123@cluster0.omcnp.mongodb.net/EVwaze?retryWrites=true&w=majority";
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
				res.redirect("/admin");
				//res.render('Home_Admin',{style:'Home_Admin.css'} );

         console.log("success login an admin");
       }
			 else{console.log(query);


				 dbo.collection("users").find(query).toArray(function(err, result) {
						 if (err) throw err;
						 console.log(result);
						 if(result[0].password == data.password){
							 firstname=result[0].firstname;
							 lastname= result[0].lastname;
							 username= result[0].username ;
							 email= result[0].email ;
							 pass= result[0].password;
							 phonenumber= result[0].phonenumber ;
							 address= result[0].address;
							 IsHelper= result[0].IsHelper;
							 Supported_Areas= result[0].Supported_Areas ;
							 cost_per_hour= result[0].cost_per_hour;
							 Desc= result[0].Desc;

                 if(result[0].IsHelper == null){
									 pass=data.password;
                   console.log("success login an user ");
									 user_analyzer="user";
									 res.redirect("/User");

								//	res.render('Home_user',{style:'Home_user.css' , username: result[0].username} )
								 }
                 else{

								 user_analyzer="helper";
								 res.redirect("/Helper");



								// res.render('Home_helper',{style:'Home_helper.css' , username: result[0].username} )
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

		auth: {	user: "abbasmohammeds2.ma@gmail.com", // this should be YOUR GMAIL account


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


//////update details by username/////
app.post("/update-user", function(req, res) {
  var firstname = req.body.firstname;
	var lastname = req.body.lastname;
  var username = req.body.username;
	var email =req.body.email;
	var pass = req.body.password;
	var phonenumber =req.body.phonenumber;
	var address =req.body.address;
  var IsHelper = null;

  var data = {
		"firstname": firstname,
		"lastname": lastname,
		"email": email,
		"password":pass,
		"phonenumber":phonenumber,
		"address":address,
    "IsHelper":IsHelper
	}
  db.collection('users').updateOne(
    { "username": username}, // Filter
    {$set: data}, // Update
    {upsert: true}  // add document with req.body._id if not exists
    ,function(err) {
      if (err) throw err;
      else{
      console.log("The details has updated");}
    });


});


app.post("/update-Helper", function(req, res) {
  var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var pass = req.body.password;
	var phonenumber =req.body.phonenumber;
	var address =req.body.address;
  	var IsHelper = "on";
	var Supported_Areas=req.body.Supported_Areas;
	var cost_per_hour=req.body.cost_per_hour;
	var Desc=req.body.Desc;

  var data = {
		"firstname": firstname,
		"lastname": lastname,
		"password":pass,
		"phonenumber":phonenumber,
		"address":address,
		"IsHelper":IsHelper,
		"Supported_Areas": Supported_Areas,
		"cost_per_hour": cost_per_hour,
		"Desc" : Desc
	}

  db.collection('users').updateOne(
    { "username": username}, // Filter
    {$set: data}, // Update
    {upsert: true}  // add document with req.body._id if not exists
    ,function(err) {
      if (err) throw err;
      else{
      console.log("The details has updated for Helper");}
    });


});
//////end///
app.post('/rating', function(req,res){
	console.log("bye");
	 var rater = req.body.rater;
	 var rated = req.body.rated;
	 var rating = req.body.rating;

   data = {
		 "rater": rater,
		 "rated": rated,
	 "rating" : rating

	 }
   db.collection('ratings').insertOne(data,function(err, collection){
		 if (err) throw err;
		 console.log("rating inserted Successfully");
	 });
	 return res.redirect('signup_success.html');
 })
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/alpha',function(req,res){
	res.render('public_massenger',{style:'public_massenger.css'})
})



// app.listen(3000,function(){
//   console.log("server is running at port 3000");
// });
module.exports=app;
