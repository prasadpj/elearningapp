var ObjectId = require('mongoose').Types.ObjectId;

var { User } = appRequire('model.user');


module.exports = {
    create: create,

    update: update,

    delete: del,

    read: read,

    readAll: readAll,

    readByEmailId: readByEmailId
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
    var User = new User({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        MobileNo: req.body.MobileNo,
        Email: req.body.Email,
        DOB: req.body.DOB,
        Password: req.body.Password,
        IsAdmin: req.body.IsAdmin,
    });
    User.save((err, doc) => {
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

function readByEmailId(req, res, next) {
    var User = new User({
        Email: req.body.Email,
        Password: req.body.Password
    });
    isTrue = User.find({ "Email": User.Email, "Password": User.Password }, (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retriving ClinetRegister: ' + JSON.stringify(err, undefined, 2)); }
    });
}
