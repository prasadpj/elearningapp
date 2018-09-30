const mongoose = require('mongoose');

var ClientRegister = mongoose.model('ClientRegister',{
    
    FirstName : { type: String },
    LastName : { type: String },
    MobileNo : { type: Number },
    Email : { type: String },
    DOB : { type: String },
    Password : { type: String },
    IsAdmin : { type: Boolean },
},'ClientRegister');


module.exports = {ClientRegister};