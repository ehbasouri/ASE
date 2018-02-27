const mongoose = require('mongoose');
const seed = require('./seed');

mongoose
  .connect('mongodb://127.0.0.1:27017/ase')
  .then(function(conn) {
    conn.connection.db.dropDatabase();
    seed();
    console.log('Successfully connected to db');
  })
  .catch(function(err) {
    console.log('Error on connect to db', err);
  });
