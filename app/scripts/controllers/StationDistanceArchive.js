'use strict';

angular.module('ZeitfadenApp').controller('StationDistanceArchiveCtrl', 
['ProtectedControllerData','$controller','$log','$modal','$scope','StationService','$routeParams','$location','ScrollHistoryService', 
function(self,$controller,$log,$modal,$scope,StationService,$routeParams,$location,ScrollHistoryService) {
  
  $controller('AbstractStationArchiveCtrl', {$scope: $scope, ProtectedControllerData:self});

         
  

  self.resetScrollStatus = function(){
    self.scrollEndReached = false;
    $scope.limit = 100;
    $scope.offset = 0;
    
  };

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
  
  
  var parentDigestRouteParams = self.digestRouteParams;
  self.digestRouteParams = function(myParams){
    parentDigestRouteParams(myParams);

    self.digestTwoTimes(myParams);
    
  };

  self.updateLocationSearch = function(search){
    search.fromDate = $scope.searchSpec.fromDate.toUTCString();
    search.untilDate = $scope.searchSpec.untilDate.toUTCString();
    search.searchDirection = $scope.searchDirection;
  };

  
  
  

  
  $scope.loadMore = function(callback) {
    console.debug('load more! ... my scrollStatusId is ' + $scope.scrollingStatusId);
    if ($scope.isLoadingEntities)
    {
      return false;
    }
    
    $scope.isLoadingEntities = true;


    var moreStations = StationService.getStationsOrderedByDistance({
      mustHaveAttachment: 1,
      offset: $scope.offset,
      limit:$scope.limit,
      latitude: $scope.searchLocation.latitude,
      longitude: $scope.searchLocation.longitude,
      maxDistance: 999999999999,
      direction: $scope.searchDirection,
      visibility: $scope.selectedVisibility.visibility,
      fromDate: $scope.searchSpec.fromDate.toUTCString(),
      untilDate: $scope.searchSpec.untilDate.toUTCString(),
      
    },function(){
    	$scope.offset += moreStations.length;
		for (var i = 0; i < moreStations.length; i++) {
        	$scope.entities.push(moreStations[i]);
      	}
	    $scope.isLoadingEntities = false;
	    if (moreStations.length == 0)
	    {
	      self.scrollEndReached = true;
	    }
      
        ScrollHistoryService.storeScrollingStatus($scope.scrollingStatusId, {
	      filled: true,
	      stations: $scope.entities,
	      tobias: 'yeshere',
	      scrollEndReached: self.scrollEndReached
        });
      
      
        callback && callback();
    });






  };
  
  
  
  
    

  
  self.onRouteUpdateTemplateMethod($routeParams);
  

  
  
  
}]

);


