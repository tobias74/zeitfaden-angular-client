'use strict';

angular.module('ZeitfadenApp').controller('StationDistanceArchiveCtrl', 
['ProtectedControllerData','$controller','$log','$modal','$scope','StationService','$routeParams','$location','ScrollHistoryService', 
function(self,$controller,$log,$modal,$scope,StationService,$routeParams,$location,ScrollHistoryService) {
  
  $controller('AbstractStationArchiveCtrl', {$scope: $scope, ProtectedControllerData:self});

         
  

  $scope.clickUserIcon = function(){
	  $location.path('/user-by-distance');
	  self.introduceNewScrollingId();
  };
  
  $scope.clickStationIcon = function(){
  	// nothing
  };
  
  $scope.clickTimeSort = function(){
	  $location.path('/station-archive');
	  self.introduceNewScrollingId();
  };

  $scope.clickDistanceSort = function(){
  	// nothing
  };
  


  
  
  

  
  
  
  
  
    

  
  self.onRouteUpdateTemplateMethod($routeParams);
  

  
  
  
}]

);


