var ObjectId = require('mongoose').Types.ObjectId;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var { User } = appRequire('model.user');
var crypto = require('crypto');
var config = appRequire('config');
var ResponseUtils = appRequire('utils.response');

var EncryptionKey = config.EncryptionKey;

module.exports = {
    create: create,

    update: update,

    delete: del,

    read: read,

    readAll: readAll,

    login: login
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
        MobileNo: req.body.MobileNo,
        Email: req.body.Email,
        DOB: req.body.DOB,
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
        MobileNo: req.body.MobileNo,
        Email: req.body.Email,
        DOB: req.body.DOB,
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
    });
}