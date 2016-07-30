var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

router.get('/', function(req, res){
	res.redirect('/burgers');
});

router.get('/burgers', function(req, res){
	burger.selectAll(function(data){
		var hbsObject = {burgers : data};
		res.render('index', hbsObject);
	});
});

router.post('/burgers/create', function(req, res){
	burger.insertOne(['name'], [req.body.name], function(data){
		res.redirect('/burgers');
	});
});

router.put('/burgers/update/:id', function(req, res){
	var condition = 'id = ' + req.params.id;

	burger.updateOne({'devoured' : req.body.devoured}, condition, function(data){
		res.redirect('/burgers');
	});
});

//router.delete('/burgers/delete/:id', function(req, res){
//	var condition = 'id = ' + req.params.id;

//	burger.delete(condition, function(data){
//		res.redirect('/burgers');
//	});
//});

module.exports = router;