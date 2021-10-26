const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    isGold:{
        type: Boolean,
        default: false
    },
    phone:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }

}));



function validatecustomer(customer) {
    const schema = {
        name: Joi.string().required().min(5),
        phone: Joi.string().required().min(5),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validatecustomer;