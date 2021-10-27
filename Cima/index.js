const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const config = require('config');

if(!config.get('jwtPrivateKey')){
  console.error('FATAL error in jwtPrivateKey');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/sky')
        .then(()=>console.log('connected successfully'))
        .catch(err=>console.log('could not connect....'));


app.use(express.json());
app.use('/api/genres', genres );
app.use('/api/customers', customers );
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth' , auth);

const port = process.env.Port || 3000;
app.listen(port, () => console.log(`lisening on port ${port}`));
