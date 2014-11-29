var Promise = require('promise');
var mysql = require('mysql');
var options = {
	host : "localhost",
	port : "3306",
	user : "root",
	password : "N0rikos123",
	database : "ips",
	multipleStatements : true
};
var pool = mysql.createPool(options);
var mysqlp={};
mysqlp.query=function(sql,args){
	return new Promise(function(resolve,reject){
		pool.query(sql,args,function(ex,rows,fields){
			if(ex){
				reject(ex);
			}else{
				resolve({
					rows:rows,
					fields:fields
				})
			}
		});
	});
}
mysqlp.insert=function(sql,args){
	return new Promise(function(resolve,reject){
		pool.query(sql,args,function(ex,result){
			if(ex){
				console.log("mysqlp.insert.reject");
				reject(ex);
			}else{
				console.log("mysqlp.insert.resolve");
				resolve(result);
			}
		});
	});
}
module.exports = mysqlp;