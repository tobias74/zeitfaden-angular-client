'use strict';

angular.module('ZeitfadenApp').controller('StationArchiveCtrl', function($scope,StationService,$routeParams,$location) {
  
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
  $scope.fromDate = new Date();
  $scope.untilDate = new Date();
  
  
  
  
  
  

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
  

  $scope.clickedLoad = function(){
    
    var search = $location.search();
    search.latitude = $scope.searchLocation.latitude;
    search.longitude = $scope.searchLocation.longitude;
    search.fromDate = $scope.fromDate.toUTCString();
    search.untilDate = $scope.untilDate.toUTCString();
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
  
  $scope.loadStations = function(){
    console.debug('new load Stations');
    
    $scope.stations = [];
    $scope.queryOffset = 0;
    $scope.queryLimit = 20;
    console.debug('load stations with scrollStatus: ' + $scope.scrollingStatusId);
    $scope.loadMore();
  };
  
  $scope.scrolledForMore = function(callback){
    console.debug('detected the scrolling.');
    $scope.loadMore(callback);
  };
  
  $scope.loadMore = function(callback) {
    
    console.debug('load more! ... my scrollStatusId is ' + $scope.scrollingStatusId);

    $scope.isLoadingStations = true;
    var moreStations = StationService.getByQuery($scope.getQuery(),function(){
      //console.debug(moreStations);
      for (var i = 0; i < moreStations.length; i++) {
        $scope.stations.push(moreStations[i]);
      }
      $scope.isLoadingStations = false;
      $scope.queryOffset += moreStations.length;
      
      window.tobias[$scope.scrollingStatusId]['filled'] = true;
      window.tobias[$scope.scrollingStatusId]['stations'] = $scope.stations;
      window.tobias[$scope.scrollingStatusId]['queryOffset'] = $scope.queryOffset;
      window.tobias[$scope.scrollingStatusId]['tobias'] = 'yeshere';
      
      $scope.debug_didLoadStations = true;
      
      callback && callback();
    });
  };
  
  
  $scope.getQuery = function(){
    var fromDateString='2020-01-01';
    var untilDateString='2020-01-01';
    
    if ($scope.fromDate != undefined)
    {
        fromDateString = $scope.fromDate.toUTCString();
    }
    if ($scope.untilDate != undefined)
    {
        untilDateString = $scope.untilDate.toUTCString();
    }
    
    return "get " + $scope.queryLimit + "," + $scope.queryOffset + " attachments from '" + fromDateString + "' until '" + untilDateString +"' at latitude " + $scope.searchLocation.latitude + " and longitude " + $scope.searchLocation.longitude + " within " + $scope.selectedRange.range + " miles";
  };

  
  $scope.updateMyText = function(date){
    console.debug('I did get this here in updateMyText ' + date);
    console.debug($scope.fromDate);
  };
  
  
  
  $scope.digestRouteParams = function(myParams){
    
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
    else {
      //$scope.setToCurrentLocation($scope.loadStations);
    }

    if (myParams.scrollingStatusId){

      console.debug('got the scrolling status');
      $scope.scrollingStatusId = myParams.scrollingStatusId;
      $scope.digestScrollingStatus($scope.scrollingStatusId);
    }
    else {
      console.debug('no.. no scolling status');
      console.debug('for the time beeing make in manually? No, this obviously is a new call to this page, therefore we replace.');
      console.debug('since there is now scrollingId, we say go: location.replace.');

      $scope.clickedLoad();
      //$scope.scrollingStatusId = 'zf-ls-' + new Date().getTime();      
      //$scope.introduceScrollingStatus($scope.scrollingStatusId);
    }
    
    
  };
  
  
  $scope.isScrollingStatusEmpty = function(scrollingStatusId){
    return (window.tobias[scrollingStatusId]['filled'] !== true);
  };

  $scope.isScrollingStatusFilled = function(scrollingStatusId){
    return window.tobias[scrollingStatusId]['filled'];
  };
  
  $scope.introduceScrollingStatus = function(scrollingStatusId){
    window.tobias[scrollingStatusId] = {};
    window.tobias[scrollingStatusId]['filled'] = false;
    window.tobias[scrollingStatusId]['stations'] = [];
    window.tobias[scrollingStatusId]['queryOffset'] = 0;
    window.tobias[scrollingStatusId]['tobias'] = 'this thing was just initialized.';
    
  };
  
  $scope.digestScrollingStatus = function(scrollingStatusId){
    $scope.debug_didLoadStations = true;

    if (!window.tobias[scrollingStatusId]){
      console.debug('uh.. that scrollingStatusId-Id does not exists.');
      $scope.introduceScrollingStatus(scrollingStatusId);
      $scope.loadStations();
    } 
    else {
      console.debug('digesting scrollingStatusId: ' + scrollingStatusId);
      console.debug(window.tobias[scrollingStatusId]);
      console.debug(window.tobias[scrollingStatusId]['tobias']);
      
      $scope.queryOffset = window.tobias[scrollingStatusId]['queryOffset'];
      $scope.stations = window.tobias[$scope.scrollingStatusId]['stations'];
      
      if ($scope.isScrollingStatusEmpty(scrollingStatusId)){
        console.debug('scrolling status seems to be emtpy, therefore loading now.');
        $scope.loadStations();
      }
      else {
        console.debug('there should be stuff in the filler, not loading');
      }
      
      
    }
  };
    
  $scope.$on('$routeUpdate', function(next, current) { 
    $scope.digestRouteParams($location.search());
    //$scope.loadStations();
  });  

  
  $scope.digestRouteParams($routeParams);
  
  $scope.tobiasDebug='no';

  
});
