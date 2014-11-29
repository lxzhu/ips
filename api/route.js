function RouteTable() {
	var routes = [];
	this.attach = function(app) {
		var length = routes.length;
		for (var idx = 0; idx < length; idx++) {
			var regRoute = routes[idx];
			if (typeof regRoute == "function") {
				// console.log("reg route:"+regRoute);
				regRoute(app);
			} else {
				// console.log("ignore route:"+regRoute);
			}
		}
	};
	this.push = function(route) {
		routes.push(route);
	};
	this.post = function(path, handle) {
		routes.push(function(app) {
			app.post(path, function(req, res) {
				console.log(JSON.stringify(req.body));
				handle(req, res);
			});
		})
	};
}
module.exports = {
	create : function() {
		return new RouteTable();
	}
};
