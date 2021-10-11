const express = require('express');
const app = express();

const Joi = require('joi');
app.use(express.json());

const genres = require('./routes/genres');
app.use('/api/genres', genres );



const port = process.env.Port || 3000;
app.listen(port, () => console.log(`lisening on port ${port}`));
