var ObjectId = require('mongoose').Types.ObjectId;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var { User } = appRequire('model.user');
var crypto = require('crypto');
var config = appRequire('config');
var ResponseUtils = appRequire('utils.response');

var crypto = require('crypto');

var config = require('../../config/index.js');

var EmailService = require('../../service/email.service.js');

var EncryptionKey = config.EncryptionKey;

var generator = require('generate-password');

module.exports = {
    create: create,

    update: update,

    delete: del,

    read: read,

    readAll: readAll,

    login: login,

    readByEmailId: readByEmailId,

    readByEmail: readByEmail,

    readByEmailOTP: readByEmailOTP,

    readbyEmailIsActive: readbyEmailIsActive,

    updateByMail: updateByMail
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
        OTP: generator.generate({ length: 10, numbers: true }),
        IsActive: req.body.IsActive


    });
    EmailService.sendEmail(req.body.Email, "OTP Details", UserModel.OTP, function (err) {
        // if (!err) { 
        //     res.send(docs); 
        // }else{
        //     // failure response "failed to send pwd to email id"
        // }  
    });


    UserModel.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Client Registration Save: ' + JSON.stringify(err, undefined, 2)); }
    });
}
function update(req, res, next) {
    console.log("hello this is first update");
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    var user = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        IsAdmin: req.body.IsAdmin,
        IsActive: req.body.IsActive
    };
    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Update Registration: ' + JSON.stringify(err, undefined, 2)); }
    });
}

function updateByMail(req, res, next) {
    console.log("hello");
    var user = {
        Email: req.body.Email,
        IsActive: req.body.IsActive
    };
    console.log(user);
    User.findOneAndUpdate({ Email: user.Email }, { $set: { IsActive: user.IsActive } }, function (err, doc) {
        if (!err) { res.send(doc); }
        else { console.log('Error in Update Update: ' + JSON.stringify(err, undefined, 2)); }
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

function login(req, res, next) {
    var clientRegister = {
        Email: req.body.Email,
        Password: crypto.createCipher("aes-256-ctr", EncryptionKey).update(req.body.Password, "utf-8", "hex")
    };
    User.findOne({ "Email": clientRegister.Email, "Password": clientRegister.Password }, (err, doc) => {
        if (!err) {
            if (doc) {
                var token = jwt.sign({ id: doc._id }, EncryptionKey, {
                    expiresIn: 86400 // expires in 24 hours
                });
                return res.send(
                    ResponseUtils.responseSuccess({
                        "Email": doc.Email,
                        "IsAdmin": doc.IsAdmin,
                        "Token": token || null
                    })
                );
            }
            return res.send(
                ResponseUtils.responseError("Invalid Login", "Invalid Login")
            );

        }
        else {
            console.log('Error in retriving ClinetRegister: ' + JSON.stringify(err, undefined, 2));
            return res.send(
                ResponseUtils.responseError("Error while login", err)
            );
        }
    })
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
        if (!docs) {
            // invalid email response
        }
        var password = crypto.createDecipher("aes-256-ctr", EncryptionKey).update(docs.Password, "hex", "utf-8")
        EmailService.sendEmail(req.body.Email, "Password Details", password, function (err) {
            if (!err) {
                res.send(docs);
            } else {
                // failure response "failed to send pwd to email id"
            }
        });
    });

}



function readbyEmailIsActive(req, res, next) {

    var user = new User({
        Email: req.body.Email

    });
    User.findOne({ "Email": user.Email }, (err, docs) => {

        if (!err) {
            res.send(docs);
        } else {
            // failure response "failed to send pwd to email id"
        }
    });
}


function readByEmailOTP(req, res, next) {
    var user = new User({
        Email: req.body.Email,
        OTP: req.body.OTP
    });
    isTrue = User.find({ "Email": user.Email, "OTP": user.OTP }, (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retriving ClinetRegister:' + JSON.stringify(err, undefined, 2)); }
    });
}