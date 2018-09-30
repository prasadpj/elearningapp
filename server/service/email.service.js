const express = require('express');
var router = express.Router();
var email = require('emailjs');


function sendEmail(toEmailIdArr, subject, body, callback) {
    var server = email.server.connect({
        user: 'vcvarshacreation@gmail.com',
        password: '123',
        host: 'smtp.your-email.com',
        ssl: true
    });

    // send the message and get a callback with an error or details of the message that was sent
    server.send({
        // html: '<h1> GM </h1>',
        html: body,
        from: 'vcvarshacreation@gmail.com',
        to: toEmailIdArr,
        subject: subject
    }, function (err, message) {
        if (err)
            callback(err)
        else
            // return res.json({ success: true, msg: 'send' });
            return callback(null);
    });
}


module.exports = {
    sendEmail: sendEmail
}; 