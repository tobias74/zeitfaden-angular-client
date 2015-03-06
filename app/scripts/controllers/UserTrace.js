'use strict';


var syncLoop = function(iterations, process, exit){  
    var index = 0,
        done = false,
        shouldExit = false;
    var loop = {
        next:function(){
            if(done){
                if(shouldExit && exit){
                    return exit(); // Exit if we're done
                }
            }
            // If we're not finished
            if(index < iterations){
                index++; // Increment our index
                process(loop); // Run our process, pass in the loop
            // Otherwise we're done
            } else {
                done = true; // Make sure we say we're done
                if(exit) exit(); // Call the callback on exit
            }
        },
        iteration:function(){
            return index - 1; // Return the loop number we're on
        },
        break:function(end){
            done = true; // End the loop
            shouldExit = end; // Passing end as true means we still call the exit callback
        }
    };
    loop.next();
    return loop;
};

var SequentialStationsLoader = function(resource,params,progressCallback){
  var self = this;
  self.resource = resource;
  self.stations = [];
  
  
  
    
  self.load = function(){
    var myLoop = syncLoop(10, function(loop){
      if (myLoop === loop){
        console.debug('the loop instance is the same!!!');
      }
      else {
        console.debug('the loop instance is not the same...');
      }
      
      params.limit = 100;

      self.resource.query(params,function(stations){
        var lastStation = stations[stations.length-1];
        if (lastStation){
          params.lastId = stations[stations.length-1].id;
          params.timestamp = stations[stations.length-1].startTimestamp;
        }
        else {
          params.lastId = 0;
        }
        

        console.debug('Loading Stations loop ' + loop.iteration());
        self.stations.push.apply(self.stations, stations);
        progressCallback(self.stations);
        loop.next();
      });
      
    });
  
    
  };  



  var loadSlices = function(sliceCount, previousElements, progressCallback){
    console.debug('Loading Slice Countdown ' + sliceCount );
    
    
  };


  
};

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
    
    var resource = StationService.getResourceForUnboundStationsOrderedByTime();

    var params = {
      mustHaveAttachment: 0,
      direction: $scope.searchSpec.selectedTimeOrdering.order,
      visibility: 'public_only',
      timestamp: Math.floor($scope.searchSpec.searchDate.getTime()/1000)
    };
    
    var loader = new SequentialStationsLoader(resource,params,function(stations){
      $scope.stationsByUserId[userId] = stations;
    });
    
    loader.load();

/*
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
*/
    
  };
  
  
  $scope.pushToRouteHistory = function(){
    //self.resetScrollStatus();
    
    var search = $location.search();
    
    console.debug('this is what we have in the pushtoroute:' + $scope.searchSpec.searchDate.toUTCString());
    search.searchDate = Math.floor($scope.searchSpec.searchDate.getTime()/1000);
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
      $scope.searchSpec.searchDate = new Date(myParams.searchDate*1000);
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
