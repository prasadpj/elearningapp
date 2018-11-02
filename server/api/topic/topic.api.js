var Express = require('express');
var Controller = appRequire('ctrl.topic');
var ApiMiddleware = appRequire('service.api.auth');
var Router = Express.Router();


Router.get('/', Controller.readAll);
Router.get('/byChapterID/:id', Controller.readByChapterId);

Router.get('/:id', Controller.readByTopicId);
Router.get('/:id', Controller.read);

Router.post('/', ApiMiddleware.restrictAPI)
Router.post('/', Controller.create);

Router.put('/', ApiMiddleware.restrictAPI)
Router.put('/:id', Controller.update);

Router.delete('/', ApiMiddleware.restrictAPI)
Router.delete('/:id', Controller.delete);

module.exports = Router;