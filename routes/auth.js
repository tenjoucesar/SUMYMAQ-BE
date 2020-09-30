const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;
  const { error } = validate(data);

  if (error)  return res.status(400).send(error.details[0]);

  let user = await User.findOne({ mail: data.mail });
  // Implement better validation, this only checks email, would need 404
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(data.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  // Well improve it
  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    mail: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;