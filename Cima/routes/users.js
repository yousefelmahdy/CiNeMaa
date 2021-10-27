const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User , validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    const result = validate(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('user already registered');

    user = new User (req.body , ['name','email','passward']);
    const salt = await bcrypt.genSalt(10);
    user.passward = await bcrypt.hash(user.passward , salt);
    await user.save();
    res.send(_.pick(user,['_id','name','email']));
});


module.exports = router;