const auth = require('../middleware/auth');
const employ = require('../middleware/employ');
const {Client, validate} = require('../models/client');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const clients = await Client.find().sort('name');
  res.send(clients);
});

// Enable on testing, should delete when FE has token
// router.post('/', async (req, res) => {
router.post('/', [auth, employ], async (req, res) => {
  const data = req.body;
  console.log(data);
  const { error } = validate(data);
  if (error)  {
    console.log('failed');
    console.log(error);
    console.log(error.details[0]);
    return res.status(400).send(error.details[0]);
  }

  const client = new Client({
    name: data.name,
    phone: data.phone,
    mail: data.mail,
    address: data.address,
  });

  await client.save();

  res.send(client);
});

router.delete('/:id', async (req, res) => {
  const client = await Client.findByIdAndRemove(req.params.id);
  if (!client) return res.status(404).send('The client doesnt exists');

  res.send(customer);
})

module.exports = router;
