const mongoose = require('mongoose');
 let url = process.env.MONGODB_URL || "mongodb+srv://admin:admin123@cluster0.omcnp.mongodb.net/EVwaze?retryWrites=true&w=majority";
 mongoose.connect(url);
//mongoose.connect('mongodb+srv://admin:admin123@cluster0.omcnp.mongodb.net/EVwaze?retryWrites=true&w=majority');
var app=require("./app.js");
const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log(`Server has started on port ${port} ... `);
});
//app.listen(3000,function(){
  //console.log("server is running at port 3000");
//});
