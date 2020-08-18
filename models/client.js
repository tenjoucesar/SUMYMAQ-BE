const Joi = require('joi');
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 8,
    maxlength: 11,
  },
  mail: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  }
});

const Client = mongoose.model('Client', clientSchema);

function validateClient(client) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(25).required(),
    phone: Joi.number().integer().min(10000000).max(999999999).required(),
    mail: Joi.string().min(5).max(50).required(),
    address: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(client);
}

exports.Client = Client;
exports.clientSchema = clientSchema;
exports.validate = validateClient;
