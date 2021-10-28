const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('config');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.post('/', async (req, res) => {
    const result = validate(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid email or passward');

    const validPassward = await bcrypt.compare(req.body.passward , user.passward);
    if(!validPassward) return res.status(400).send('Invalid email or passward');
    const token = user.generateAuthToken();
    res.send(token);
});

function validate(req) {
    const schema = {
        email: Joi.string().required().email().min(5).max(255),
        passward: Joi.string().required().max(1024).min(5)
    };
    return Joi.validate(req, schema);
}


module.exports = router;