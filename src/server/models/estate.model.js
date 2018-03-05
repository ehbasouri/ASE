const mongoose = require('mongoose');

const EstateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  floors: {
    type: Number
  },
  floor: {
    type: Number
  },
  image_url: {
    type: String
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  estate_type: {
    type: String,
    enum: ['apartment', 'land', 'villa', 'comercial'],
    required: true
  },
  build_year: {
    type: Number
  },
  rooms: {
    type: Number
  },
  parking: {
    type: Boolean,
    default: false
  },
  pre: {
    type: Number
  },
  rent: {
    type: Number
  },
  price: {
    type: Number
  }
}, {
  timestamps: true
});

const Estate = mongoose.model('estates', EstateSchema);

module.exports = Estate;
