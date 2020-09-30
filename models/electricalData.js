const Joi = require('joi');
const mongoose = require('mongoose');

const ElectricalData = mongoose.model('ElectricalData', new mongoose.Schema({
  maintenance : {
    initialIsolation: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    initialPolarizationIndex: {
      type: Number,
      required: true,
      minlength: 8,
      maxlength: 11,
    },
    finalIsolation: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    finalPolarizationIndex: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    }
  },
  rewinding: {
    finalInsulation: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    finalAmperage: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    testVoltage: {
      type: Number,
      required: true,
      minlength: 8,
      maxlength: 11,
    },
  },
  others: {type: String, required: false, minlength: 4, maxlength: 255},
}));

function validateElectricalData(electricalData) {
  const schema = Joi.object({
    maintenance: {
      initialIsolation: Joi.string().min(5).max(25).required(),
      initialPolarizationIndex: Joi.number().integer().min(10000000).max(999999999).required(),
      finalIsolation: Joi.string().min(5).max(100).required().email(),
      finalPolarizationIndex: Joi.string().min(5).max(255).required(),
    },
    rewinding: {
      finalInsulation: Joi.number().integer().min(10000000).max(999999999).required(),
      finalAmperage: Joi.string().min(5).max(100).required().email(),
      testVoltage: Joi.string().min(5).max(255).required(),
    },
    others: Joi.string().min(4).max(255),
  });

  return schema.validate(electricalData);
}

exports.ElectricalData = ElectricalData;
exports.validate = validateElectricalData;