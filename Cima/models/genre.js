const mongoose = require('mongoose');
const Joi = require('joi');


const Genre = mongoose.model('Genre', new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
}));

function validategenre(genre) {
    const schema = {
        name: Joi.string().required().min(3)
    };
    return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validategenre;
