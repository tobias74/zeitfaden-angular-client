'use strict';

angular.module('ZeitfadenApp').controller('AbstractStationArchiveCtrl', 
['$scope','ProtectedControllerData','$location','ResponsiveService','$controller',
function($scope,self,$location,ResponsiveService,$controller) {
  
  $controller('AbstractArchiveCtrl', {$scope: $scope, ProtectedControllerData:self});
  
  
  $scope.setSelectedStation = function(station){
    $scope.selectedStation = station;
  };


  $scope.activateNextStation = function(){
    console.debug('activatingt next station');
    $scope.selectedStation = _.succeeding($scope.stations, $scope.selectedStation);
    console.debug($scope.selectedStation);
  };

  $scope.activatePreviousStation = function(){
    console.debug('activatingt previous station');
    $scope.selectedStation = _.preceding($scope.stations, $scope.selectedStation);
  };
  

  
  $scope.scrolledForMore = function(callback){
    console.debug('scroll detected');
    if (self.scrollEndReached)
    {
      console.debug('scroll end reached');
      return;
    }
    if (!$scope.isLoadingStations)
    {
      $scope.loadMore(callback);
    }
  };
  
}]);
