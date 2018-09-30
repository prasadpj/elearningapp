const express = require('express');
const emailService = require('./../service/email.service');
var router = express.Router();

router.post('/', (req, res) => {
    emailService.sendEmail(req.body.email, req.body.sub, req.body.body, function (err) {
        if (err) {
            return res.send(err)
        }
        res.send({ success: true })
    })
    /* course.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Course Save: ' + JSON.stringify(err, undefined, 2)); }
    }); */
});



module.exports = router;