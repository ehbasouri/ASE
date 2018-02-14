const express = require('express');
const bodyparser = require('body-parser');
const User = require('./models/user.model');
const userController = require('./controlers/user.controller');

const app = express();
app.use(bodyparser.json());

app.post('/register', userController.registerUser);
app.get('/users', userController.getUsrs)

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
