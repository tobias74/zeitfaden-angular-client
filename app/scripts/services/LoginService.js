'use strict';

angular.module('ZeitfadenApp').factory('LoginService', function($http){
  
  var isUserLoggedIn = false;
  var loggedInUserId = null;
  
  return {
    
    performLogin: function(email,password){
      console.debug('inside the servcie with ' + email + password);
      
      $http({
        method: 'POST',
        url: '/user/login/some/param',
        data: {
          email: email,
          password: password
        }
      }).success(function(data, status, headers, config){
          isUserLoggedIn = true;
          loggedInUserId = data.loggedInUserId;
      }).error(function(data, status, headers, config){
          isUserLoggedIn = false;
      });      
      
    },
    
    isUserLoggedIn: function(){
      return isUserLoggedIn;
    },
    
    getLoggedInUserId: function(){
      return loggedInUserId;
    }
    
  };
  
});

