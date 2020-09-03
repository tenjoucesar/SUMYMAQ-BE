const express = require('express');
const clients = require('../routes/client');
const users = require('../routes/users');
const auth = require('../routes/auth');
const engine = require('../routes/engine');
const preliminaryInspection = require('../routes/preliminaryInspection');
const failureCauses = require('../routes/failureCauses');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use('/api/clients', clients);
  app.use('/api/users', users);
  app.use('/api/engine', engine);
  app.use('/api/preliminaryInspection', preliminaryInspection);
  app.use('/api/failureCauses', failureCauses);
  app.use('/api/auth', auth);
  app.use(error);
}