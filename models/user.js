var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  userName: String,
  password: String,
  favFood: String,
  favColor: String,
  rocks: Array
});

var User = mongoose.model('User', userSchema);


module.exports = User;