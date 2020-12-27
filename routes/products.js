const {Product,validate} = require('../models/product');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//GET
router.get('/', async (req, res) => {
  const products = await Product.find().sort('name');
  res.send(products);
});

//POST
router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send({
    message: `Invalid format. Expected: { 'name':'name','quantity' : '5-50','vendor' : 'vendor'}`,
  });

  let product = new Product({ 
    name:req.body.name,
    quantity: req.body.quantity,
    vendor: req.body.vendor
 });
  product = await product.save();

  
  res.send(product);
});

//PUT
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send({
        message: `Invalid format. Expected: { 'name':'name','quantity' : '5-50','vendor' : 'vendor'}`,
      });
  
    const product = await Product.findByIdAndUpdate(
        req.params.id, 
    {   name:req.body.name,
        quantity: req.body.quantity,
        vendor: req.body.vendor
     
         }, 
        {new: true}
        
        );

    if (!product) return res.status(404).send('The product with the given ID was not found.');  
    
    res.send(product);
  });

  //DELETE
  router.delete('/:id', async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);
  
    if (!product) return res.status(404).send('The product with the given ID was not found.');
  
    res.send(product);
  });
  
  



module.exports = router;