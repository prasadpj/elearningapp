var ObjectId = require('mongoose').Types.ObjectId;

var { User } = appRequire('model.user');


var crypto = require('crypto');
var config = require('../../config/index.js');


var EmailService = require('../../service/email.service.js');

var EncryptionKey = config.EncryptionKey;

module.exports = {
    create: create,

    update: update,

    delete: del,

    read: read,

    readAll: readAll,

    readByEmailId: readByEmailId,
    readByEmail
}

function readAll(req, res, next) {
    User.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retriving ClinetRegister: ' + JSON.stringify(err, undefined, 2)); }
    });
}
function read(req, res, next) {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    User.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in retriving User: ' + JSON.stringify(err, undefined, 2)); }
    });
}

function create(req, res, next) {
    var UserModel = new User({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: crypto.createCipher("aes-256-ctr", EncryptionKey).update(req.body.Password, "utf-8", "hex"),
        IsAdmin: req.body.IsAdmin,

    });
    UserModel.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Client Registration Save: ' + JSON.stringify(err, undefined, 2)); }
    });
}
function update(req, res, next) {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    var User = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        IsAdmin: req.body.IsAdmin,
    };
    User.findByIdAndUpdate(req.params.id, { $set: User }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Update Registration: ' + JSON.stringify(err, undefined, 2)); }
    });
}
function del(req, res, next) {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Delete Registraion: ' + JSON.stringify(err, undefined, 2)); }
    });
}

function readByEmailId(req, res, next) {

    var user = new User({
        Email: req.body.Email,
        Password: crypto.createCipher("aes-256-ctr", EncryptionKey).update(req.body.Password, "utf-8", "hex")
    });
    isTrue = User.find({ "Email": user.Email, "Password": user.Password }, (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retriving ClinetRegister: ' + JSON.stringify(err, undefined, 2)); }
    });



}


function readByEmail(req, res, next) {

    var user = new User({
        Email: req.body.Email

    });
   User.findOne({ "Email": user.Email }, (err, docs) => {
        if(!docs){
            // invalid email response
        }
        var password= crypto.createDecipher("aes-256-ctr",EncryptionKey).update(docs.Password,"hex","utf-8")

        EmailService.sendEmail(req.body.Email,"Password Details",password,function(err){
            if (!err) { 
                res.send(docs); 
            }else{
                // failure response "failed to send pwd to email id"
            }  
        });    
        //if (!err) { res.send(docs); }
    });
     // console.log(isTrue);
    
}