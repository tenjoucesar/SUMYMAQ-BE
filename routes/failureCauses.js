const auth = require('../middleware/auth');
const employ = require('../middleware/employ');
const {FailureCauses, validate} = require('../models/failureCauses');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const failureCauses = await FailureCauses.find();
  res.send(failureCauses);
});


router.post('/', [auth, employ], async (req, res) => {
  const data = req.body;
  const { error } = validate(data);
  if (error) return res.status(400).send(error.details[0]);

  const failureCauses = new FailureCauses({
    windingHasShortCircuit: data.windingHasShortCircuit,
    overheatedWinding: data.overheatedWinding,
    isDirty: data.isDirty,
    mechanicalFailure: data.mechanicalFailure,
    lostPhase: data.lostPhase,
    rotorHasShortCircuit: data.rotorHasShortCircuit,
    others: data.others,
  });

  await failureCauses.save();

  res.send(failureCauses);
});

module.exports = router;
