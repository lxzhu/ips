'use strict';

angular.module('mxApp').directive('appNav', function(leftMenuService) {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'views/home/nav.html',
    link: function(scope, element, attrs) {
      var mx = scope.mx = {};
		 leftMenuService.getMenu().then(function(service){
				mx.items=service.data.items;
		});
    }
  }
});