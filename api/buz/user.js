var Promise = require('promise');
var mysql = require('./mysqlp.js');
var errno = require('./errno.js');
var errnoBASE = 1000;
function UserBuz() {

}

module.exports = {
	createBuz : function() {
		return new UserBuz();
	}

}
//
var E_USER_LOGINFAILED = errnoBASE + 0;
errno.reg("E_USER_LOGINFAILED", E_USER_LOGINFAILED, {
	message : "username does not exist or password incorrect"
})
//

UserBuz.prototype.login = function(username, password) {
	return new Promise(
			function(resolve, reject) {
				var sql = 'select userid,username,email from ips_user where username=? and password=?';
				mysql.query(sql, [ username, password ]).then(function(result) {
					if (result.rows && result.rows.length > 0) {
						var row = result.rows[0];
						resolve({
							userid : row.userid,
							username : row.username,
							email : row.email
						});
					} else {
						reject({
							code : "E_USER_LOGINFAILED",
							errno : E_USER_LOGINFAILED
						});
					}
				}, reject);
			});
}