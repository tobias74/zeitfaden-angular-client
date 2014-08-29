'use strict';

angular.module('ZeitfadenApp').controller('AbstractUserArchiveCtrl', 
['$scope','ProtectedControllerData','$location','ResponsiveService','$controller',
function($scope,self,$location,ResponsiveService,$controller) {
  
  var myParentController = $controller('AbstractArchiveCtrl', {$scope: $scope, ProtectedControllerData:self});
  
  self.entityName = 'user';
  
  
}]);
