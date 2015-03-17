'use strict';


var StationsByDistanceStrategy = function(StationService,ScrollHistoryService){
  var self = this;
  var entityName = 'station';
  
  
  self.pushToRouteHistory = function(search,$scope){
    search.latitude = $scope.searchLocation.latitude;
    search.longitude = $scope.searchLocation.longitude;
    search.searchVisibility = $scope.selectedVisibility.visibility;

    search.fromDate = $scope.searchSpec.fromDate.toUTCString();
    search.untilDate = $scope.searchSpec.untilDate.toUTCString();
    search.searchDirection = $scope.searchDirection;
    
  };
  
  self.resetScrollStatus = function($scope){
    $scope.scrollEndReached = false;
    $scope.limit = 100;
    $scope.offset = 0;
  };
  
  self.setHistoryEntities = function(data,$scope){
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


    $scope.digestTwoTimes(myParams);
    
    
  };
  
  self.loadMore = function(callback,$scope) {
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
      maxDistance: 999999999999,
      direction: $scope.searchDirection,
      visibility: $scope.selectedVisibility.visibility,
      fromDate: Math.floor($scope.searchSpec.fromDate.getTime() / 1000),
      untilDate: Math.floor($scope.searchSpec.untilDate.getTime() / 1000),
      
      
      
    },function(){
      $scope.offset += moreStations.length;
    for (var i = 0; i < moreStations.length; i++) {
          var myStation = moreStations[i];
          $scope.attachGeoDataToStation(myStation);
          $scope.entities.push(myStation);
        }
      $scope.isLoadingEntities = false;
      if (moreStations.length == 0)
      {
        $scope.scrollEndReached = true;
      }
      
        ScrollHistoryService.storeScrollingStatus($scope.scrollingStatusId, {
        filled: true,
        stations: $scope.entities,
        tobias: 'yeshere',
        scrollEndReached: $scope.scrollEndReached
        });
      
      
        callback && callback();
    });






  };
  
  
};
