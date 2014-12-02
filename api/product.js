var route = require('./route.js').create();
var product_category = require('./buz/product_category.js');
var product_type = require('./buz/product_type.js');
module.exports = {
	attach : function(app) {
		route.attach(app);
	}
};

/**
 * 
 * @param req
 * @param res
 */
function product_category_list(req, res) {
	console.log("category_list.enter");
	var buz = product_category.createBuz();
	var parentCategoryId = req.body.parentCategoryId;
	buz.list(parentCategoryId).then(function(result) {
		console.log("category_list.resolve");
		res.json(result);
	}, function(ex) {
		res.json(ex);
	}).done();
}

function product_category_all(req, res) {
	console.log("category_all.enter");
	var buz = product_category.createBuz();

	buz.all().then(function(result) {
		console.log("category_all.resolve");
		res.json(result);
	}, function(ex) {
		res.json(ex);
	}).done();
}

function product_category_add(req, res) {
	var buz = product_category.createBuz();
	buz.add(req.body).then(function(result) {
		console.log("category_add.resolve");
		res.json(result);
	}, function(ex) {
		res.json(ex);
	}).done();
}

function product_category_update(req, res) {
	console.log("category_update.enter");
	var buz = product_category.createBuz();
	buz.update(req.body).then(function(result) {
		console.log("category_update.resolve");
		res.json(result);
	}, function(ex) {
		res.json(ex);
	}).done();
}

function product_category_delete(req, res) {

}
function product_type_add(req, res) {
	var buz = product_type.createBuz();
	buz.add(req.body).then(function(result) {
		console.log("product_type_add.resolve");
		res.json(result);
	}, function(ex) {
		console.log("product_type_add.reject");
		res.json(ex);
	}).done();
}

function product_type_list(req, res) {
	var buz = product_type.createBuz();
	buz.list(req.body).then(function(result) {
		console.log("product_type_list.resolve");
		res.json(result);
	}, function(ex) {
		console.log("product_type_list.reject");
		res.json(ex);
	}).done();
}

function product_type_all(req, res) {
	var buz = product_type.createBuz();
	buz.list().then(function(result) {
		console.log("product_type_all.resolve");
		res.json(result);
	}, function(ex) {
		console.log("product_type_all.reject");
		res.json(ex);
	}).done();
}

(function() {
	route.post('/product/category/list', product_category_list);
	route.post('/product/category/all', product_category_all);
	route.post('/product/category/add', product_category_add);
	route.post('/product/category/delete', product_category_delete);
	route.post('/product/category/update', product_category_update);
	route.post('/product/type/add', product_type_add);
	route.post('/product/type/list', product_type_list);
	route.post('/product/type/all', product_type_all);
}());