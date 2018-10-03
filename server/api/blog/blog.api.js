var Express = require('express');
var Controller = appRequire('ctrl.blog');
var Router = Express.Router();

Router.get('/', Controller.readAll);
Router.get('/:id', Controller.read);
Router.post('/', Controller.create);
Router.put('/:id', Controller.update);

module.exports = Router;