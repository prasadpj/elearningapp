const mongoose = require('mongoose');

var User = mongoose.model('User',{
    
    FirstName : { type: String },
    LastName : { type: String },
    MobileNo : { type: String },
    Email : { type: String },
    DOB : { type: String },
    Password : { type: String },
    IsAdmin : { type: Boolean, default: false },
},'User');


module.exports = {User};