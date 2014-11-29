var api = {};
var mCodes = [];
var mErrnos = [];
module.exports = api;

api.reg = function(code, errno, ex) {
	// 1. to make sure the template is not an null
	ex = ex || {};

	// 2. to make sure at least one of code and errno has value
	if (!code && !errno) {
		throw {
			code : "E_ERRNO_NOKEY",
			errno : 0,
			tag : 'ips.buz.errno',
			message : 'an error template must have a key. a key could be either code or errno'
		}
	}

	// 3.copy code and errno to template.
	ex.code = code;
	ex.errno = errno;

	// 4.associate template with code.
	if (code) {
		mCodes[code] = ex;
	}

	// 5. associate template with errno
	if (errno) {
		mErrnos[errno] = ex;
	}
};

api.codes = function() {
	var ret = [];
	for ( var prop in mCodes) {
		if (mCodes.hasOwnProperties(prop)) {
			ret.push(prop);
		}
	}
	return ret;
};

api.errnos = function() {
	var ret = [];
	for ( var prop in mErrnos) {
		if (mErrnos.hasOwnProperties(prop)) {
			ret.push(prop);
		}
	}
	return ret;
};

api.byCode = function(code) {
	return mCodes[code];
};

api.byErrnO = function(errno) {
	return mErrnos[errno];
};
