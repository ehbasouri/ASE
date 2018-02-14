const express = require('express');
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/ase')
  .then(function() {
    console.log('Successfully connected to db');
  })
  .catch(function(err) {
    console.log('Error on connect to db', err);
  });

const app = express();

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
