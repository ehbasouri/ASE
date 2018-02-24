const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

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

  User.findOne({ email: req.body.email })
    .then(function(user) {
      if (user == null) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      if (user.password === req.body.password) {
        const token = jwt.sign({
          email: user.email,
          id: user.id
        }, 'secret');
        res.status(200).json({ token: token });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Backend Error' });
      return;
    });
}

module.exports = {
  registerUser: registerUser,
  getUsers: getUsers,
  login: login
};
