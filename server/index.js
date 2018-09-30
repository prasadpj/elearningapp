const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var multer = require('multer');
var path = require('path');
var fs = require('fs');

const { mongoose } = require('./db.js');
var courseController = require('./controllers/courseController.js');
var chapterController = require('./controllers/chapterController.js');
var topicController = require('./controllers/topicController.js');
var blogController = require('./controllers/blogController.js');
var clientRegister = require('./controllers/client-registerController.js');
var login = require('./controllers/loginController.js');
var contactUs = require('./controllers/contactus.ctrl.js');

var config = require('./config/index');
var serverUrl = "http://" + config.host + ":" + config.port;

var uploadDir = './../' + config.imageUploadFolder + '/';
var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, generateFileName(file.originalname));
    }
});
var upload = multer({ storage: storage });


var app = express();
app.use(bodyParser.json());

// app.use(cors({ origin: 'http://localhost:4200' }));
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

console.log(serverUrl)
// app.use(cors({ origin: serverUrl }));


app.listen(config.port, () => console.log('server started at port:' + config.port));

app.use('/Course', courseController);
app.use('/Chapter', chapterController);
app.use('/Topic', topicController);
app.use('/Blog', blogController);
app.use('/ClientRegister', clientRegister);
app.use('/Login', login);
app.use('/Contact', contactUs);
app.use('/uploaded_images', express.static(path.join(config.imageUploadPath)));
console.log('config.imageUploadPath ', config.imageUploadPath)

app.post("/upload", upload.array("uploads[]", 12), function (req, res) {
    // console.log('files', req.files);
    var response = []
    req.files.forEach(file => {
        response.push(serverUrl + "/uploaded_images/" + file.filename);
    });
    res.send(response);
});
//Create the invoice and other upload folders.
fs.exists(uploadDir, function (exists) {
    if (!exists) {
        fs.mkdir(uploadDir, function (err) {
            if (err) {
                console.log('Error in folder creation', err);
            }
        })
    }
})
// this function removed all special symbols and return file name with extension
function generateFileName(originalname) {
    var arr = originalname.split('.')
    var newFilename = arr[0];
    newFilename = newFilename.replace(/(?!\w|\s)./g, '')
        .replace(/\s+/g, '')
        .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2')
        + (new Date()).getTime()
        + '.' + arr[(arr.length - 1)]
    return newFilename;
}