var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to mongodb'));
db.once('open', function() {
  console.log('Mongodb connection successful');
});

module.exports = db;
