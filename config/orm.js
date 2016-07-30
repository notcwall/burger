var connection = require('./connection.js');

function questionMarks(num){
	var arr = [];

	for(var i = 0; i < num; i++){
		arr.push('?');
	}

	return arr.toString();
}

function convertToSql(obj){
	var arr = [];

	for(var key in obj){
		arr.push(key + '=' + obj[key]);
	}

	return arr.toString();
}

var orm = {

	selectAll: function(input, cb){
		var queryString = 'SELECT * FROM ' + input + ';';
		connection.query(queryString, function(err, res){
			if(err){
				console.log(err);
			}
			cb(res);
		});
	},

	insertOne: function(table, cols, vals, cb){
		var queryString = 'INSERT INTO ' + table + ' (' + cols.toString() + ') VALUES (' + questionMarks(vals.length) + ');';

		connection.query(queryString, vals, function(err, res){
			if(err){
				console.log(err);
			}

			cb(res);
		});
	},

	updateOne: function(table, objColVals, condition, cb){
		var queryString = 'UPDATE ' + table + ' SET ' + convertToSql(objColVals) + ' WHERE ' + condition;

		connection.query(queryString, function(err, res){
			if(err){
				console.log(err);
			}

			cb(res);
		});
	}
};

module.exports = orm;