
var ObjectId = require('mongoose').Types.ObjectId;

const mongoose = require('mongoose');
var { Chapter } = require('../models/chapter');
var { Course }= require('../models/course');
var { Topic } = require('../models/topic');



//console.log(Chapter)
var chapID= "5ba621ff74f87327c489fe52"
mongoose.connect('mongodb://localhost:27017/ElearningDB', (err) => {
if(!err)
console.log('MongoDB connection succeeded');
else
console.log('Error in Connection: '+ JSON.stringify(err, undefined, 2));

if(!ObjectId.isValid(chapID)) 
return console.log("Invalid ID")

Topic.find()
.populate({
    path: 'CourseID',
    model: 'Course',

    populate: {
        path: 'Chapter',
        model: 'Chapter'
    }})

.exec((err, doc) => {
    console.log(JSON.stringify(doc));
});

});

