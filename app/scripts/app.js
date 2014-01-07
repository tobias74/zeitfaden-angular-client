'use strict';

angular.module('ZeitfadenApp', ['ngResource','infinite-scroll'],function($provide, $httpProvider){
  $provide.factory('myHttpInterceptor', function($q) {
    return function(promise) {

     return promise.then(
        function(response) {
            console.debug(eval ('window.some = ' + response.headers().zeitfadenprofiler));
           return response;
        }, function(response) {
           return $q.reject('whaat?');
        });
     };
  });
  $httpProvider.responseInterceptors.push('myHttpInterceptor');
  
}).config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/archive', {
        templateUrl: 'app/views/station-archive.html', 
        controller: 'StationArchiveCtrl', 
        reloadOnSearch:false
      })
      .when('/trace-archive', {
        templateUrl: 'app/views/traces-archive.html', 
        controller: 'TraceArchiveCtrl', 
        reloadOnSearch:false
      })
      .otherwise({
        redirectTo: '/'
      });
  });
