var Express = require('express');
var Controller = appRequire('ctrl.topic');
var Router = Express.Router();


Router.get('/', Controller.readAll);
Router.get('/byChapterID/:id', Controller.readByChapterId);
Router.get('/:id', Controller.read);
Router.post('/', Controller.create);
Router.put('/', Controller.update);
Router.delete('/', Controller.delete);

module.exports = Router;