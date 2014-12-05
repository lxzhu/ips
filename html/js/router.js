angular.module('mxApp')
.run(
	[       '$rootScope', '$state', '$stateParams',
	function($rootScope,$state,$stateParams){
		$rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
		
		
	}])
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
var state={};
$urlRouterProvider.otherwise('/state');
	$stateProvider
	.state("state1",{
		url:"/state1",
		templateUrl:"views/state1.html"
	})
	.state("state2",{
		url:"/state2",
		templateUrl:"views/state2.html"
	})
}])