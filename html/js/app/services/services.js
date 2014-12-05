'use strict';

angular.module("mxApp").factory('leftMenuService',['$http',function($http){
return {
	getMenu:function(){
		var url="data/leftmenu.json";
		var service=$http.get(url).success(function(data){
			return data;
		});
		return service;
	}
}
}]);
