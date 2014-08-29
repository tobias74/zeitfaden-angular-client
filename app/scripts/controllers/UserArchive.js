'use strict';

angular.module('ZeitfadenApp').controller('UserArchiveCtrl', 
['ProtectedControllerData','$controller','$log','$modal','$scope','UserService','$routeParams','$location','ScrollHistoryService', 
function(self,$controller,$log,$modal,$scope,UserService,$routeParams,$location,ScrollHistoryService) {
  
  $controller('AbstractUserArchiveCtrl', {$scope: $scope, ProtectedControllerData:self});

  var limit = 100;
  var offset = 0;       
  
  
  $scope.clickUserIcon = function(){
  	// nothing
  };
  
  $scope.clickStationIcon = function(){
	  $location.path('/station-archive');
	  self.introduceNewScrollingId();
  };
  
  $scope.clickTimeSort = function(){
  	// nothing
  };

  $scope.clickDistanceSort = function(){
	  $location.path('/user-by-distance');
	  self.introduceNewScrollingId();
  };
  

  self.resetScrollStatus = function(){
    self.scrollEndReached = false;
  };
  
  
  
  var parentDigestRouteParams = self.digestRouteParams;
  self.digestRouteParams = function(myParams){
    parentDigestRouteParams(myParams);

    self.digestSingleTime(myParams);
    
	self.digestRadius(myParams);
    
    
  };
  

  

  self.updateLocationSearch = function(search){
    search.searchDate = $scope.searchDate.toUTCString();
    search.searchDirection = $scope.selectedTimeOrdering.order;
    search.radius = $scope.selectedRange.range;
  };
  
  

  
  $scope.clickedImage = function(station){
    $scope.selectedStation = station;
  };
  

  $scope.myCallback = function(){
    console.debug('got the callback! :-)');
  };
  
  
  
  $scope.loadMore = function(callback) {
    console.debug('load more! ... my scrollStatusId is ' + $scope.scrollingStatusId);
    if ($scope.isLoadingEntities)
    {
      return false;
    }
    
    $scope.isLoadingEntities = true;
    var manydays=1000;


    
    var moreEntities = UserService.getUsersOrderedByTime({
      mustHaveAttachment: 1,
      limit: limit,
      offset: offset,
      latitude: $scope.searchLocation.latitude,
      longitude: $scope.searchLocation.longitude,
      distance: $scope.selectedRange.range,
      sort: 'byTime',
      direction: $scope.selectedTimeOrdering.order,
      visibility: $scope.selectedVisibility.visibility,
      datetime: $scope.searchDate.toUTCString()
      
    },function(){
      offset += moreEntities.length;
      
      for (var i = 0; i < moreEntities.length; i++) {
        $scope.entities.push(moreEntities[i]);
      }
      $scope.isLoadingEntities = false;
      if (moreEntities.length==0)
      {
        self.scrollEndReached = true;
      }
      
      ScrollHistoryService.storeScrollingStatus($scope.scrollingStatusId, {
	      filled: true,
	      entities: $scope.entities,
	      scrollEndReached: self.scrollEndReached
      });
      
      callback && callback();
    });






  };
  
  self.onRouteUpdateTemplateMethod($routeParams);
  
}]
);
