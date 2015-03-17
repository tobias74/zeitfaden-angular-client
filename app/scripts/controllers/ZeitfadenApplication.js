'use strict';

angular.module('ZeitfadenApp').controller('ZeitfadenApplicationCtrl', function($scope,ZeitfadenService,$routeParams,$location,LoginService,$fileUploader,MenuService) {
  

  $scope.tobias="inside the main application controller.";
  $scope.applicationTitle = "Zeitfaden";                         
     
  $scope.MenuService = MenuService;
     
  $scope.isUserLoggedIn = LoginService.isUserLoggedIn;
  $scope.getLoggedInUserId = LoginService.getLoggedInUserId;

  $scope.$watch('isUserLoggedIn', function(newValue, oldValue, scope){
    console.debug('inside ApplicationCOntroller: got the notification of the loginservice about loggedinUser');
  });
  
  
  $scope.clickPeople = function(){
    alert('hello');
  };
  
  $scope.isThisEveryWhere='Tobias is everywhere!';       
         
 
  
  $scope.performRegistration = function(email,password,password_again){
      LoginService.performRegistration(email,password,password_again);
  };       
         
  $scope.performLogout = function(){
      LoginService.performLogout();
  };
  
  

         
         
});
