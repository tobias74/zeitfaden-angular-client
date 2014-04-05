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
    

    performRegistration: function(email,password,password_again){
      console.debug('inside the servcie with ' + email + password);
      if (password !== password_again){
        console.debug('password mismatch');
        return;
      }
      
      $http.post('/user/register',{
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
    
    
    performLogout: function(){
      $http.post('/user/logout',{
          dummy: 'yes'
      }, {
        headers:{
          'tobias':'hello',
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }).success(function(data, status, headers, config){
          isUserLoggedIn = false;
          loggedInUserId = null;
      }).error(function(data, status, headers, config){
        console.debug('error loggin out.');
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

