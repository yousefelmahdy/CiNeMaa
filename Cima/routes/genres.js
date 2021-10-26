const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {Genre , validate} = require('../models/genre');

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', async (req, res) => {
    const result = validategenre(req.body);
    if (result.error)
        return res.status(404).send(result.error.details[0].message);

    let genre = new Genre ({  name: req.body.name });
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {

    const result = validategenre(req.body);
    if (result.error)
        return res.status(404).send(result.error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id , {name:req.body.name} ,{ new: true});
    // new --> to have the updated object 
    if (!genre) return res.status(404).send('genre not found');

    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('genre not found');
    res.send(genre);

});

router.get('/:id',async (req,res)=>{
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('genre not found');
    res.send(genre);
});


module.exports = router;