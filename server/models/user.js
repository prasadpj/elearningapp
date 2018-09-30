const mongoose = require('mongoose');

var User = mongoose.model('User',{
    
    FirstName : { type: String },
    LastName : { type: String },
    MobileNo : { type: Number },
    Email : { type: String },
    DOB : { type: String },
    Password : { type: String },
    IsAdmin : { type: Boolean },
},'User');


module.exports = {User};