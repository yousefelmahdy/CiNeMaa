const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');

mongoose.connect('mongodb://localhost/sky')
        .then(()=>console.log('connected successfully'))
        .catch(err=>console.log('could not connect....'));


app.use(express.json());
app.use('/api/genres', genres );
app.use('/api/customers', customers );


const port = process.env.Port || 3000;
app.listen(port, () => console.log(`lisening on port ${port}`));
