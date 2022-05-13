const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin123@cluster0.omcnp.mongodb.net/EVwaze?retryWrites=true&w=majority')
var app=require("./app.js")

app.listen(3000,function(){
  console.log("server is running at port 3000");
});
