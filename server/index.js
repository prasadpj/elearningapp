

var requireConfig = require('./require.config')

global.appRequire = function (alias) {
    return require(__dirname + '/' + requireConfig[alias]);
};

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var multer = require('multer');
var path = require('path');
var fs = require('fs');

const { mongoose } = appRequire('database');
var { Blog } = appRequire('model.blog');

var config = appRequire('config');
var serverUrl = "http://" + config.host + ":" + config.port;

var uploadDir = './../' + config.imageUploadFolder + '/';
var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        var blog_id = req.params.id
        var newFileName = blog_id ? blog_id + "_" + file.originalname : file.originalname;
        cb(null, newFileName);
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
var regex = config.blogImagePlaceholderRegex
console.log(serverUrl)
// app.use(cors({ origin: serverUrl }));


app.listen(config.port, () => console.log('server started at port:' + config.port));

app.use('/Course', appRequire('api.course'));
app.use('/Chapter', appRequire('api.chapter'));
app.use('/Topic', appRequire('api.topic'));
app.use('/Blog', appRequire('api.blog'));
app.use('/ClientRegister', appRequire('api.user'));
app.use('/Contact', appRequire('api.contactus'));
app.use('/uploaded_images', express.static(path.join(config.imageUploadPath)));
// console.log('config.imageUploadPath ', config.imageUploadPath)

app.post("/upload/:id", upload.array("uploads[]", 12), function (req, res) {
    // console.log('files', req.files);
    var uploadImageUrls = []
    req.files.forEach(file => {
        uploadImageUrls.push(serverUrl + "/uploaded_images/" + file.filename);
        });
    Blog.findByIdAndUpdate(req.params.id, { $push: { 'BlogImageUrls': uploadImageUrls } }, function (err, doc) {
        var blogContent = doc.BlogContent
        
        blogContent = blogContent.replace(regex, serverUrl + "/uploaded_images/"+ doc._id)
        if (!err) {
            Blog.findByIdAndUpdate(doc._id,{ 'BlogContent': blogContent }, function (err, updatedDoc) {
                if (!err) { res.send(updatedDoc); }
                else { console.log('Error in updating image in Blog: ' + JSON.stringify(err, undefined, 2)); }
            })
        }
        else { console.log('Error in Updating Images: ' + JSON.stringify(err, undefined, 2)); }
    });
    // req.files.forEach(file => {
    //     response.push(serverUrl + "/uploaded_images/" + file.filename);
    // });
    // res.send(response);
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
// function generateFileName(originalname) {
//     var arr = originalname.split('.')
//     var newFilename = arr[0];
//     newFilename = newFilename.replace(/(?!\w|\s)./g, '')
//         .replace(/\s+/g, '')
//         .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2')
//         // + (new Date()).getTime()
//         + '.' + arr[(arr.length - 1)]
//     console.log('newFilename == ',newFilename)
//     return newFilename;
// }