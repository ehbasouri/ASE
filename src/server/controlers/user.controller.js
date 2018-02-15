const User = require('../models/user.model');

function registerUser(req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.status(400).end('Bad Data');
    return;
  }

  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });
  console.log('Saved?');

  newUser
    .save()
    .then(function() {
      console.log('Saved');
      res.status(201).end(`${req.body.email} created`);
    })
    .catch(function(err) {
      if (err.code == '11000') {
        res.status(406).end('Email Existed');
      } else {
        res.status(406).json(err);
      }
    });
}

function getUsers(req, res, next) {
  User.find().then(function (users) {
    res.json(users);
  }).catch(function (err) {
    res.status(500).send('Backend Error')
  })
}

module.exports = {
  registerUser: registerUser,
  getUsers: getUsers
};
