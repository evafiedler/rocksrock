
var express = require('express');
var mongoose = require('mongoose');

var app = express();
app.use(express.urlencoded());
app.use(express.json());
app.set('view engine','ejs');
app.use(express.static('public'));
require('./routes/routes.js')(app);

mongoose.connect("la");

app.listen(3000);
console.log("Listening at localhost:3000");
