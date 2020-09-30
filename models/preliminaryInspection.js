const Joi = require('joi');
const mongoose = require('mongoose');

const PreliminaryInspection = mongoose.model('PreliminaryInspection', new mongoose.Schema({
  plateCondition: { type: Boolean, required: true},
  housingCondition: { type: Boolean, required: true },
  hasTerminalBlock: { type: Boolean, required: true },
  terminalBlockCondition: { type: Boolean, required: false },
  hasFan: { type: Boolean, required: true },
  fanCondition: { type: Boolean, required: false },
  conectionBoxCondition: { type: Boolean, required: true },
  legsCondition: { type: Boolean, required: true },
  impellerCondition: { type: Boolean, required: true },
  nucleusCondition: { type: Boolean, required: true },
  rotorCondition: { type: Boolean, required: true },
  coversCondition: { type: Boolean, required: true },
  coverNeedsJacket: { type: Boolean, required: true },
  others: {type: String, required: false, minlength: 4, maxlength: 50},
}));

function validatePreliminaryInspection(preliminaryInspection) {
  const schema = Joi.object({
    plateCondition: Joi.boolean().required(),
    housingCondition: Joi.boolean().required(),
    hasTerminalBlock: Joi.boolean().required(),
    terminalBlockCondition: Joi.boolean(),
    hasFan: Joi.boolean().required(),
    fanCondition: Joi.boolean(),
    conectionBoxCondition: Joi.boolean().required(),
    legsCondition: Joi.boolean().required(),
    impellerCondition: Joi.boolean().required(),
    nucleusCondition: Joi.boolean().required(),
    rotorCondition: Joi.boolean().required(),
    coversCondition: Joi.boolean().required(),
    coverNeedsJacket: Joi.boolean().required(),
    others: Joi.string().min(4).max(255),
  });

  return schema.validate(preliminaryInspection);
}

exports.PreliminaryInspection = PreliminaryInspection;
exports.validate = validatePreliminaryInspection;
