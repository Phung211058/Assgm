const express = require('express');
const ProductModel = require('../models/ProductModel');
const router = express.Router();

router.get("/", async (req, res, next) => {
  var product = await ProductModel.find({});
  res.render('client/home', { product});
})

router.get("/detail/:id", async(req, res, next) => {
  var id = req.params.id;
  var product = await ProductModel.findById(id).populate('category');
  res.render('client/detail', { product});
})

router.get('/search', async(req, res, next) => {
  var search = req.query.key;
  var result = await ProductModel.find({name: new RegExp(search, 'i')});
  res.render("client/search", {result});
});

module.exports = router;