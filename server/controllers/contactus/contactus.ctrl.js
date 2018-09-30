var ObjectId = require('mongoose').Types.ObjectId;
const emailService = appRequire('service.email');

module.exports = {
    create: create,
}

function create(req, res, next) {
    emailService.sendEmail(req.body.email, req.body.sub, req.body.body, function (err) {
        if (err) {
            return res.send(err)
        }
        res.send({ success: true })
    })
}
