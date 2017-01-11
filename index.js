var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json())

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/duel-api');

var Schema = mongoose.Schema;

var expenseSchema = new Schema({
	description: String,
	amount: Number,
	type: String
});

var profileSchema = new Schema({
	income: Number,
	name: String
})

var expenses = mongoose.model('expenses', expenseSchema);

var profile = mongoose.model('profile', profileSchema);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/profile', function (req, res) {
  new profile({
  	income: req.body.income,
  	name: req.body.name,

  }).save(function(err,profile){
  		if(err) res.json(err);
  		else res.send('Successfully Inserted');
  })
})

app.get('/expenses', function (req, res) {
  expenses.find({},function(err,expenses){
  		if(err) res.json(err);
  		else {
  			var total = expenses.reduce(function(a,b){
  				return {"amount":a.amount + b.amount}
  			},{"amount":0})
  			var expTotal = {
  				"expenses": expenses,
  				"total": total.amount
  			}
  			res.send(expTotal);
  		}
  });
})

app.post('/expenses', function (req, res) {
  new expenses({
  	description: req.body.description,
  	amount: req.body.amount,
  	type: req.body.type,


  }).save(function(err,expenses){
  		if(err) res.json(err);
  		else res.send('Successfully Inserted');
  })
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})



