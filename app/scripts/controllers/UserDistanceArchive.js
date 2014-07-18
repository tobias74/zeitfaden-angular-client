'use strict';

angular.module('ZeitfadenApp').controller('UserDistanceArchiveCtrl', 
['ProtectedControllerData','$controller','$log','$modal','$scope','UserService','$routeParams','$location','ScrollHistoryService', 
function(self,$controller,$log,$modal,$scope,UserService,$routeParams,$location,ScrollHistoryService) {
  
  $controller('AbstractUserArchiveCtrl', {$scope: $scope, ProtectedControllerData:self});

  
  ScrollHistoryService.setController(self);
  
  self.setHistoryEntities = function(data){
	  $scope.entities = data['entities'];
      self.scrollEndReached = data['scrollEndReached'];
  };
  
  self.loadEntities = function(){
    $scope.offset = 0;
    $scope.entities = [];
    $scope.loadMore();
  };


  $scope.selectedRange = $scope.dataForRangeSelect[3];  
  $scope.searchDate = new Date();
  $scope.searchDirection = "intoThePast";
  $scope.searchVisibility = "public_only";
  $scope.fromDate = new Date();
  $scope.untilDate = new Date();
  $scope.limit=100;
  $scope.offset=0;
  

  var resetScrollStatus = function(){
    self.scrollEndReached = false;
  };
  
  
  
  self.digestRouteParams = function(myParams){

	  resetScrollStatus();   
    
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
    
    var moreEntities = UserService.getUsersOrderedByDistance({
      mustHaveAttachment: 1,
      limit: $scope.limit,
      offset: $scope.offset,
      latitude: $scope.searchLocation.latitude,
      longitude: $scope.searchLocation.longitude,
      maxDistance: $scope.selectedRange.range,
      direction: $scope.searchDirection,
      visibility: $scope.searchVisibility,
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
  
  
  
    
  $scope.$on('$routeUpdate', function(next, current) { 
    self.digestRouteParams($location.search());
  });  

  
  self.digestRouteParams($routeParams);
  
  
}]
);
