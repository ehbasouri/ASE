const express = require('express');
const bodyparser = require('body-parser');
const userController = require('./controlers/user.controller');
const path = require('path');
require('./db');

const app = express();
app.use(bodyparser.json());

console.log(path.join(__dirname, 'dist'));

app.use(express.static(path.join(__dirname, '..', '..', 'dist')));
app.post('/register', userController.registerUser);
app.post('/login', userController.login)
app.get('/users', userController.getUsers);

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
