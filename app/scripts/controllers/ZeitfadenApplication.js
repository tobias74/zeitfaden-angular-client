'use strict';

angular.module('ZeitfadenApp').controller('ZeitfadenApplicationCtrl', function($scope,StationService,$routeParams,$location,$upload,LoginService) {
  

  $scope.tobias="inside the main application controller.";
  $scope.applicationTitle = "Zeitfaden";                         
     
     
  $scope.isUserLoggedIn = LoginService.isUserLoggedIn;
  $scope.getLoggedInUserId = LoginService.getLoggedInUserId;

  $scope.$watch('isUserLoggedIn', function(newValue, oldValue, scope){
    console.debug('inside ApplicationCOntroller: got the notification of the loginservice about loggedinUser');
  });
         
         
  
  $scope.performRegistration = function(email,password,password_again){
      LoginService.performRegistration(email,password,password_again);
  }       
         
  $scope.performLogout = function(){
      LoginService.performLogout();
  }       
         
});
