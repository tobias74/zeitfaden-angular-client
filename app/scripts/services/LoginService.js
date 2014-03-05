'use strict';

angular.module('ZeitfadenApp').factory('LoginService', function($http){
  
  var isUserLoggedIn = false;
  var loggedInUserId = null;
  
  return {
    
    performLogin: function(email,password){
      console.debug('inside the servcie with ' + email + password);
      
      $http.post('/user/login',{
          dummy: 'yes',
          email: email,
          password: password
      }, {
        headers:{
          'tobias':'hello',
          'Content-Type':'application/x-www-form-urlencoded'
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

