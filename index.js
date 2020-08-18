const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const mongoose = require('mongoose');
const clients = require('./routes/client');
const app = express();
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log('did it?')
  next();
});

mongoose.connect('mongodb://localhost/sumymaq', {useNewUrlParser: true, useUnifiedTopology: true }, )
  .then(() => console.log('connected'))
  .catch(err => console.errorI('failed', err))

app.use('/api/clients', clients);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
