const express = require('express');
const userController = require('./controlers/user.controller');
const estateController = require('./controlers/estate.controller');
const jwt = require('express-jwt');

const apiRouter = express.Router();

apiRouter.post('/register', userController.registerUser);
apiRouter.post('/login', userController.login);
apiRouter.get('/users', userController.getUsers);

apiRouter.get('/estates', jwt({ secret: 'secret' }), estateController.getEstates);
apiRouter.post('/estates', jwt({ secret: 'secret' }), estateController.createEstate);
apiRouter.delete('/estates/:id', jwt({ secret: 'secret' }), estateController.deleteEstate);
apiRouter.patch('/estates/:id/image',  jwt({ secret: 'secret' }), estateController.changeEstateImage);

module.exports = apiRouter;
