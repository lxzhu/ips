var Promise = require('promise');
var mysql = require('./mysqlp.js');
function ProductTypeBuz() {
}

module.exports = {
	createBuz : function() {
		return new ProductTypeBuz()
	}
};
ProductTypeBuz.prototype.exists = function(name) {
	return new Promise(function(resolve, reject) {
		var sql = "select 1 from ips_product_type where name=?";
		mysql.query(sql, name).then(function(rows) {
			var hasRow = false;
			if (rows && rows.length > 0) {
				console.log("product_type.exists.resolve with true");
				resolve(true);
			} else {
				console.log("product_type.exists resolve with false");
				resolve(false);
			}
		}, function(ex) {
			console.log("product_type reject");
			reject(ex);
		})
	});
}
ProductTypeBuz.prototype.add = function(typeModel) {

	function onExists(exists) {
		return new Promise(function(resolve, reject) {
			if (!exists) {
				console.log("product_type.add.onExists resolve with true");
				resolve(true);
			} else {
				console.log("product_type.add.onExists reject");
				reject({
					code : "E_PRODUCT_TYPE_DUPLICATE_NAME"
				});
			}
		});
	}

	function onInsert(model) {
		var sql = "insert into ips_product_type(product_type_id,name,display_name"
				+ ",parent_id,fadatetime)" + " values (?,?,?,?,?)";
		model.fadatetime = new Date();
		var args = [ model.product_type_id, model.name, model.display_name,
				model.parent_id, model.fadatetime ];
		var promise = mysql.insert(sql, args).then(function(result) {
			console.log("product_type.add.onInsert resolve");
			return model;
		}, function(ex) {
			console.log("product_type.add.onInsert reject");
			return {
				code : "E_PRODUCT_TYPE_SAVE_FAILED",
				message : ex.message
			}
		});
		return promise;
	}

	return this.exists(typeModel.name).then(function(exists) {
		return onExists(exists);
	}).then(function() {
		return onInsert(typeModel);
	});
}

ProductTypeBuz.prototype.list = function(criteria) {
	criteria=criteria||{};
	console.log("product_type.list.criteria:"+JSON.stringify(criteria));
	var sql = "select product_type_id,name,display_name,parent_id from "
			+ mysql.trname('product_type');
	var where = "";
	var args = [];
	if (criteria.parent_id && criteria.parent_id > 0) {
		where += "parent_id=?";
		args.push(criteria.parent_id);
	}
	if(where!=""){
		sql+=" where "+where;
	}
	return mysql.query(sql, args).then(function(result) {
		return result.rows;
	});
}

