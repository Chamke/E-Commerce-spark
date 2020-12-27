const Joi = require('joi');
const mongoose = require('mongoose');

const Order = mongoose.model('Order', new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name:{
                type:String,
                required:true,
                minlength:5,
                maxlength :50
            },
            email:{
                type:String,
                required: true,
                minlength:10,
                maxlength:50
            },
            phone:{
                type:String,
                required: true,
                minlength:5,
                maxlength:50
            }
        }),
        required:true
    },

    product:{
        type: new mongoose.Schema({
            name:{
                type:String,
                required:true,
                minlength:5,
                maxlength :50
            },
            vendor:{
                type:String,
                required:true,
                minlength:5,
                maxlength :50
            }
        }),
        required:true
    },
    
    createdAt:{
        type: Date,
        required:true,
        default:Date.now
    },
    cost:{
        type:Number,
        required: true,
        min: 0,
        max: 2000
    },
    deliveryAddress:{
        type:String,
        required: true,
        minlength: 5,
        maxlength: 100

    }

}));

  function validateOrder(order) {
    const schema = {
     
      customerId: Joi.string().required(),
      productId: Joi.string().required(),
      cost : Joi.number().min(0).max(2000).required(),
      deliveryAddress: Joi.string().min(5).max(100).required()
      

    };

    return Joi.validate(order, schema);
  }

  module.exports.Order = Order;
  module.exports.validate = validateOrder;