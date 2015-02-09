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
    $scope.pushToRouteHistory();
  };

  $scope.changedSearchTime = function(){
    $scope.$apply(function(){
      console.debug('changed search time here in controller');
      $scope.pushToRouteHistory();
    });
  };
  
  $scope.clickedLoad = function(){
    $scope.pushToRouteHistory();
  };

  

  
  
  
  $scope.loadStationsForUser = function(userId,callback){
    $scope.stationsByUserId = {};
    $scope.queryStationsOffset = 0;
    $scope.queryStationsLimit = 100;

    var stations = StationService.getUnboundStationsOrderedByTime({
      mustHaveAttachment: 0,
      lastId: 0,
      limit:100,
      direction: $scope.searchSpec.selectedTimeOrdering.order,
      visibility: 'public_only',
      datetime: $scope.searchSpec.searchDate.toUTCString()
    },function(){
      $scope.stationsByUserId[userId] = stations;

    });
  };
  
  
  
  $scope.pushToRouteHistory = function(){
    //self.resetScrollStatus();
    
    var search = $location.search();
    
    console.debug('this is what we have in the pushtoroute:' + $scope.searchSpec.searchDate.toUTCString());
    search.searchDate = $scope.searchSpec.searchDate.toUTCString();
    search.zoom = $scope.searchLocation.zoom;
    search.scrollingStatusId = 'zf-ls-' + new Date().getTime();

    $location.search(search);
    
  };
  
  
  
  $scope.digestRoute = function(myParams){
    
    console.debug('digesting routeparams:');
    console.debug(myParams);
    
   $scope.digestSingleTime(myParams);

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
  

  
    
  $scope.$on('$routeUpdate', function(next, current) { 
    $scope.digestRoute($location.search());
  });  

  
  $scope.digestRoute($routeParams);

});
