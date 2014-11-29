var lang = {
	loaded : false,
	resources : {}
};

if (!lang.loaded) {
	
}

module.exports = function(key, culture) {
	if (!key || key == "") {
		throw {
			code : "E_ERRNO_CRITICAL",
			errno : 0,
			message : "try to get text resource without key"
		};
	}

	if (!culture || !lang.resources.culture) {
		culture = "en-us";
	}

	var bucket = lang.resources.culture || lang.resources['en-us'];
	if (!bucket) {
		throw {
			code : "E_ERRNO_CRITICAL",
			errno : 0,
			message : "specified culture does not exist and default culture does not exist."
		}
	}

	var enUS = lang.resources['en-us'];
	var message = bucket[key];
	if (!message && enUS) {
		message = enUS[key];
	}

	return message;
}
