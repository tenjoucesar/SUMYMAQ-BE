const winston = require('winston');
const mongoose = require('mongoose');
const sumymaqDB = 'mongodb://localhost/sumymaq';

module.exports = function() {
  mongoose.connect(sumymaqDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => winston.info('Conectado a la base de datos MongoDB'));
}