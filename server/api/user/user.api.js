var Express = require('express');
var Controller = appRequire('ctrl.user');
var Router = Express.Router();


Router.get('/', Controller.readAll);
Router.get('/:id', Controller.read);
Router.post('/', Controller.create);
<<<<<<< HEAD
Router.put('/', Controller.update);
Router.post('/byEmail', Controller.readByEmailId);
=======
Router.put('/:id', Controller.update);
Router.put('/byEmail', Controller.readByEmailId);
>>>>>>> 903685af2cd6bf81d54ea316a6e6bb7f364baa6e

module.exports = Router;