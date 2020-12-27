const Joi = require('joi');
const mongoose = require('mongoose');

const Shipment = mongoose.model('Shipment', new mongoose.Schema({
    order:{
        type: new mongoose.Schema({
            deliveryAddress:{
                type:String,
                required:true,
                minlength:5,
                maxlength :50
            },
            
            createdAt:{
                type:Date,
                required: true
            }
        }),
        required:true
    },
    
    deliveredAt:{
        type: Date,
        required:true,
        default:Date.now
    
    },

    senderAddress:{
        type:String,
        required: true,
        minlength: 5,
        maxlength: 255

    }

}));

  function validateShipment(shipment) {
    const schema = {
     
      orderId: Joi.string().required(),
      senderAddress: Joi.string().required()
      

    };

    return Joi.validate(shipment, schema);
  }

  module.exports.Shipment = Shipment;
  module.exports.validate = validateShipment;