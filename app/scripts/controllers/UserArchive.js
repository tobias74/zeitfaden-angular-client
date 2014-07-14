'use strict';

angular.module('ZeitfadenApp').controller('UserArchiveCtrl', function($scope,StationService,UserService,$routeParams,$location,ResponsiveService,ScrollHistoryService,$controller) {
  
  $controller('AbstractArchiveCtrl', {$scope: $scope});
  
  console.debug('I got called : ArchiveUserContr5oller.');

  var scrollEndReached = false;
  var limit = 100;
  var offset = 0;       
  
  ScrollHistoryService.setController(this);
  
  this.setHistoryStations = function(data){
	  $scope.entities = data['entities'];
      scrollEndReached = data['scrollEndReached'];
  };
  
  this.loadEntities = function(){
  	loadUsers();
  };
  
                           
  $scope.getAttachmentFormat = ResponsiveService.getAttachmentFormat;       
         
         
  $scope.entities = [];
  $scope.isLoadingEntities = false;
  $scope.isSearchingLocation = true;

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
    scrollEndReached = false;
  };
  
  
  
  var digestRouteParams = function(myParams){

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
    else 
    {
      console.debug('this ever reached? ####################################################################');
      console.debug('no.. no scolling status');
      console.debug('for the time beeing make in manually? No, this obviously is a new call to this page, therefore we replace.');
      console.debug('since there is now scrollingId, we say go: location.replace.');

    }
    
    
  };
  

  

  
  

  
  $scope.digestChangedModel = function(){
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
  
  var loadUsers = function(){
    offset = 0;
    console.debug('new load Stations');
    
    $scope.entities = [];
    
    console.debug('load entities with scrollStatus: ' + $scope.scrollingStatusId);
    $scope.loadMore();
  };
  
  $scope.scrolledForMore = function(callback){
    console.debug('scroll detected');
    if (scrollEndReached)
    {
      console.debug('scroll end reached');
      return;
    }
    if (!$scope.isLoadingEntities)
    {
      $scope.loadMore(callback);
    }
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
      
      //console.debug(moreEntities);
      for (var i = 0; i < moreEntities.length; i++) {
        $scope.entities.push(moreEntities[i]);
      }
      $scope.isLoadingEntities = false;
      if (moreEntities.length==0)
      {
        scrollEndReached = true;
      }
      
      ScrollHistoryService.storeScrollingStatus($scope.scrollingStatusId, {
	      filled: true,
	      entities: $scope.entities,
	      tobias: 'yeshere',
	      scrollEndReached: scrollEndReached
      });
      
      $scope.debug_didLoadStations = true;
      
      callback && callback();
    });






  };
  
  
  $scope.updateMyText = function(date){
    console.debug('I did get this here in updateMyText ' + date);
    console.debug($scope.fromDate);
  };
  
  
  
  
  
    
  $scope.$on('$routeUpdate', function(next, current) { 
    digestRouteParams($location.search());
  });  

  
  digestRouteParams($routeParams);
  
  $scope.tobiasDebug='no';

  
  
  
});
