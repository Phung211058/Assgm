const express = require('express');
const ProductModel = require('../models/ProductModel');
const CategoryModel = require('../models/CategoryModel');
const router = express.Router();

router.get("/products", async(req, res, next) => {
    var product = await ProductModel.find({}).populate('category');
    res.render('manager/product', {layout: 'admin_layout', product, title: 'Products'});
  })
  //----------ADD PRODUCT------------------------
  router.get("/addProduct", async(req, res, next) => {
    var types = await CategoryModel.find({});
    res.render('manager/add_product', {types, layout:'empty_layout'});
  })
  
  router.post("/addProduct", async(req, res) =>{
    // var category = new CategoryModel();
    var product = new ProductModel();
    product.image = req.body.product_image;
    product.name = req.body.product_name;
    product.color = req.body.product_color;
    product.price = req.body.product_price;
    product.date = req.body.product_date;
    // product.colo = req.body.gender;
    product.quantity = req.body.product_quantity;
    product.category = req.body.product_type;
    await product.save();
    res.redirect("/admin/products");
  })
  //------------------DELETE PRODUCT--------------------------------
  router.get("/deleteProduct/:id", async(req, res, next) =>{
    var id = req.params.id;
    var product = await ProductModel.findById(id);
     await ProductModel.deleteOne(product);
     res.redirect('/admin/products');
  });
  //----------------EDIT PRODUCT--------------------------------
  router.get("/editProduct/:id", async (req, res, next) => {
    var id = req.params.id;
    var product = await ProductModel.findById(id);
    var types = await CategoryModel.find({});
    // var selectedType = types._id;
    res.render('manager/edit_product', { product, types, layout:'empty_layout' });
  })
  router.post('/editProduct/:id', async (req, res) => {
    try {
      var id = req.params.id;
      var product = req.body;
      //SQL: UPDATE brands SET A = B WHERE id = 'id'
      await ProductModel.findByIdAndUpdate(id, product);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
    res.redirect('/admin/products/');
  })

module.exports = router;