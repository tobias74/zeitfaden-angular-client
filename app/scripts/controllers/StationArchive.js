'use strict';

angular.module('ZeitfadenApp').controller('StationArchiveCtrl', 
['ProtectedControllerData','$controller','$log','$modal','$scope','StationService','$routeParams','$location','ScrollHistoryService','MenuService',
function(self,$controller,$log,$modal,$scope,StationService,$routeParams,$location,ScrollHistoryService,MenuService) {
  
  var myParentController = $controller('AbstractStationArchiveCtrl', {$scope: $scope, ProtectedControllerData:self});

  
  
  
  MenuService.setClickPeople(function(){
    alert('yeah');
    //$location.path('/user-archive');
    //self.introduceNewScrollingId();
  });
  
  
  $scope.clickUserIcon = function(){
	  $location.path('/user-archive');
	  self.introduceNewScrollingId();
  };
  
  $scope.clickStationIcon = function(){
  	// nothing
  };
  
  $scope.clickTimeSort = function(){
  	// nothing
  };

  $scope.clickDistanceSort = function(){
	  $location.path('/station-by-distance');
	  self.introduceNewScrollingId();
  };

         
  

  
  
  
  

  
  
}]
);


