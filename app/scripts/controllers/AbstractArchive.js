'use strict';

angular.module('ZeitfadenApp').controller('AbstractArchiveCtrl', 
['$scope','ProtectedControllerData','$location','ResponsiveService','ScrollHistoryService',
function($scope,self,$location,ResponsiveService,ScrollHistoryService) {
  
  $scope.dataForRangeSelect = [
    {"range": 2, "description": "2m"},
    {"range": 10, "description": "10m"},
    {"range": 100, "description": "100m"},
    {"range": 500, "description": "500m"},
    {"range": 1000, "description": "1km"},
    {"range": 10000, "description": "10km"},
    {"range": 100000, "description": "100km"},
    {"range": 1000000, "description": "1000km"},
    {"range": 10000000, "description": "10000km"},
    {"range": 100000000, "description": "100000km"}
  ];

  $scope.dataForVisibilitySelect = [
    {"visibility": 'public_only', "description": "Public"},
    {"visibility": 'my_own', "description": "Only mine"},
    {"visibility": 'pass_protected', "description": "Protected"}
  ];


  $scope.searchLocation = {
    latitude: 13.0810, 
    longitude: 80.2740, 
    zoom: 14
  };
  
  $scope.entityListLoaded = function(){
  	ScrollHistoryService.unlockScrollHistory($scope.scrollingStatusId);
  	
  	console.debug('entity list loaded now going to rescroll o');
  	
  	if (ScrollHistoryService.hasScrollTop($scope.scrollingStatusId)){
  		ScrollHistoryService.restoreScrollTop($scope.scrollingStatusId);  
  	}
  };
  
  $scope.scrollCallback = function(val){
    ScrollHistoryService.setScrollTop($scope.scrollingStatusId, val);
  };
  
  $scope.showLongSpacer = true;
  
  $scope.showBigImages = false;
  $scope.showLonelyEntity = false;
  
  $scope.toggleShowFullSettings = function(){
  	$scope.showFullSettings = !$scope.showFullSettings;
  };
  
  $scope.showFullSettings = false;
  
  self.scrollEndReached = false;       
  $scope.entities = [];
  $scope.isLoadingEntities = false;
  $scope.isSearchingLocation = false;

  $scope.getAttachmentFormat = ResponsiveService.getAttachmentFormat;       


  self.digestRouteParams = function(myParams){

    if (myParams.searchVisibility){
      $scope.selectedVisibility = $.grep($scope.dataForVisibilitySelect,function(n,i){
        return (n.visibility == myParams.searchVisibility);
      })[0];
    }
    else {
      $scope.selectedVisibility = $scope.dataForVisibilitySelect[0];
    }

    if (!$scope.selectedVisibility){
      $scope.selectedVisibility = $scope.dataForVisibilitySelect[0];
    }


  };

  self.digestRouteLonelyEntity = function(myParams){
    if (myParams.showLonelyEntity){
      $scope.lonelyEntity = myParams.lonelyEntity;
      $scope.lonelyEntityOwner = myParams.lonelyEntityOwner;
      $scope.showLonelyEntity = true;
    }
    else {
      $scope.showLonelyEntity = false;
    }
  };

  
  $scope.setToCurrentLocation = function(callback) {
    $scope.isSearchingLocation = true;
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        $scope.searchLocation.latitude = position.coords.latitude;
        $scope.searchLocation.longitude = position.coords.longitude;
        $scope.isSearchingLocation = false;
        $scope.selectedRange = $scope.dataForRangeSelect[1];
        callback && callback();
      });
    });  
  };

  $scope.changedDistance = function(){
    console.debug('changed distance');
    self.digestChangedModel();
  };

  $scope.changedVisibility = function(){
    console.debug('changed visibility');
    self.digestChangedModel();
  };

  $scope.changedDate = function(){
    console.debug('changed date');
    $scope.$apply(function(){
      self.digestChangedModel();
    });
  };

  $scope.changedLocation = function(){
    console.debug('changed location');
    console.debug($scope.searchLocation);
    $scope.$apply(function(){
      self.digestChangedModel();
    });
  };

  $scope.clickedLoad = function(){
    console.debug('clicked load Button Stachion Archive');
    self.digestChangedModel();    
  };
  
  $scope.$on('$routeUpdate', function(next, current) { 
    self.digestRouteParams($location.search());
  });  
  
  $scope.clickedLoad = function(){
    console.debug('clicked load Button Entities Archive');
    self.digestChangedModel();    
  };
  
  $scope.scrolledForMore = function(callback){
    console.debug('scroll detected');
    if (self.scrollEndReached)
    {
      console.debug('scroll end reached');
      return;
    }
    if (!$scope.isLoadingEntities)
    {
      $scope.loadMore(callback);
    }
  };
  
  $scope.setSelectedEntity = function(val){
    $scope.selectedEntity = val;
  };

  $scope.setSelectedMapEntity = function(val){
    $scope.selectedMapEntity = val;
  };


  $scope.activateNextEntity = function(){
    $scope.selectedEntity = _.succeeding($scope.entities, $scope.selectedEntity);
  };

  $scope.activatePreviousEntity = function(){
    $scope.selectedEntity = _.preceding($scope.entities, $scope.selectedEntity);
  };
  
}]);
