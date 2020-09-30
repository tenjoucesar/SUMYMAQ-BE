const auth = require('../middleware/auth');
const employ = require('../middleware/employ');
const {PreliminaryInspection, validate} = require('../models/preliminaryInspection');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const preliminaryInspections = await PreliminaryInspection.find().sort('type');
  res.send(preliminaryInspections);
});


router.post('/', [auth, employ], async (req, res) => {
  const data = req.body;
  const { error } = validate(data);
  if (error) return res.status(400).send(error.details[0]);

  const preliminaryInspection = new PreliminaryInspection({
    plateCondition: data.plateCondition,
    housingCondition: data.housingCondition,
    hasTerminalBlock: data.hasTerminalBlock,
    terminalBlockCondition: data.terminalBlockCondition,
    hasFan: data.hasFan,
    fanCondition: data.fanCondition,
    conectionBoxCondition: data.conectionBoxCondition,
    legsCondition: data.legsCondition,
    impellerCondition: data.impellerCondition,
    nucleusCondition: data.nucleusCondition,
    rotorCondition: data.rotorCondition,
    coversCondition: data.coversCondition,
    coverNeedsJacket: data.coverNeedsJacket,
    others: data.others,
  });

  await preliminaryInspection.save();

  res.send(preliminaryInspection);
});

module.exports = router;
