'use strict';

angular.module('ZeitfadenApp').controller('UserTraceCtrl', function ($scope,StationService,$routeParams,$location) {
  window.tobias = {};
  
  console.debug('I got called : UserTraceCnrtol.');
  
     
  $scope.stationsByUserId = {};
         
  $scope.stations = [];
  $scope.isLoadingStations = false;

  $scope.searchLocation = {
    latitude: 13.0810, 
    longitude: 80.2740, 
    zoom: 14
  };
  $scope.fromDate = new Date();
  $scope.untilDate = new Date();
  
  //$scope.searchRadius = false;
  
  
  
  
  

  

  $scope.clickedLoad = function(){
    
    var search = $location.search();
    //search.latitude = $scope.searchLocation.latitude;
    //search.longitude = $scope.searchLocation.longitude;
    search.fromDate = $scope.fromDate.toUTCString();
    search.untilDate = $scope.untilDate.toUTCString();
    //search.radius = $scope.searchRadius;
    search.zoom = $scope.searchLocation.zoom;
    
    $location.search(search);
    
  };

  

  
  
  
  $scope.loadStationsForUser = function(userId,callback){
    $scope.stationsByUserId = {};
    $scope.queryStationsOffset = 0;
    $scope.queryStationsLimit = 100;

    var stations = StationService.getUnboundStationsOrderedByTime({
      mustHaveAttachment: 0,
      lastId: 0,
      limit:100,
      //latitude: $scope.searchLocation.latitude,
      //longitude: $scope.searchLocation.longitude,
      //distance: $scope.searchRadius,
      direction: 'intoTheFuture',
      visibility: 'public_only',
      datetime: $scope.fromDate.toUTCString()
    },function(){
      $scope.stationsByUserId[userId] = stations;

    });
  };
  
  
  
  $scope.digestRouteParams = function(myParams){
    
    console.debug('digesting routeparams:');
    console.debug(myParams);
    
    if (myParams.fromDate){
      $scope.fromDate = new Date(myParams.fromDate);
    }
    else {
      $scope.fromDate = new Date();
    }
    
    if (myParams.untilDate){
      $scope.untilDate = new Date(myParams.untilDate);
    }
    else {
      $scope.untilDate = new Date();
    }

    if (myParams.zoom){
      $scope.searchLocation.zoom = parseInt(myParams.zoom);
    }
    else {
      $scope.searchLocation.zoom = 14;
    }

    if (myParams.userId){
      $scope.userId = myParams.userId;
      $scope.loadStationsForUser($scope.userId);
    }
    else {
      console.debug('we NEED a userId here!');
    }
  };
  
  

  
    
  $scope.$on('$routeUpdate', function(next, current) { 
    $scope.digestRouteParams($location.search());
  });  

  
  $scope.digestRouteParams($routeParams);
  
  $scope.tobiasDebug='no';


});
