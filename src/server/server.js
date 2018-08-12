const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const apiRouter = require('./api');
const fileUpload = require('express-fileupload');

require('./db');

const app = express();
app.use(bodyparser.json());
app.use(fileUpload());
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, '..', '..', 'dist')));

app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

app.listen(5000, function() {
  console.log('Server listening on port 5000');
});
