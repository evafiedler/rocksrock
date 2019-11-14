var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rockSchema = new Schema({
  rockName: String,
  rockColor: String,
  rockNum: Number,
  userName: String
});

var Rock = mongoose.model('Rock', rockSchema);


module.exports = {model: Rock};