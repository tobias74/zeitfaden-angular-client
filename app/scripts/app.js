'use strict';

angular.module('ZeitfadenApp', ['ngRoute','ngResource','infinite-scroll','angularFileUpload','ui.bootstrap'],function($provide, $httpProvider){
  $provide.factory('myHttpInterceptor', function($q) {
    return function(promise) {

     return promise.then(
        function(response) {
            //console.debug(eval ('window.some = ' + response.headers().zeitfadenprofiler));
           return response;
        }, function(response) {
           return $q.reject('whaat?');
        });
     };
  });
  $httpProvider.responseInterceptors.push('myHttpInterceptor');
  
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  
  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data)
  {
    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */ 
    var param = function(obj)
    {
      var query = '';
      var name, value, fullSubName, subName, subValue, innerObj, i;
      
      for(name in obj)
      {
        value = obj[name];
        
        if(value instanceof Array)
        {
          for(i=0; i<value.length; ++i)
          {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if(value instanceof Object)
        {
          for(subName in value)
          {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if(value !== undefined && value !== null)
        {
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
      }
      
      return query.length ? query.substr(0, query.length - 1) : query;
    };
    
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];  
  
  
  
  
  
  
}).config(function ($routeProvider) {
    $routeProvider
      .when('/', {
//        redirectTo: '/archive'
        templateUrl: 'app/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/station-archive', {
        templateUrl: 'app/views/station-archive.html', 
        controller: 'StationArchiveCtrl', 
        reloadOnSearch:false
      })
      .when('/station-by-distance', {
        templateUrl: 'app/views/station-distance-archive.html', 
        controller: 'StationDistanceArchiveCtrl', 
        reloadOnSearch:false
      })
      .when('/user-archive', {
        templateUrl: 'app/views/user-archive.html', 
        controller: 'UserArchiveCtrl', 
        reloadOnSearch:false
      })
      .when('/user-by-distance', {
        templateUrl: 'app/views/user-distance-archive.html', 
        controller: 'UserDistanceArchiveCtrl', 
        reloadOnSearch:false
      })
      .when('/trace-archive', {
        templateUrl: 'app/views/traces-archive.html', 
        controller: 'TraceArchiveCtrl', 
        reloadOnSearch:false
      })
      .when('/settings', {
        templateUrl: 'app/views/settings.html', 
        controller: 'SettingsCtrl', 
        reloadOnSearch:false
      })
      .when('/my-trace', {
        templateUrl: 'app/views/my-trace.html', 
        controller: 'MyTraceCtrl', 
        reloadOnSearch:false
      })
      .when('/instant-uploader', {
        templateUrl: 'app/views/instant-uploader.html', 
        controller: 'InstantUploaderCtrl', 
        reloadOnSearch:false
      })
      .otherwise({
        redirectTo: '/archive'
      });
  });
  
  
  
