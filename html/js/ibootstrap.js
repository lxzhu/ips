define(['angular','domReady'],function(angular,domReady){
	'user strict';
	domReady(function(document){
		angular.bootstrap(document,['webApp']);
	})
});