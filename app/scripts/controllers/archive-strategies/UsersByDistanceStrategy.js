'use strict';


var UsersByDistanceStrategy = function(UserService,ScrollHistoryService){
  var self = this;
  var entityName = 'user';
  
  
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
  
  
  self.loadMore = function(callback, $scope) {
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
      fromDate: Math.floor($scope.searchSpec.fromDate.getTime() / 1000),
      untilDate: Math.floor($scope.searchSpec.untilDate.getTime() / 1000),
      
    },function(){
      $scope.offset += moreEntities.length;
      
      for (var i = 0; i < moreEntities.length; i++) {
        $scope.entities.push(moreEntities[i]);
      }
      $scope.isLoadingEntities = false;
      if (moreEntities.length==0)
      {
        $scope.scrollEndReached = true;
      }
      
      ScrollHistoryService.storeScrollingStatus($scope.scrollingStatusId, {
        filled: true,
        entities: $scope.entities,
        scrollEndReached: $scope.scrollEndReached
      });
      
      callback && callback();
    });






  };
  
  
};
