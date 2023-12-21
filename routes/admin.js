const express = require('express');
const ProductModel = require('../models/ProductModel');
const router = express.Router();

router.get("/home", async(req, res, next) => {
// var types = await TypeModel.find();
  res.render('manager/home', {layout: 'admin_layout', title: 'Dashboard'});
})

module.exports = router;
