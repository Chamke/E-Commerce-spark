const {Shipment,validate} = require('../models/shipment');
const{Order} = require('../models/order');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//GET
router.get('/', async (req, res) => {
  const shipments = await Shipment.find();
  res.send(shipments);
});

//POST
router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const order = await Order.findById(req.body.orderId);
  if(!order) return res.status(400).send('Invalid order.');



  let shipment = new Shipment({ 
    order:{
        _id: order._id,
        deliveryAddress: order.deliveryAddress,
        createdAt: order.createdAt
        
    },

    deliveredAt: req.body.deliveredAt,
    senderAddress: req.body.senderAddress
    
 });
  shipment = await shipment.save();
 
  shipment.save();
  
  res.send(shipment);
});

//PUT
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send({
        message: `Invalid format. Expected: { 'orderId':'_id','senderAddress' : 'Address'}`,
      });
  
    const shipment = await Shipment.findByIdAndUpdate(
        req.params.id, 
    {   deliveredAt: req.body.deliveredAt,
        senderAddress: req.body.senderAddress
     
         }, 
        {new: true}
        
        );

    if (!shipment) return res.status(404).send('The order with the given ID was not found.');  
    
    res.send(shipment);
  });

  //DELETE
  router.delete('/:id', async (req, res) => {
    const order = await Shipment.findByIdAndRemove(req.params.id);
  
    if (!order) return res.status(404).send('The order with the given ID was not found.');
  
    res.send(shipment);
  });
  
  



module.exports = router;