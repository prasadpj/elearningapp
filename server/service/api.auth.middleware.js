var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = appRequire('config');
module.exports = {
    restrictAPI: restrictAPI
}

function restrictAPI(req, res, next) {
    console.log('req.originalUrl ', req.originalUrl)
    if (req.originalUrl.indexOf('login') > -1) {
        return next()
    }
    var token = req.headers['token'];
    if (!token)
        return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.EncryptionKey, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        next()
    });
}