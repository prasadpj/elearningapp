const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// var Chapter = Schema({
//     _id: Schema.Types.ObjectId,
//     CourseID: { type: Schema.Types.ObjectId, ref: 'Course' },
//     ChapterName: {type: String},
//     ChapterDesc: {type: String},
//     Topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }]
// });
// var modelObj = mongoose.model('Chapter',Chapter)
// module.exports = {modelObj}


var Chapter =  mongoose.model('Chapter',{
    //_id: Schema.Types.ObjectId,
    CourseID: { type: Schema.Types.ObjectId, ref: 'Course' },
    ChapterName: {type: String},
    ChapterDesc: {type: String},
    Topic: [{ type: String, ref: 'Topic' }]
},'Chapter');
module.exports = {Chapter};