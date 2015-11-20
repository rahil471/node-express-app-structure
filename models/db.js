var mysql =	require("mysql");

/**
 * Defines database operations.
 * @class
 */
var DB = function(){};

DB.prototype.createPool = function(){
	return mysql.createPool({
			host     : 'localhost',
			user     : 'root',
			password : '',
			connectionLimit : 100
		});
}

/**
 * Establishes mysql connection and returns the connection object.
 * @function
 * @param {object} pool - Mysql pool object.
 * @param {function} callback - Callback.
 */
DB.prototype.getConnection = function(pool,callback){
	var self = this;
	pool.getConnection(function(err, connection) {
		if(err) {
			//logging here
			console.log(err);
			callback(true);
			return;
		}
		connection.on('error', function(err) {
			if(err.code === "PROTOCOL_CONNECTION_LOST") {
				connection.destroy();				
			} else {
				connection.release();
			}
			console.log(err);
			callback(true);
			return;
		});
		callback(null,connection);
	});
}

/**
 * Establishes mysql connection, begins transaction and returns the transactio connection object.
 * @function
 * @param {object} pool - Mysql pool object.
 * @param {function} callback - Callback.
 */
DB.prototype.createTransaction = function(pool,callback) {
	var self = this;
	self.getConnection(pool,function(err,connection){
		if(err) {
			//logging here
			console.log(err);
			callback(true);
			return;
		}
		connection.beginTransaction(function(err) {
			if(err){
				console.log(err);
				callback(true);
				return;
			}
			callback(null,connection)
		});
	});
}

module.exports = new DB();