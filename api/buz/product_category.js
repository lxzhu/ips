var Promise = require('promise');
var mysql = require('./mysqlp.js');
var errno = require('./errno.js');
var errnoBASE = 1000;
function ProductCategoryBuz() {

}

module.exports = {
	createBuz : function() {
		return new ProductCategoryBuz();
	}
}

ProductCategoryBuz.prototype.add = function(category) {
	return new Promise(function(resolve, reject) {
		var sql = 'insert into ips_product_category'
				+ ' (Name,HasChildren,ParentCategoryId,CreatedOn)' + ' values'
				+ '(?,?,?,?);';
		category.createdOn = new Date();
		var args = [ category.name, category.hasChildren,
				category.parentCategoryId, category.createdOn ];
		mysql.insert(sql, args).then(function(result) {
			console.log("ProductCategoryBuz.add resolve");
			category.categoryId = result.insertId;
			resolve(category);
		}, reject);
	});
}
ProductCategoryBuz.prototype.getCategoryById = function(id) {
	console.log("ProductCategoryBuz.getCategoryById enter");
	return new Promise(
			function(resolve, reject) {
				var sql = "select name, hasChildren,parentCategoryId from ips_product_category where categoryId=?";
				mysql
						.query(sql, id)
						.then(
								function(result) {
									console.log(JSON.stringify(result));
									var row = result.rows ? result.rows.length > 0 ? result.rows[0]
											: null
											: null;
									if (row) {
										resolve(row);
									} else {
										reject({
											code : E_PRODUCT_CATEGORY_NOT_EXIST,
											errno : E_PRODUCT_CATEGORY_NOT_EXIST,
											args : {
												categoryId : id
											}
										});
									}
								}, function(ex) {
									reject(ex);
								});
			});
}
ProductCategoryBuz.prototype.update = function(category) {
	console.log("ProductCategoryBuz.update enter");
	var that = this;
	return new Promise(
			function(resolve, reject) {
				that
						.getCategoryById(category.categoryId)
						.then(
								function(row) {
									var sql = 'update ips_product_category set name=?, hasChildren=?,parentCategoryId=?,modifiedOn=?'
											+ ' where categoryId=?';
									var args = [ category.name,
											category.hasChildren,
											category.parentCategoryId,
											new Date(), category.categoryId ];
									mysql.query(sql, args).then(
											function(result) {
												resolve({});
											}, function(ex) {
												reject(ex);
											});
								}, function(ex) {
									reject(ex);
								});

			});
}

ProductCategoryBuz.prototype.list = function(parentId) {
	console.log("ProductCategoryBuz.list enter");

	function actor(resolve, reject) {
		var sql = "select categoryId,name,hasChildren,parentCategoryId from ips_product_category where ";
		var args = [];
		if (parentId) {
			sql += " parentCategoryId=?";
			args.push(parentId);
		} else {
			sql += " parentCategoryId is null";
		}
		console.log('sql:' + sql);
		mysql.query(sql, args).then(function(result) {
			console.log(JSON.stringify(result));
			resolve(result.rows);
		}, reject);
	}
	return new Promise(actor);
}

ProductCategoryBuz.prototype.all = function(parentId) {
	console.log("ProductCategoryBuz.list enter");

	function actor(resolve, reject) {
		var sql = "select categoryId,name,hasChildren,parentCategoryId from ips_product_category ";

		mysql.query(sql).then(function(result) {
			console.log(JSON.stringify(result));
			resolve(result.rows);
		}, reject);
	}
	return new Promise(actor);
}