'use strict';

angular.module('ZeitfadenApp').controller('AbstractUserArchiveCtrl', 
['$scope','ProtectedControllerData','$location','ResponsiveService','$controller',
function($scope,self,$location,ResponsiveService,$controller) {
  
  $controller('AbstractArchiveCtrl', {$scope: $scope, ProtectedControllerData:self});
  
  
  
  
}]);
