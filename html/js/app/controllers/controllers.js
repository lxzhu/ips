var mxAppModule=angular.module('mxApp',['ui.router','ui.bootstrap']);

mxAppModule.controller("helloController",function($scope){
	$scope.text="Welcome,Mengxia"
})