const express = require('express');
const ProductModel = require('../models/ProductModel');
const CategoryModel = require('../models/CategoryModel');
const router = express.Router();

router.get("/categories", async(req, res, next) => {
  var types = await CategoryModel.find({});
  res.render('manager/category', {layout: 'admin_layout', types: types, title: 'Categories'});
})
//--------------ADD CATEGORY-------------------------
router.post("/addCate", async(req, res) =>{
  var type = new CategoryModel();
  type.name = req.body.category_name;
  await type.save();
  res.redirect("/admin/categories");
})
  
  router.get("/addCate", (req, res, next) => {
    res.render('manager/add_cate', {layout: 'empty_layout'});
  })
  //-------------DELETE CATEGORY------------------------
  router.get("/deleteCate/:id", async(req, res, next) =>{
    var id = req.params.id;
    var type = await CategoryModel.findById(id);
     await CategoryModel.deleteOne(type);
     res.redirect('/admin/categories');
  });
  //-------------EDIT CATEGORY------------------------
  router.get("/editCate/:id", async(req, res, next) =>{
    var id = req.params.id;
    // var types = req.body;
    var types = await CategoryModel.findById(id);
     res.render('manager/edit_cate', { types, layout: 'empty_layout' });
  });
  
  router.post('/editCate/:id', async (req, res) => {
    try {
      var id = req.params.id;
      var types = req.body;
      await CategoryModel.findByIdAndUpdate(id, types );
      console.log('Update succeeded!');
    } catch (err) {
      console.log('Update failed. Error: ' + err);
    }
    res.redirect('/admin/categories');
  });

  module.exports = router;