'use strict';

angular.module('ZeitfadenApp').factory('LoginService', function($http,$q){
  
  var isUserLoggedIn = false;
  var loggedInUserId = null;
  var isPerformingLogin = false;


  $http.post('/user/getMyAccountData',{
      dummy: 'yes'
  }, {
    headers:{
      'tobias':'hello',
      'Content-Type':'application/x-www-form-urlencoded'
    }
    
  }).success(function(data, status, headers, config){
      console.debug('this is loggin dta:');
      console.debug(data);
      if (data.userId)
      {
        isUserLoggedIn = true;
        loggedInUserId = data.userId;
      }
      else
      {
        isUserLoggedIn = false;
      }
  }).error(function(data, status, headers, config){
      isUserLoggedIn = false;
  });      


  
  
  return {
    
    
    
    performLogin: function(email,password){
      var deferred = $q.defer();
      
      console.debug('inside the servcie with ' + email + password);
      isPerformingLogin = true;
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
          isPerformingLogin = false;
          loggedInUserId = data.loggedInUserId;
          deferred.resolve(loggedInUserId);
      }).error(function(data, status, headers, config){
          isUserLoggedIn = false;
          isPerformingLogin = false;
          deferred.reject();
      });      
      
      return deferred.promise;
    },
    

    performRegistration: function(email,password,password_again){
      var deferred = $q.defer();
      
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
          deferred.resolve(loggedInUserId);
      }).error(function(data, status, headers, config){
          isUserLoggedIn = false;
          deferred.reject();
      });      

      return deferred.promise;
      
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

    isPerformingLogin: function(){
      return isPerformingLogin;
    },

    getLoggedInUserId: function(){
      return loggedInUserId;
    }
    
  };
  
});

