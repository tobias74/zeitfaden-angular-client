'use strict';

angular.module('ZeitfadenApp').controller('StationArchiveCtrl', function($scope,StationService,$routeParams,$location,ResponsiveService) {
  
  window.tobias = {};
  
  console.debug('I got called : ArchiveStationsContr5oller.');
  
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
                           
  $scope.getAttachmentFormat = ResponsiveService.getAttachmentFormat;       
         
  var internalFromDate;
  var internalUntilDate;
  var lastStation;
  var scrollEndReached = false;       
         
  $scope.stations = [];
  $scope.isLoadingStations = false;
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
    lastStation = undefined;
    internalFromDate = undefined;
    internalUntilDate = undefined;
    scrollEndReached = false;
    
  };
  
  
  var digestRouteParams = function(myParams){
    
    console.debug('digesting routeparams:');
    console.debug(myParams);

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
    else {
      
    }

    if (myParams.scrollingStatusId){

      console.debug('got the scrolling status');
      $scope.scrollingStatusId = myParams.scrollingStatusId;
      digestScrollingStatus($scope.scrollingStatusId);
    }
    else {
      console.debug('this ever reached? ####################################################################');
      console.debug('no.. no scolling status');
      console.debug('for the time beeing make in manually? No, this obviously is a new call to this page, therefore we replace.');
      console.debug('since there is now scrollingId, we say go: location.replace.');

      //$scope.clickedLoad();
      //$scope.scrollingStatusId = 'zf-ls-' + new Date().getTime();      
      //$scope.introduceScrollingStatus($scope.scrollingStatusId);
    }
    
    
  };
  

  var isScrollingStatusEmpty = function(scrollingStatusId){
    return (window.tobias[scrollingStatusId]['filled'] !== true);
  };

  
  var introduceScrollingStatus = function(scrollingStatusId){
    window.tobias[scrollingStatusId] = {};
    window.tobias[scrollingStatusId]['filled'] = false;
    window.tobias[scrollingStatusId]['stations'] = [];
    window.tobias[scrollingStatusId]['tobias'] = 'this thing was just initialized.';
    
  };
  
  var digestScrollingStatus = function(scrollingStatusId){
    $scope.debug_didLoadStations = true;

    if (!window.tobias[scrollingStatusId]){
      console.debug('uh.. that scrollingStatusId-Id does not exists.');
      introduceScrollingStatus(scrollingStatusId);
      loadStations();
    } 
    else {
      console.debug('digesting scrollingStatusId: ' + scrollingStatusId);
      console.debug(window.tobias[scrollingStatusId]);
      console.debug(window.tobias[scrollingStatusId]['tobias']);
      
      // hier dann das aktuelle interna Datum setzen
      //$scope.searchDate = window.tobias[$scope.scrollingStatusId]['searchDate'];
      $scope.stations = window.tobias[$scope.scrollingStatusId]['stations'];
      lastStation = window.tobias[$scope.scrollingStatusId]['lastStation'];
      scrollEndReached = window.tobias[$scope.scrollingStatusId]['scrollEndReached'];
      
      
      if (isScrollingStatusEmpty(scrollingStatusId)){
        console.debug('scrolling status seems to be emtpy, therefore loading now.');
        loadStations();
      }
      else {
        console.debug('there should be stuff in the filler, not loading');
      }
      
      
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
    $scope.digestChangedModel();
  }

  $scope.changedLocation = function(){
    console.debug('changed location');
    console.debug($scope.searchLocation);
    $scope.$apply(function(){
      $scope.digestChangedModel();
    });
  }


  $scope.clickedLoad = function(){
    console.debug('clicked load Button Stachion Archive');
    $scope.digestChangedModel();    
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
  
  var loadStations = function(){
    console.debug('new load Stations');
    
    $scope.stations = [];
    
    console.debug('load stations with scrollStatus: ' + $scope.scrollingStatusId);
    $scope.loadMore();
  };
  
  $scope.scrolledForMore = function(callback){
    console.debug('scroll detected');
    if (scrollEndReached)
    {
      console.debug('scroll end reached');
      return;
    }
    if (!$scope.isLoadingStations)
    {
      $scope.loadMore(callback);
    }
  };
  
  $scope.loadMore = function(callback) {
    console.debug('load more! ... my scrollStatusId is ' + $scope.scrollingStatusId);
    if ($scope.isLoadingStations)
    {
      return false;
    }
    
    $scope.isLoadingStations = true;
    var manydays=1000;
    var lastId = 0;

    console.debug('search Dirdtiton is here ########################: ' + $scope.searchDirection);

    if (lastStation != undefined)
    {
      lastId = lastStation.id;
      console.debug('we have a last station ' + lastStation.zuluStartDateString);
      console.debug(lastStation);

      internalFromDate = new Date(lastStation.zuluStartDateString);

    }
    else // its a new search
    {
      console.debug('we do not have a last station');
      console.debug($scope.searchDate);

      internalFromDate = $scope.searchDate;
      
      
    }



    console.debug('internal from date');
    console.debug(internalFromDate);
    
    var moreStations = StationService.getStationsOrderedByTime({
      mustHaveAttachment: 1,
      lastId: lastId,
      latitude: $scope.searchLocation.latitude,
      longitude: $scope.searchLocation.longitude,
      distance: $scope.selectedRange.range,
      sort: 'byTime',
      direction: $scope.searchDirection,
      visibility: $scope.searchVisibility,
      datetime: internalFromDate.toUTCString()
      
    },function(){
      //console.debug(moreStations);
      for (var i = 0; i < moreStations.length; i++) {
        $scope.stations.push(moreStations[i]);
      }
      $scope.isLoadingStations = false;
      if (moreStations.length>0)
      {
        lastStation = moreStations[moreStations.length-1];
      }
      else
      {
        scrollEndReached = true;
      }
      
      window.tobias[$scope.scrollingStatusId]['filled'] = true;
      window.tobias[$scope.scrollingStatusId]['stations'] = $scope.stations;
      window.tobias[$scope.scrollingStatusId]['tobias'] = 'yeshere';
      window.tobias[$scope.scrollingStatusId]['lastStation'] = lastStation;
      window.tobias[$scope.scrollingStatusId]['scrollEndReached'] = scrollEndReached;
      
      $scope.debug_didLoadStations = true;
      
      callback && callback();
    });






  };
  
/*  
  $scope.getQuery = function(){
    var fromDateString='2020-01-01';
    var untilDateString='2020-01-01';
    var lastIdString;
    var sortString;

    fromDateString = internalFromDate.toUTCString();
    untilDateString = internalUntilDate.toUTCString();
    
    if (lastStation != undefined)
    {
      lastIdString = "and higher than '" + lastStation.id + "'";
    }
    else
    {
      lastIdString = "";
    }
  
    if ($scope.searchDirection == 'intoTheFuture')
    {
      sortString = " chronological ";
    }
    else
    {
      sortString = " reverse chronological ";
    }
  
    
    return "get 30,0 " + sortString + " attachments from '" + fromDateString + "' until '" + untilDateString +"' at latitude " + $scope.searchLocation.latitude + " and longitude " + $scope.searchLocation.longitude + " within " + $scope.selectedRange.range + " miles " + lastIdString;

  };
*/
  
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
