const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Blog } = require('../models/blog');

// localhost:3000/Blog/
router.get('/', (req, res) => {
    Blog.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retriving Blog: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    Blog.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in retriving Blog: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var blog = new Blog({
        BlogCategory: req.body.BlogCategory,
        BlogLevel: req.body.BlogLevel,
        BlogTitle: req.body.BlogTitle,
        BlogAbstract: req.body.BlogAbstract,
        BlogContent: req.body.BlogContent,
        BlogVideoURL: req.body.BlogVideoURL,
        BlogImageUrls: req.body.BlogImageUrls,
        BlogAuthor: req.body.BlogAuthor,
        BlogPostedOn: req.body.BlogPostedOn
    });
    blog.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Blog Save: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    var blog = {
        BlogCategory: req.body.BlogCategory,
        BlogLevel: req.body.BlogLevel,
        BlogTitle: req.body.BlogTitle,
        BlogAbstract: req.body.BlogAbstract,
        BlogContent: req.body.BlogContent,
        BlogVideoURL: req.body.BlogVideoURL,
        BlogImageUrls: req.body.BlogImageUrls,
        BlogAuthor: req.body.BlogAuthor,
        BlogPostedOn: req.body.BlogPostedOn
    };
    Blog.findByIdAndUpdate(req.params.id, { $set: blog }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Update blog: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    Blog.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Delete Blog: ' + JSON.stringify(err, undefined, 2)); }
    });
});



router.get('/byCategory/:id', (req,res) => {

    Blog.find({"BlogCategory": req.params.id},(err,docs) => {
        if(!err) {res.send(docs);}
        else { console.log('Error in retriving BlogCategory: ' + JSON.stringify(err, undefined,2));}
    });
});  


module.exports = router;