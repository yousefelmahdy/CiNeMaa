const {Customer , validate } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const boolean = require('joi/lib/types/boolean');



router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res) => {
    const result = validate(req.body);
    if (result.error)
        return res.status(404).send(result.error.details[0].message);

    let customer = new Customer ({  
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
     });
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {

    const result = validate(req.body);
    if (result.error)
        return res.status(404).send(result.error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id , {name:req.body.name, phone: req.body.phone, isGold: req.body.isGold } ,{ new: true});
    // new --> to have the updated object 
    if (!customer) return res.status(404).send('customer not found');

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('customer not found');
    res.send(customer);

});

router.get('/:id',async (req,res)=>{
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('customer not found');
    res.send(customer);
});




module.exports = router;