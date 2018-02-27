const Estate = require('../models/estate.model');

function getEstates(req, res, next) {
  Estate.find()
    .then(estates => {
      res.json({ estates });
    })
    .catch(err => {
      res.json({ error: err });
    });
}

module.exports = {
  getEstates
};
