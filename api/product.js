var route = require('./route.js').create();
var category = require('./buz/product_category.js');
var expAPI = {
	attach : function(app) {
		route.attach(app);
	}
};
module.exports = expAPI;

/**
 * 
 * @param req
 * @param res
 */
function category_list(req, res) {
	console.log("category_list.enter");
	var buz = category.createBuz();
	var parentCategoryId = req.body.parentCategoryId;
	buz.list(parentCategoryId).then(function(result) {
		console.log("category_list.resolve");
		res.json(result);
	}, function(ex) {
		res.json(ex);
	}).done();
}

function category_all(req, res) {
	console.log("category_all.enter");
	var buz = category.createBuz();

	buz.all().then(function(result) {
		console.log("category_all.resolve");
		res.json(result);
	}, function(ex) {
		res.json(ex);
	}).done();
}

function category_add(req, res) {
	var buz = category.createBuz();
	buz.add(req.body).then(function(result) {
		console.log("category_add.resolve");
		res.json(result);
	}, function(ex) {
		res.json(ex);
	}).done();
}

function category_update(req, res) {
	console.log("category_update.enter");
	var buz = category.createBuz();
	buz.update(req.body).then(function(result) {
		console.log("category_update.resolve");
		res.json(result);
	}, function(ex) {
		res.json(ex);
	}).done();
}

function category_delete(req, res) {

}

(function() {
	route.post('/product/category/list', category_list);
	route.post('/product/category/all', category_all);
	route.post('/product/category/add', category_add);
	route.post('/product/category/delete', category_delete);
	route.post('/product/category/update', category_update);
}());