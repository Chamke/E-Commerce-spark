
const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: String,
    email:String,
    phone:String,
    birthDate:String
   
  }));

  function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(50).required(),
      phone: Joi.string().min(9).max(15).required(),
      birthDate: Joi.string().min(5).max(50).required()

    };

    return Joi.validate(customer, schema);
  }

  module.exports.Customer = Customer;
  module.exports.validate = validateCustomer;