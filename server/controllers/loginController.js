const express = require('express');
var router = express.Router();      
var ObjectId = require('mongoose').Types.ObjectId;

var { Login } = require('../models/login');
var { ClientRegister } = require('../models/client-register');

// localhost:3000/Login/
router.get('/' , (req,res) => { 
    Login.find((err,docs) => {
        if(!err) {res.send(docs);}
        else { console.log('Error in retriving Login Details: ' + JSON.stringify(err, undefined,2));}
    });
});

router.get('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id)) 
        return res.status(400).send(`No record with given id: ${req.params.id}`);

        Login.findById(req.params.id,(err, doc) => {
        if(!err) {res.send(doc);}
        else { console.log('Error in retriving Login details: '+ JSON.stringify(err, undefined, 2));}
    });
}); 



router.post('/', (req,res) => {
 var login = new Login({
    Email : req.body.Email,
    Password : req.body.Password 
 });
 login.save((err, doc) => {
     if(!err) {res.send(doc);}
     else { console.log('Error in Login Save: '+ JSON.stringify(err, undefined, 2));}
 });
});

router.put('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id)) 
    return res.status(400).send(`No record with given id: ${req.params.id}`);
    var login = {
        Email : req.body.Email,
        Password : req.body.Password 
     };
     Login.findByIdAndUpdate(req.params.id,{$set: login},{new: true},(err, doc) => {
        if(!err) {res.send(doc);}
        else { console.log('Error in Update Login: '+ JSON.stringify(err, undefined, 2));}
     });
});

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)) 
    return res.status(400).send(`No record with given id: ${req.params.id}`);

    Login.findByIdAndRemove(req.params.id,(err, doc) => {
        if(!err) {res.send(doc);}
        else { console.log('Error in Delete Login: '+ JSON.stringify(err, undefined, 2));}
    });
});




module.exports = router;