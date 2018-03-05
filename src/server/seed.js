const User = require('./models/user.model');
const Estate = require('./models/estate.model');

function seed() {
  const admin = new User({
    email: 'met4morpho.cs@gmail.com',
    password: '123456'
  });

  admin.save();

  const home = new Estate({
    title: 'خانه 1',
    address: 'گرگان خیابان سیدین، سیدین 3، روربه رو سطل زباله، ساختمان خواجه',
    area: 85,
    floors: 4,
    floor: 3,
    image_url: 'images/dream-house.jpg',
    estate_type: 'apartment',
    seller: admin.id,
    build_year: 1388,
    rooms: 2,
    parking: true,
    pre: 5000000,
    rent: 600
  });

  home.save();

  const home2 = new Estate({
    title: 'زمین 1',
    address: 'گرگان خیابان مطهری، جنب جیگرکی حسین',
    area: 1000,
    seller: admin.id,
    image_url: 'images/dream-land.jpg',
    estate_type: 'land',
    price: 150000000
  });

  home2.save();
}

module.exports = seed;
