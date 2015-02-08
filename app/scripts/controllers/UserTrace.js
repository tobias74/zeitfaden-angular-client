'use strict';

angular.module('ZeitfadenApp').controller('UserTraceCtrl', function ($scope,StationService,$routeParams,$location) {
  window.tobias = {};
  
  console.debug('I got called : UserTraceCnrtol.');
  
     
  $scope.stationsByUserId = {};

  $scope.searchSpec = {};
         
  $scope.stations = [];
  $scope.isLoadingStations = false;

  $scope.searchLocation = {
    latitude: 13.0810, 
    longitude: 80.2740, 
    zoom: 14
  };


  $scope.dataForTimeOrderingSelect = [
    {"order": 'intoThePast', "description": "Into the Past"},
    {"order": 'intoTheFuture', "description": "Into the Future"}
  ];

  $scope.searchSpec.selectedTimeOrdering = $scope.dataForTimeOrderingSelect[0];

  $scope.searchSpec.searchDate = new Date();
  
  //$scope.searchRadius = false;
  
  
  $scope.changedTimeOrdering = function(){
    console.debug('changed time ordering');
    $scope.digestChangedModelTemplateMethod();
  };
  
  
  $scope.digestSingleTime = function(myParams){
    if (myParams.searchDirection){
      $scope.searchSpec.selectedTimeOrdering = $.grep($scope.dataForTimeOrderingSelect,function(n,i){
        return (n.order == myParams.searchDirection);
      })[0];
    }
    else {
      $scope.searchSpec.selectedTimeOrdering = $scope.dataForTimeOrderingSelect[0];
    }
    if (!$scope.searchSpec.selectedTimeOrdering){
      $scope.searchSpec.selectedTimeOrdering = $scope.dataForTimeOrderingSelect[0];
    }
    
    if (myParams.searchDate){
      $scope.searchSpec.searchDate = new Date(myParams.searchDate);
    }
    else {
      $scope.searchSpec.searchDate = new Date();
    }    
  };
  
  

  

  $scope.clickedLoad = function(){
    
    var search = $location.search();
    //search.latitude = $scope.searchLocation.latitude;
    //search.longitude = $scope.searchLocation.longitude;
    search.fromDate = $scope.searchSpec.searchDate.toUTCString();
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
      direction: $scope.searchSpec.selectedTimeOrdering.order,
      visibility: 'public_only',
      datetime: $scope.searchSpec.searchDate.toUTCString()
    },function(){
      $scope.stationsByUserId[userId] = stations;

    });
  };
  
  
  
  $scope.digestChangedModelTemplateMethod = function(){
    //self.resetScrollStatus();
    
    var search = $location.search();

    search.searchVisibility = $scope.selectedVisibility.visibility;
  
    
    search.scrollingStatusId = 'zf-ls-' + new Date().getTime();
    $location.search(search);
  };
  
  
  
  $scope.digestRouteParams = function(myParams){
    
    console.debug('digesting routeparams:');
    console.debug(myParams);
    
    if (myParams.fromDate){
      $scope.searchSpec.searchDate = new Date(myParams.fromDate);
    }
    else {
      $scope.searchSpec.searchDate = new Date();
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
