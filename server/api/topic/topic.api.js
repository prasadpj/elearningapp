var Express = require('express');
var Controller = appRequire('ctrl.topic');
var ApiMiddleware = appRequire('service.api.auth');
var Router = Express.Router();


Router.use('/', ApiMiddleware.restrictAPI)
Router.get('/', Controller.readAll);
Router.get('/byChapterID/:id', Controller.readByChapterId);
Router.get('/:id', Controller.read);
Router.post('/', Controller.create);
Router.put('/:id', Controller.update);
Router.delete('/:id', Controller.delete);

module.exports = Router;