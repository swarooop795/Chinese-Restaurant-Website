const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String
});

module.exports = mongoose.model('Food', FoodSchema);

