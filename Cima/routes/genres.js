const express = require('express');
const router = express.Router();
const Joi = require('joi');
const genres = [
    { id: 1, type: 'action' },
    { id: 2, type: 'comedy' },
    { id: 3, type: 'romantic' }
]


router.get('/', (req, res) => {
    res.send(genres);
});

router.post('/', (req, res) => {
    const result = validategenre(req.body);
    if (result.error)
        return res.status(404).send(result.error.details[0].message);

    const genre = {
        id: genres.length + 1,
        type: req.body.type

    };

    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('genre not found');

    const result = validategenre(req.body);
    if (result.error)
        return res.status(404).send(result.error.details[0].message);

    genre.type = req.body.type;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('genre not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);

});

router.get('/:id',(req,res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('genre not found');
    res.send(genre);

});




function validategenre(genre) {
    const schema = {
        type: Joi.string().required().min(3)
    };
    return Joi.validate(genre, schema);
}

module.exports = router;