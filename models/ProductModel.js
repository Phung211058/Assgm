var mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({
    image: String,
    name: String,
    color: String,
    price: String,
    quantity: String,
    colo: String,
    date: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'  // 'brands': collection
     }
  });
var ProductModel = mongoose.model('products', ProductSchema);

module.exports = ProductModel;