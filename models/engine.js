const Joi = require('joi');
const mongoose = require('mongoose');

const Engine = mongoose.model('Engine', new mongoose.Schema({
  brand: {
    type: String, required: true, minlength: 4, maxlength: 50,
  },
  model: {
    type: Number, required: true, minlength: 4, maxlength: 50,
  },
  type: {
    type: String, required: true, minlength: 4, maxlength: 50,
  },
  serie: {
    type: Number, required: true, minlength: 4, maxlength: 50,
  },
  class: {
    type: String, required: true, minlength: 4, maxlength: 50
  },
  designLetter: {
    type: String, required: true, minlength: 4, maxlength: 50
  },
  typo: {
    type: String, required: true, minlength: 4, maxlength: 50
  },
  serialNumber: {
    type: Number, required: true, minlength: 4, maxlength: 50
  },
  letterCode: {
    type: Number, required: true, minlength: 4, maxlength: 50
  },
  power: {
    type: String, required: true, minlength: 4, maxlength: 50
  },
  voltage: {
    type: Number, required: true, minlength: 4, maxlength: 50
  },
  amperage: {
    type: Number, required: true, minlength: 4, maxlength: 50
  },
  RPM: {
    type: Number, required: true, minlength: 4, maxlength: 50
  },
  frame: {
    type: Number, required: true, minlength: 4, maxlength: 50
  },
  frequency: {
    type: Number, required: true, minlength: 4, maxlength: 50
  },
  serviceFact: {
    type: String, required: true, minlength: 4, maxlength: 50
  },
  others: {
    type: String, required: false, minlength: 4, maxlength: 50
  },
}));

function validateEngine(engine) {
  console.log(engine);
  const schema = Joi.object({
    brand: Joi.string().min(4).max(50).required(),
    model: Joi.number().integer().required(), //Missing
    type: Joi.string().min(4).max(50).required(),
    serie: Joi.number().required(), //Missing
    class: Joi.string().min(4).max(50).required(),
    designLetter: Joi.string().min(4).max(50).required(),
    typo: Joi.string().min(4).max(50).required(),
    //missing
    power: Joi.number().required(),
    serialNumber: Joi.number().integer().required(),
    letterCode: Joi.number().required(), // Unsure
    voltage: Joi.number().required(),
    amperage: Joi.number().required(),
    RPM: Joi.number().required(),
    frame: Joi.number().required(),
    frequency: Joi.number().required(),
    //mising
    serviceFact: Joi.string().min(4).max(50).required(),
    others: Joi.string().min(4).max(255),
  });

  return schema.validate(engine);
}

exports.Engine = Engine;
exports.validate = validateEngine;
