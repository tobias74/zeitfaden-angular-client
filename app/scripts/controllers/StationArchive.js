'use strict';

angular.module('ZeitfadenApp').controller('StationArchiveCtrl', 
['ProtectedControllerData','$controller','$log','$modal','$scope','StationService','$routeParams','$location','ScrollHistoryService', 
function(self,$controller,$log,$modal,$scope,StationService,$routeParams,$location,ScrollHistoryService) {
  
  var myParentController = $controller('AbstractStationArchiveCtrl', {$scope: $scope, ProtectedControllerData:self});

  var internalFromDate;
  var internalUntilDate;
  var lastStation;
  
  var parentSetHistoryEntities = self.setHistoryEntities;  
  self.setHistoryEntities = function(data){
      lastStation = data['lastStation'];
      parentSetHistoryEntities(data);
  };
  
  
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

         
  

  self.resetScrollStatus = function(){
    lastStation = undefined;
    internalFromDate = undefined;
    internalUntilDate = undefined;
    self.scrollEndReached = false;
  };
  
  
  var parentDigestRouteParams = self.digestRouteParams;
  self.digestRouteParams = function(myParams){
    parentDigestRouteParams(myParams);

    self.digestSingleTime(myParams);
		
	self.digestRadius(myParams);
    
    



  };
  
  self.updateLocationSearch = function(search){
    search.searchDate = $scope.searchSpec.searchDate.toUTCString();
    search.searchDirection = $scope.searchSpec.selectedTimeOrdering.order;
    search.radius = $scope.selectedRange.range;
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
      internalFromDate = $scope.searchSpec.searchDate;
    }

    
    var moreStations = StationService.getStationsOrderedByTime({
      mustHaveAttachment: 1,
      lastId: lastId,
      limit:20,
      latitude: $scope.searchLocation.latitude,
      longitude: $scope.searchLocation.longitude,
      distance: $scope.selectedRange.range,
      direction: $scope.searchSpec.selectedTimeOrdering.order,
      visibility: $scope.selectedVisibility.visibility,
      datetime: internalFromDate.toUTCString()
      
    },function(){
      for (var i = 0; i < moreStations.length; i++) {
      	var myStation = moreStations[i];
      	self.attachGeoDataToStation(myStation);
        $scope.entities.push(myStation);
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

  
  self.onRouteUpdateTemplateMethod($routeParams);
  
}]
);


