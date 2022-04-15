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




app.listen(3000,function(){
  console.log("server is running at port 3000");
});
