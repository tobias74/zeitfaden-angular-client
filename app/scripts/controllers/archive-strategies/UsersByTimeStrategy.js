'use strict';


var UsersByTimeStrategy = function(UserService,ScrollHistoryService){
  var self = this;

  var entityName = 'user';
  
  
  self.pushToRouteHistory = function(search,$scope){
    search.latitude = $scope.searchLocation.latitude;
    search.longitude = $scope.searchLocation.longitude;
    search.searchVisibility = $scope.selectedVisibility.visibility;
    search.searchDate = $scope.searchSpec.searchDate.toUTCString();
    search.searchDirection = $scope.searchSpec.selectedTimeOrdering.order;
    search.radius = $scope.searchSpec.selectedRange.range;
  };
  
  self.resetScrollStatus = function($scope){
    $scope.scrollEndReached = false;
    $scope.limit = 100;
    $scope.offset = 0;
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
  
  




  
  
  
  self.loadMore = function(callback, $scope) {
    console.debug('load more! ... my scrollStatusId is ' + $scope.scrollingStatusId);
    if ($scope.isLoadingEntities)
    {
      return false;
    }
    
    $scope.isLoadingEntities = true;
    var manydays=1000;

    
    var moreEntities = UserService.getUsersOrderedByTime({
      mustHaveAttachment: 1,
      limit: $scope.limit,
      offset: $scope.offset,
      latitude: $scope.searchLocation.latitude,
      longitude: $scope.searchLocation.longitude,
      distance: $scope.searchSpec.selectedRange.range,
      sort: 'byTime',
      direction: $scope.searchSpec.selectedTimeOrdering.order,
      visibility: $scope.selectedVisibility.visibility,
      datetime: Math.floor($scope.searchSpec.searchDate.getTime() / 1000)
      
      
    },function(){
      $scope.offset += moreEntities.length;
      
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
  
  
};
