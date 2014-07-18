'use strict';

angular.module('ZeitfadenApp').controller('UserArchiveCtrl', 
['ProtectedControllerData','$controller','$log','$modal','$scope','UserService','$routeParams','$location','ScrollHistoryService', 
function(self,$controller,$log,$modal,$scope,UserService,$routeParams,$location,ScrollHistoryService) {
  
  $controller('AbstractUserArchiveCtrl', {$scope: $scope, ProtectedControllerData:self});

  var limit = 100;
  var offset = 0;       
  
  ScrollHistoryService.setController(self);
  
  self.setHistoryEntities = function(data){
	  $scope.entities = data['entities'];
      self.scrollEndReached = data['scrollEndReached'];
  };
  
  self.loadEntities = function(){
    offset = 0;
    
    $scope.entities = [];
    
    console.debug('load entities with scrollStatus: ' + $scope.scrollingStatusId);
    $scope.loadMore();
  };
  
         
  $scope.entities = [];
  $scope.isLoadingEntities = false;

  $scope.searchLocation = {
    latitude: 13.0810, 
    longitude: 80.2740, 
    zoom: 14
  };

  $scope.selectedRange = $scope.dataForRangeSelect[3];  
  $scope.isSearchingLocation = false;
  $scope.searchDate = new Date();
  $scope.searchDirection = "intoThePast";
  $scope.searchVisibility = "public_only";
  

  var resetScrollStatus = function(){
    self.scrollEndReached = false;
  };
  
  
  
  self.digestRouteParams = function(myParams){

	resetScrollStatus();   

    console.debug('digesting routeparams:');
    console.debug(myParams);
    
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
    console.debug('digesting changed model');
    

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

    console.debug('search Dirdtiton is here ########################: ' + $scope.searchDirection);

    console.debug('we do not have a last station');
    console.debug($scope.searchDate);

      
      



    
    var moreEntities = UserService.getUsersOrderedByTime({
      mustHaveAttachment: 1,
      limit: limit,
      offset: offset,
      latitude: $scope.searchLocation.latitude,
      longitude: $scope.searchLocation.longitude,
      distance: $scope.selectedRange.range,
      sort: 'byTime',
      direction: $scope.searchDirection,
      visibility: $scope.searchVisibility,
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
  
  
  
    
  $scope.$on('$routeUpdate', function(next, current) { 
    self.digestRouteParams($location.search());
  });  

  
  self.digestRouteParams($routeParams);
  
  
}]
);
