const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    passward:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    }

}));



function validateuser(user) {
    const schema = {
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().email().min(5).max(255),
        passward: Joi.string().required().max(1024).min(5)
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateuser;