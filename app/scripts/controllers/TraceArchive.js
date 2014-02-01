'use strict';

angular.module('ZeitfadenApp').controller('TraceArchiveCtrl', function ($scope,StationService,$routeParams,$location) {
  window.tobias = {};
  
  console.debug('I got called : TraceCnrtol.');
  
  $scope.users = [
    {id:'123k1k23jh'},
    {id:'123k1k23jh'},
    {id:'123k1k23jh'}
  ];
  
     
  $scope.stationsByUserId = {};
         
  $scope.stations = [];
  $scope.isLoadingStations = false;
  $scope.isSearchingLocation = true;

  $scope.searchLocation = {
    latitude: 13.0810, 
    longitude: 80.2740, 
    zoom: 14
  };
  $scope.isSearchingLocation = false;
  $scope.fromDate = new Date();
  $scope.untilDate = new Date();
  
  $scope.searchRadius = false;
  
  
  
  
  

  $scope.setToCurrentLocation = function(callback) {
    $scope.isSearchingLocation = true;
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        $scope.position = position;
        $scope.isSearchingLocation = false;
        callback && callback();
      });
    });  
  };
  

  $scope.clickedLoad = function(){
    
    var search = $location.search();
    search.latitude = $scope.searchLocation.latitude;
    search.longitude = $scope.searchLocation.longitude;
    search.fromDate = $scope.fromDate.toUTCString();
    search.untilDate = $scope.untilDate.toUTCString();
    //search.radius = $scope.searchRadius;
    search.zoom = $scope.searchLocation.zoom;
    
    $location.search(search);
    
  };

  
  $scope.clickedImage = function(station){
    $scope.selectedStation = station;
  };
  

  $scope.myCallback = function(){
    console.debug('got the callback! :-)');
  };
  
  $scope.loadStations = function(){
    console.debug('new load Stations');
    
    $scope.stations = [];
    $scope.queryOffset = 0;
    $scope.queryLimit = 20;
    console.debug('load stations with scrollStatus: ' + $scope.scrollingStatusId);
    $scope.loadMore();
  };
  
  
  $scope.loadMore = function(callback) {
    console.debug('load more! ... my scrollStatusId is ' + $scope.scrollingStatusId);
    $scope.isLoadingStations = true;
    var moreStations = StationService.getByQuery($scope.getQuery(),function(){
      //console.debug(moreStations);
      for (var i = 0; i < moreStations.length; i++) {
        $scope.stations.push(moreStations[i]);
      }
      $scope.isLoadingStations = false;
      $scope.queryOffset += moreStations.length;
      
      
      $scope.debug_didLoadStations = true;
      
      callback && callback();
    });
  };
  
  
  $scope.getQuery = function(){
    var fromDateString='2020-01-01';
    var untilDateString='2020-01-01';
    
    if ($scope.fromDate != undefined)
    {
        fromDateString = $scope.fromDate.toUTCString();
    }
    if ($scope.untilDate != undefined)
    {
        untilDateString = $scope.untilDate.toUTCString();
    }
    
    return "get " + $scope.queryLimit + "," + $scope.queryOffset + " attachments from '" + fromDateString + "' until '" + untilDateString +"' at latitude " + $scope.searchLocation.latitude + " and longitude " + $scope.searchLocation.longitude + " within " + $scope.searchRadius + " miles";
  };

  $scope.getStationsQuery = function(userId){
    var fromDateString='2020-01-01';
    var untilDateString='2020-01-01';
    
    if ($scope.fromDate != undefined)
    {
        fromDateString = $scope.fromDate.toUTCString();
    }
    if ($scope.untilDate != undefined)
    {
        untilDateString = $scope.untilDate.toUTCString();
    }
    
    return "get " + $scope.queryStationsLimit + "," + $scope.queryStationsOffset + " stations from '" + fromDateString + "' until '" + untilDateString +"' at latitude " + $scope.searchLocation.latitude + " and longitude " + $scope.searchLocation.longitude + " within " + $scope.searchRadius + " miles belonging to user '" + userId + "'" ;
  };
  
  
  $scope.getUsersQuery = function(){
    var fromDateString='2020-01-01';
    var untilDateString='2020-01-01';
    
    if ($scope.fromDate != undefined)
    {
        fromDateString = $scope.fromDate.toUTCString();
    }
    if ($scope.untilDate != undefined)
    {
        untilDateString = $scope.untilDate.toUTCString();
    }
    
    return "get " + $scope.queryUsersLimit + "," + $scope.queryUsersOffset + " users from '" + fromDateString + "' until '" + untilDateString +"' at latitude " + $scope.searchLocation.latitude + " and longitude " + $scope.searchLocation.longitude + " within " + $scope.searchRadius + " miles";
  };
  
  $scope.loadUsers = function(){
    if ($scope.searchRadius === false) return;
    
    console.debug('new load Users');
    $scope.queryStationsOffset = 0;
    $scope.queryStationsLimit = 100;

    
    $scope.users = [];
    $scope.queryUsersOffset = 0;
    $scope.queryUsersLimit = 50;
    
    $scope.isLoadingUsers = true;
    $scope.stationsByUserId = {};
    
    var moreUsers = StationService.getUsersByQuery($scope.getUsersQuery(),function(){

      $scope.users = moreUsers;
      $scope.users.forEach(function(user){
        $scope.loadStationsForUser(user.id,function(){
          console.debug('returned from stationf or user');
        });
      });
      
      $scope.isLoadingUsers = false;
    });
  };

  
  
  $scope.loadStationsForUser = function(userId,callback){
    var stations = StationService.getStationsByQuery($scope.getStationsQuery(userId),function(){
      $scope.stationsByUserId[userId] = stations;

    });
  };
  
  $scope.updateMyText = function(date){
    console.debug('I did get this here in updateMyText ' + date);
    console.debug($scope.fromDate);
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
    
    /*
    if (myParams.radius){
      $scope.searchRadius = parseFloat(myParams.radius);
    }
    else {
      $scope.searchRadius = 100000;
    }
    */

    if (myParams.latitude && myParams.longitude){
      $scope.searchLocation.latitude = myParams.latitude;
      $scope.searchLocation.longitude = myParams.longitude;
      
    }
    else {
      //$scope.setToCurrentLocation($scope.loadStations);
    }


    $scope.loadUsers();
    
    
  };
  
  

  
    
  $scope.$on('$routeUpdate', function(next, current) { 
    $scope.digestRouteParams($location.search());
  });  

  
  $scope.digestRouteParams($routeParams);
  
  $scope.tobiasDebug='no';


});
