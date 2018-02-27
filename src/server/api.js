const express = require('express');
const userController = require('./controlers/user.controller');
const estateController = require('./controlers/estate.controller');
const jwt = require('express-jwt');

const apiRouter = express.Router();

apiRouter.post('/register', userController.registerUser);
apiRouter.post('/login', userController.login);
apiRouter.get('/users', userController.getUsers);

apiRouter.get('/estates', jwt({ secret: 'secret' }), estateController.getEstates);


module.exports = apiRouter;
