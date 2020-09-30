const auth = require('../middleware/auth');
const employ = require('../middleware/employ');
const {Engine, validate} = require('../models/engine');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const engines = await Engine.find().sort('type');
  res.send(engines);
});

// Enable on testing, should delete when FE has token
router.post('/', [auth, employ], async (req, res) => {
  const data = req.body;
  console.log('this is the data',data);
  const { error } = validate(data);
  if (error) return res.status(400).send(error.details[0]);
  let  existingEngine = await Engine.findOne({ serialNumber: data.serialNumber });
  if (existingEngine)  return res.status(400).send('Maquina  ya registrada.');

  const engine = new Engine({
    brand: data.brand,
    model: data.model,
    type: data.type,
    serie: data.serie,
    class: data.class,
    designLetter: data.designLetter,
    typo: data.typo,
    power: data.power,
    serialNumber: data.serialNumber,
    letterCode: data.letterCode,
    voltage: data.voltage,
    amperage: data.amperage,
    RPM: data.RPM,
    frame: data.frame,
    frequency: data.frequency,
    serviceFact: data.serviceFact,
    others: data.others,
  });

  await engine.save();

  res.send(engine);
});

module.exports = router;
