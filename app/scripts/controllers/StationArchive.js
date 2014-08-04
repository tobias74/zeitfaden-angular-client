'use strict';

angular.module('ZeitfadenApp').controller('StationArchiveCtrl', 
['ProtectedControllerData','$controller','$log','$modal','$scope','StationService','$routeParams','$location','ScrollHistoryService', 
function(self,$controller,$log,$modal,$scope,StationService,$routeParams,$location,ScrollHistoryService) {
  
  $controller('AbstractStationArchiveCtrl', {$scope: $scope, ProtectedControllerData:self});

  var internalFromDate;
  var internalUntilDate;
  var lastStation;
  
  ScrollHistoryService.setController(self);
  
  self.setHistoryEntities = function(data){
	  $scope.entities = data['stations'];
      lastStation = data['lastStation'];
      self.scrollEndReached = data['scrollEndReached'];
  };
  
  self.loadEntities = function(){
    $scope.entities = [];
    console.debug('load stations with scrollStatus: ' + $scope.scrollingStatusId);
    $scope.loadMore();
  };
  
         
  $scope.entities = [];
  $scope.isLoadingEntities = false;
  $scope.selectedRange = $scope.dataForRangeSelect[3];  
  $scope.searchDate = new Date();
  $scope.searchDirection = "intoThePast";
  $scope.searchVisibility = "public_only";
  

  var resetScrollStatus = function(){
    lastStation = undefined;
    internalFromDate = undefined;
    internalUntilDate = undefined;
    self.scrollEndReached = false;
  };
  
  
  self.digestRouteParams = function(myParams){

	resetScrollStatus();   
	
	self.digestRouteLonelyEntity(myParams);

    if (myParams.searchDirection){
      $scope.searchDirection = myParams.searchDirection;
    }
    else {
      $scope.searchDirection = "intoThePast";
    }

    if (myParams.searchVisibility){
      $scope.searchVisibility = myParams.searchVisibility;
    }
    else {
      $scope.searchVisibility = "public_only";
    }

    
    if (myParams.searchDate){
      $scope.searchDate = new Date(myParams.searchDate);
    }
    else {
      $scope.searchDate = new Date();
    }
    
    if (myParams.radius){
      $scope.selectedRange = $.grep($scope.dataForRangeSelect,function(n,i){
        return (n.range == myParams.radius);
      })[0];
    }
    else {
      $scope.selectedRange = $scope.dataForRangeSelect[3];
    }


    if (myParams.latitude && myParams.longitude){
      $scope.searchLocation.latitude = myParams.latitude;
      $scope.searchLocation.longitude = myParams.longitude;
      
    }

    if (myParams.scrollingStatusId)
    {
      $scope.scrollingStatusId = myParams.scrollingStatusId;
      ScrollHistoryService.digestScrollingStatus(myParams.scrollingStatusId);
    }
    
  };
  


  
  self.digestChangedModel = function(){
    resetScrollStatus();
            
    var search = $location.search();
    search.latitude = $scope.searchLocation.latitude;
    search.longitude = $scope.searchLocation.longitude;
    search.searchDate = $scope.searchDate.toUTCString();
    search.searchVisibility = $scope.searchVisibility;
    search.searchDirection = $scope.searchDirection;
    search.radius = $scope.selectedRange.range;
    search.scrollingStatusId = 'zf-ls-' + new Date().getTime();
    
    $location.search(search);
  };
  
  
  $scope.loadMore = function(callback) {
    console.debug('load more! ... my scrollStatusId is ' + $scope.scrollingStatusId);
    if ($scope.isLoadingEntities)
    {
      return false;
    }
    
    $scope.isLoadingEntities = true;
    var lastId = 0;

    if (lastStation != undefined)
    {
      lastId = lastStation.id;
      internalFromDate = new Date(lastStation.zuluStartDateString);
    }
    else // its a new search
    {
      internalFromDate = $scope.searchDate;
    }

    
    var moreStations = StationService.getStationsOrderedByTime({
      mustHaveAttachment: 1,
      lastId: lastId,
      latitude: $scope.searchLocation.latitude,
      longitude: $scope.searchLocation.longitude,
      distance: $scope.selectedRange.range,
      direction: $scope.searchDirection,
      visibility: $scope.searchVisibility,
      datetime: internalFromDate.toUTCString()
      
    },function(){
      for (var i = 0; i < moreStations.length; i++) {
        $scope.entities.push(moreStations[i]);
      }
      $scope.isLoadingEntities = false;
      if (moreStations.length>0)
      {
        lastStation = moreStations[moreStations.length-1];
      }
      else
      {
        self.scrollEndReached = true;
      }
      
      ScrollHistoryService.storeScrollingStatus($scope.scrollingStatusId, {
	      filled: true,
	      stations: $scope.entities,
	      lastStation: lastStation,
	      scrollEndReached: self.scrollEndReached
      });
      
      
      callback && callback();
    });
  };

  
  self.digestRouteParams($routeParams);
  
}]
);


