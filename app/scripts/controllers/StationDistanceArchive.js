'use strict';

angular.module('ZeitfadenApp').controller('StationDistanceArchiveCtrl', 
['ProtectedControllerData','$controller','$log','$modal','$scope','StationService','$routeParams','$location','ScrollHistoryService', 
function(self,$controller,$log,$modal,$scope,StationService,$routeParams,$location,ScrollHistoryService) {
  
  $controller('AbstractStationArchiveCtrl', {$scope: $scope, ProtectedControllerData:self});

  ScrollHistoryService.setController(self);

  self.setHistoryEntities = function(data){
	  $scope.entities = data['stations'];
      self.scrollEndReached = data['scrollEndReached'];
  };
  
  self.loadEntities = function(){
    console.debug('new load Stations');
    $scope.entities = [];
    console.debug('load stations with scrollStatus: ' + $scope.scrollingStatusId);
    $scope.loadMore();
  	
  };
  
         
  $scope.entities = [];
  $scope.isLoadingEntities = false;
  $scope.limit=100;
  $scope.offset=0;
  $scope.selectedRange = $scope.dataForRangeSelect[3];  
  $scope.fromhDate = new Date();
  $scope.untilDate = new Date();
  $scope.searchDirection = "nearFirst"; //farFirst
  $scope.searchVisibility = "public_only";
  

  var resetScrollStatus = function(){
    self.scrollEndReached = false;
    $scope.limit = 100;
    $scope.offset = 0;
    
  };
  
  
  
  var parentDigestRouteParams = self.digestRouteParams;
  self.digestRouteParams = function(myParams){
    parentDigestRouteParams(myParams);

  	resetScrollStatus();   

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
    console.debug('digesting changed model');
    
    resetScrollStatus();
            
    var search = $location.search();
    search.latitude = $scope.searchLocation.latitude;
    search.longitude = $scope.searchLocation.longitude;
    search.fromDate = $scope.fromDate.toUTCString();
    search.untilDate = $scope.untilDate.toUTCString();
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


    var moreStations = StationService.getStationsOrderedByDistance({
      mustHaveAttachment: 1,
      offset: $scope.offset,
      limit:$scope.limit,
      latitude: $scope.searchLocation.latitude,
      longitude: $scope.searchLocation.longitude,
      maxDistance: $scope.selectedRange.range,
      direction: $scope.searchDirection,
      visibility: $scope.searchVisibility,
      fromDate: $scope.fromDate.toUTCString(),
      untilDate: $scope.untilDate.toUTCString(),
      
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
  
  
  
  
    

  
  self.digestRouteParams($routeParams);
  

  
  
  
}]

);


