'use strict';


var StationsByTimeStrategy = function(StationService,ScrollHistoryService){
  var self = this;

  var internalFromTimestamp;
  var lastStation;
  var entityName = 'station';
  
  
  self.pushToRouteHistory = function(search,$scope){
    search.latitude = $scope.searchLocation.latitude;
    search.longitude = $scope.searchLocation.longitude;
    search.searchVisibility = $scope.selectedVisibility.visibility;
    search.searchDate = $scope.searchSpec.searchDate.toUTCString();
    search.searchDirection = $scope.searchSpec.selectedTimeOrdering.order;
    search.radius = $scope.searchSpec.selectedRange.range;
  };
  
  self.resetScrollStatus = function($scope){
    lastStation = undefined;
    internalFromTimestamp = undefined;
    $scope.scrollEndReached = false;
  };
  
  self.setHistoryEntities = function(data,$scope){
    lastStation = data['lastStation'];
    $scope.entities = data[self.entityName + 's'];
    $scope.scrollEndReached = data['scrollEndReached'];
  };
  
  self.digestRoute = function(myParams,$scope){
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


    $scope.digestSingleTime(myParams);
    
    $scope.digestRadius(myParams);
    
  };
  
  




  
  
  
  self.loadMore = function(callback,$scope) {
    console.debug('load more! ... my scrollStatusId is ' + $scope.scrollingStatusId);
    if ($scope.isLoadingEntities)
    {
      return false;
    }
    
    $scope.isLoadingEntities = true;
    var lastId = 0;

    if (lastStation != undefined)
    {
      lastId = lastStation.id;
      internalFromTimestamp = lastStation.startTimestamp;
    }
    else // its a new search
    {
      internalFromTimestamp = Math.floor($scope.searchSpec.searchDate.getTime() / 1000);
    }

    
    var moreStations = StationService.getStationsOrderedByTime({
      mustHaveAttachment: 1,
      lastId: lastId,
      limit:20,
      latitude: $scope.searchLocation.latitude,
      longitude: $scope.searchLocation.longitude,
      distance: $scope.searchSpec.selectedRange.range,
      direction: $scope.searchSpec.selectedTimeOrdering.order,
      visibility: $scope.selectedVisibility.visibility,
      timestamp: internalFromTimestamp
      
    },function(){
      for (var i = 0; i < moreStations.length; i++) {
        var myStation = moreStations[i];
        $scope.attachGeoDataToStation(myStation);
        $scope.entities.push(myStation);
      }
      $scope.isLoadingEntities = false;
      if (moreStations.length>0)
      {
        lastStation = moreStations[moreStations.length-1];
      }
      else
      {
        $scope.scrollEndReached = true;
      }
      
      ScrollHistoryService.storeScrollingStatus($scope.scrollingStatusId, {
        filled: true,
        stations: $scope.entities,
        lastStation: lastStation,
        scrollEndReached: $scope.scrollEndReached
      });
      
      
      callback && callback();
    });
  };
  
  
};
