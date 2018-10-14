//MongoDB 
var mongoose = require('mongoose');
 
   //Connection
   var db = mongoose.connect("mongodb://localhost:27017/notifierusers");
   mongoose.connection.once('open', function (){ console.log();console.log('-- connected to notifierusers Database--');console.log();
   }).on('error',function (error) {console.log('continue error = ', error);});


//Schema
var userSchema = new mongoose.Schema(
    {  
         _id: Number, 
       gmail: String, 
   firstname: String, 
    lastname: String, 
    fullname: String,
    profileimageurl: String,
});


//Collection
var userModel = mongoose.model( "notifierusers" , userSchema);

module.exports = userModel;

