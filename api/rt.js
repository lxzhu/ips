var config = {
	website : {},
	settings : {},
	mysql : {
		host : 'localhost',
		port : '3306',
		user : 'root',
		password : 'N0rikos123',
		database : 'ips'
	}
};
config.website = {
	domain : "api.lxzhu.local",
	port : "12000"
}

module.exports = {
	config : config
};