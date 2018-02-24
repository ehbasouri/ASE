const express = require('express');
const userController = require('./controlers/user.controller');
const jwt = require('express-jwt');

const apiRouter = express.Router();

apiRouter.post('/register', userController.registerUser);
apiRouter.post('/login', userController.login);
apiRouter.get('/users', userController.getUsers);

apiRouter.get('/estates', jwt({ secret: 'secret' }), function(req, res) {
  if (!req.user.admin) return res.sendStatus(401);
  res.sendStatus(200);
});


module.exports = apiRouter;
