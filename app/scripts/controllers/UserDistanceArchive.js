'use strict';

angular.module('ZeitfadenApp').controller('UserDistanceArchiveCtrl', 
['ProtectedControllerData','$controller','$log','$modal','$scope','UserService','$routeParams','$location','ScrollHistoryService', 
function(self,$controller,$log,$modal,$scope,UserService,$routeParams,$location,ScrollHistoryService) {
  
  $controller('AbstractUserArchiveCtrl', {$scope: $scope, ProtectedControllerData:self});
  
  
  self.loadEntities = function(){
    $scope.offset = 0;
    $scope.entities = [];
    $scope.loadMore();
  };

  $scope.clickUserIcon = function(){
  	//nothing
  };
  
  $scope.clickStationIcon = function(){
	  $location.path('/station-by-distance');
	  self.introduceNewScrollingId();
  };

  $scope.clickTimeSort = function(){
	  $location.path('/user-archive');
	  self.introduceNewScrollingId();
  };

  $scope.clickDistanceSort = function(){
  	// nothing
  };


  self.resetScrollStatus = function(){
    self.scrollEndReached = false;
    $scope.limit = 100;
    $scope.offset = 0;
  };
  
  
  
  var parentDigestRouteParams = self.digestRouteParams;
  self.digestRouteParams = function(myParams){
    parentDigestRouteParams(myParams);

    self.digestTwoTimes(myParams);
    
  };
  

  

  self.updateLocationSearch = function(search){
    search.fromDate = $scope.fromDate.toUTCString();
    search.untilDate = $scope.untilDate.toUTCString();
    search.searchDirection = $scope.searchDirection;
  };
  
  

  
  
  $scope.loadMore = function(callback) {
    console.debug('load more! ... my scrollStatusId is ' + $scope.scrollingStatusId);
    if ($scope.isLoadingEntities)
    {
      return false;
    }
    
    $scope.isLoadingEntities = true;
    
    var moreEntities = UserService.getUsersOrderedByDistance({
      mustHaveAttachment: 1,
      limit: $scope.limit,
      offset: $scope.offset,
      latitude: $scope.searchLocation.latitude,
      longitude: $scope.searchLocation.longitude,
      maxDistance: 99999999999,
      direction: $scope.searchDirection,
      visibility: $scope.selectedVisibility.visibility,
      fromDate: $scope.fromDate.toUTCString(),
      untilDate: $scope.untilDate.toUTCString()
      
    },function(){
      self.offset += moreEntities.length;
      
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
