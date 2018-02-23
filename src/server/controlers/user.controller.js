const User = require('../models/user.model');

function registerUser(req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ error: 'Bad Data' });
    return;
  }

  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });

  newUser
    .save()
    .then(function() {
      res.status(201).json({
        email: req.body.email
      });
    })
    .catch(function(err) {
      if (err.code == '11000') {
        res.status(409).json({ error: 'Email Existed' });
      } else {
        res.status(500).json(err);
      }
    });
}

function getUsers(req, res, next) {
  User.find()
    .then(function(users) {
      res.json(users);
    })
    .catch(function(err) {
      res.status(500).send('Backend Error');
    });
}

function login(req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ error: 'Bad Data' });
    return;
  }

  User.find({ email: req.body.email });
}

module.exports = {
  registerUser: registerUser,
  getUsers: getUsers,
  login: login
};
