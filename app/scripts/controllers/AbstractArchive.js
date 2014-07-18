'use strict';

angular.module('ZeitfadenApp').controller('AbstractArchiveCtrl', 
['$scope','ProtectedControllerData','$location','ResponsiveService',
function($scope,self,$location,ResponsiveService) {
  
  $scope.dataForRangeSelect = [
    {"range": 2, "description": "2m"},
    {"range": 10, "description": "10m"},
    {"range": 100, "description": "100m"},
    {"range": 500, "description": "500m"},
    {"range": 1000, "description": "1km"},
    {"range": 10000, "description": "10km"},
    {"range": 100000, "description": "100km"},
    {"range": 1000000, "description": "1000km"},
    {"range": 10000000, "description": "10000km"},
    {"range": 100000000, "description": "100000km"}
  ];

  $scope.searchLocation = {
    latitude: 13.0810, 
    longitude: 80.2740, 
    zoom: 14
  };
  
  self.scrollEndReached = false;       


  $scope.isSearchingLocation = false;

  $scope.getAttachmentFormat = ResponsiveService.getAttachmentFormat;       


  
  $scope.setToCurrentLocation = function(callback) {
    $scope.isSearchingLocation = true;
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        $scope.searchLocation.latitude = position.coords.latitude;
        $scope.searchLocation.longitude = position.coords.longitude;
        $scope.isSearchingLocation = false;
        $scope.selectedRange = $scope.dataForRangeSelect[1];
        callback && callback();
      });
    });  
  };

  $scope.changedDistance = function(){
    console.debug('changed distance');
    self.digestChangedModel();
  };

  $scope.changedLocation = function(){
    console.debug('changed location');
    console.debug($scope.searchLocation);
    $scope.$apply(function(){
      self.digestChangedModel();
    });
  };

  $scope.clickedLoad = function(){
    console.debug('clicked load Button Stachion Archive');
    self.digestChangedModel();    
  };
  
  $scope.$on('$routeUpdate', function(next, current) { 
    self.digestRouteParams($location.search());
  });  
  
  $scope.clickedLoad = function(){
    console.debug('clicked load Button Entities Archive');
    self.digestChangedModel();    
  };
  
  
}]);
