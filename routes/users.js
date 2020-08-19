const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async(req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
})


router.post('/', async (req, res) => {

  const data = req.body;
  const { error } = validate(data);

  if (error)  return res.status(400).send(error.details[0]);

  let user = await User.findOne({ mail: data.mail });
  if (user) return res.status(400).send('Usuario actualmente registrado.');

  user =  new User(_.pick(data, ['name', 'mail', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'mail']));
});

module.exports = router;