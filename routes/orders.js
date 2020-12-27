const {Order,validate} = require('../models/order');
const {Customer} = require('../models/customer');
const{Product} = require('../models/product');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//GET
router.get('/', async (req, res) => {
  const orders = await Order.find().sort('name');
  res.send(orders);
});

//POST
router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send({
    message: `Invalid format. Expected: { 'customerId':'_id','productId' : '_id','cost' : '2.99','deliveryAddress':'Address'}`,
  });

  const customer = await Customer.findById(req.body.customerId);
  if(!customer) return res.status(400).send('Invalid customer.');

  const product = await Product.findById(req.body.productId);
  if(!product)  return res.status(400).send('Invalid product.');

  if(product.quantity === 0) return res.status(400).send('Out of stock.');



  let order = new Order({ 
    customer:{
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
        email: customer.email
    },

    product:{
        _id: product._id,
        name: product.name,
        vendor: product.vendor

    },
    cost:req.body.cost,
    deliveryAddress: req.body.deliveryAddress
    
 });
  order = await order.save();
  product.quantity--;
  product.save();
  
  res.send(order);
});

//PUT
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send({
        message: `Invalid format. Expected: { 'customerId':'_id','productId' : '_id','cost' : '2.99','deliveryAddress':'Address'}`,
      });
  
    const order = await Order.findByIdAndUpdate(
        req.params.id, 
    {   cost:req.body.cost,
        deliveryAddress: req.body.deliveryAddress
     
         }, 
        {new: true}
        
        );

    if (!order) return res.status(404).send('The order with the given ID was not found.');  
    
    res.send(order);
  });
  
  //DELETE
  router.delete('/:id', async (req, res) => {
    const order = await Order.findByIdAndRemove(req.params.id);
  
    if (!order) return res.status(404).send('The order with the given ID was not found.');
  
    res.send(order);
  });
  
  



module.exports = router;