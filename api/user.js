var user = require('./buz/user.js');
var route = require('./route.js').create();
var expAPI = {
	attach : function(app) {
		route.attach(app);
	}
};

module.exports = expAPI;

function login(req, res) {
	var buz = user.createBuz();

	buz.login(req.body.username, req.body.password).then(function(result) {
		res.cookie('.IPSAUTHUID', result.userid, {
			httpOnly : true
		});
		res.json(result);
	}, function(ex) {
		res.json({
			status : "failed",
			fault : ex
		})
	}).done();

}

route.post('/user/login', login);
