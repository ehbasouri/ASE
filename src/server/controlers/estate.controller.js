const Estate = require('../models/estate.model');
const path = require('path');
const uuid = require('uuid/v4');

function getEstates(req, res, next) {
  const query = req.query.q || '';
  const titleRegex = new RegExp('^' + query, 'i');


  const userId = req.user.id;
  Estate.find({
      seller: userId,
      title: titleRegex
    })
    .then(estates => {
      console.log(estates)
      res.json({
        estates
      });
    })
    .catch(err => {
      res.json({
        error: err
      });
    });
}

function createEstate(req, res, next) {
  if (!req.body.title ||
    !req.body.address ||
    !req.body.area ||
    !req.body.estate_type) {
    res.status(400).json({
      error: 'Bad Data'
    });
    return;
  }

  const userId = req.user.id;
  req.body.seller = userId;

  const newEstate = new Estate(req.body);

  newEstate.save().then(function (estate) {
    res.status(201).json({
      estate
    });
  }).catch(function (error) {
    res.status(500).json({
      error
    });
  });
}

function changeEstateImage(req, res, next) {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  const estateImage = req.files.image;

  const ext = estateImage.name.split('.').slice(-1);

  const imageRandomName = uuid() + '.' + ext;

  console.log(imageRandomName);

  const distPath = path.join(__dirname, '..', '..', '..', 'dist', 'images', imageRandomName);
  estateImage.mv(distPath, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    }

    const id = req.params.id;

    Estate.findByIdAndUpdate(id, {
      $set: {
        image_url: `images/${imageRandomName}`
      }
    }).then(function (updatedEstate) {
      res.json({
        message: 'OK',
        fileName: `images/${imageRandomName}`
      });
    }).catch(function (err) {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    });

  });
}

function deleteEstate(req, res, next) {
  const estateId = req.params.id;

  Estate.findByIdAndRemove(estateId).then(function () {
    res.json({
      message: 'Deleted'
    });
  }).catch(function (err) {
    res.status(500).json({
      error: err
    });
  });
}

module.exports = {
  getEstates,
  createEstate,
  changeEstateImage,
  deleteEstate
};
