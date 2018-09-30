const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Chapter } = require('../models/chapter');
var { Course } = require('../models/course');


// localhost:3000/Chapter/
// router.get('/' , (req,res) => {
//     Chapter.find((err,docs) => {
//         if(!err) {res.send(docs);}
//         else { console.log('Error in retriving Chapter: ' + JSON.stringify(err, undefined,2));}
//     });
// });

router.get('/bycourse/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

        Chapter.find({"CourseID":req.params.id},(err, doc) => {
        if(!err) {res.send(doc);}
        else { console.log('Error in retriving Topic: '+ JSON.stringify(err, undefined, 2));}

    });
});

router.get('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

        Chapter.findById(req.params.id,(err, doc) => {
        if(!err) {res.send(doc);}
        else { console.log('Error in retriving Chapter: '+ JSON.stringify(err, undefined, 2));}
    });
});

router.post('/', (req,res) => {
    var chapter = new Chapter({
        CourseID : req.body.CourseID,
        ChapterName : req.body.ChapterName,
        ChapterDesc : req.body.ChapterDesc
    });
    chapter.save((err, doc) => {
        if(!err) {
            Course.findByIdAndUpdate(req.body.CourseID,{ $push: { 'Chapter': doc._id } },function(err,doc){
                if(!err) {
                    res.send(doc);
                }
                else { console.log('Error in Updating Course: '+ JSON.stringify(err, undefined, 2));}
           });
        }
        else { console.log('Error in chapter Save: '+ JSON.stringify(err, undefined, 2));}
    });
   });

router.put('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
    var chapter = {
        CourseID : req.body.CourseID,
        ChapterName : req.body.ChapterName,
        ChapterDesc : req.body.ChapterDesc
     };
     Chapter.findByIdAndUpdate(req.params.id,{$set: chapter},{new: true},(err, doc) => {
        if(!err) {res.send(doc);}
        else { console.log('Error in Update Chapter: '+ JSON.stringify(err, undefined, 2));}
     });
});

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

    Chapter.findByIdAndRemove(req.params.id,(err, doc) => {
        if(!err) {res.send(doc);}
        else { console.log('Error in Delete Chapter: '+ JSON.stringify(err, undefined, 2));}
    });

    
});



router.get('/byChapter/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

        Chapter.find({'CourseID':req.params.id})
        .populate('Topic')
        .exec( (err, doc) => {
        if(!err) {res.send(doc);}
        else { console.log('Error in retriving Chapter: '+ JSON.stringify(err, undefined, 2));}
    });
});


router.get('/', (req,res) => {
    
        Chapter.find()
        .populate('CourseID')
        .exec( (err, doc) => {
        if(!err) {res.send(doc);}
        else { console.log('Error in retriving Chapter: '+ JSON.stringify(err, undefined, 2));}
    });
});


module.exports = router;