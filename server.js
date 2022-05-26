const mongoose = require('mongoose');
 let url = process.env.MONGODB_URL || "mongodb+srv://admin:admin123@cluster0.omcnp.mongodb.net/EVwaze?retryWrites=true&w=majority";
 mongoose.connect(url);
//mongoose.connect('mongodb+srv://admin:admin123@cluster0.omcnp.mongodb.net/EVwaze?retryWrites=true&w=majority');
var app=require("./app.js");
var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
server.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
//app.listen(3000,function(){
  //console.log("server is running at port 3000");
//});
