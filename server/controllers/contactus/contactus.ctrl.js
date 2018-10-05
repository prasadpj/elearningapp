var ObjectId = require('mongoose').Types.ObjectId;
var { Contact } = appRequire('model.contactus');


module.exports = {
    create: create,
}

function create(req, res, next) {

  var contact = new Contact({
    Name : req.body.Name,
    Email : req.body.Email,
    Message : req.body.Message
  });
    contact.save((err, doc) => {
      if(!err) {res.send(doc);}
      else { console.log('Error in Course Save: '+ JSON.stringify(err, undefined, 2));}
  });
}





