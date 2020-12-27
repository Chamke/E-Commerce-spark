const Joi = require('joi');
const mongoose = require('mongoose');

const Product = mongoose.model('Product', new mongoose.Schema({
    name:String,
    quantity:Number,
    vendor:String,
    
  }));

  function validateProduct(product) {
    const schema = {
     
      name: Joi.string().required(),
      quantity: Joi.number().min(5).max(50).required(),
      vendor: Joi.string().min(5).max(50).required(),
      
    };

    return Joi.validate(product, schema);
    
  }

  module.exports.Product = Product;
  module.exports.validate = validateProduct;