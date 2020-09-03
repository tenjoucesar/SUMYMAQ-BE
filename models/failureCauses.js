const Joi = require('joi');
const mongoose = require('mongoose');

const FailureCauses = mongoose.model('FailureCauses', new mongoose.Schema({
  windingHasShortCircuit: { type: Boolean, required: true},
  overheatedWinding: { type: Boolean, required: true },
  isDirty: { type: Boolean, required: true },
  mechanicalFailure: { type: Boolean, required: true },
  lostPhase: { type: Boolean, required: true },
  rotorHasShortCircuit: { type: Boolean, required: true },
  others: {type: String, required: false, minlength: 4, maxlength: 255},
}));

function validateFailureCauses(failureCauses) {
  const schema = Joi.object({
    windingHasShortCircuit: Joi.boolean().required(),
    overheatedWinding: Joi.boolean().required(),
    isDirty: Joi.boolean().required(),
    mechanicalFailure: Joi.boolean().required(),
    lostPhase: Joi.boolean().required(),
    rotorHasShortCircuit: Joi.boolean().required(),
    others: Joi.string().min(4).max(255),
  });

  return schema.validate(failureCauses);
}

exports.FailureCauses = FailureCauses;
exports.validate = validateFailureCauses;