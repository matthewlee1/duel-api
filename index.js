var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json())

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/home', function (req, res) {
  res.send('home page!')
})

app.post('/home', function (req, res) {
  res.send("hello "+req.body.username)
})

app.post('/expenses', function (req, res) {
  new expenses({
  	description: req.body.description;
  	amount: req.body.amount;
  })
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})



var expenseSchema = new Schema({
	description: String,
	amount: Number
});

var expenses = mongoose.model('expenses', expenseSchema);
