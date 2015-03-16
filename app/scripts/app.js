'use strict';

var app = angular.module('ZeitfadenApp', ['ngRoute','ngResource','infinite-scroll','angularFileUpload','ui.bootstrap'],function($compileProvider,$provide, $httpProvider,$anchorScrollProvider){
  
  //$anchorScrollProvider.disableAutoScrolling();

	$provide.decorator('ngIncludeDirective', function($delegate, $http,   $templateCache, $anchorScroll, $animate, $sce){
		
		$delegate[0].compile = function(element, attr) {
		      
		      var afterRendering = attr.afterRendering;
		  
		      var srcExp = attr.ngInclude || attr.src,
		          onloadExp = attr.onload || '',
		          autoScrollExp = attr.autoscroll;
		          
		      return function(scope, $element, $attr, ctrl, $transclude) {
		        var changeCounter = 0,
		            currentScope,
		            previousElement,
		            currentElement;
		
		        var cleanupLastIncludeContent = function() {
		          if(previousElement) {
		            previousElement.remove();
		            previousElement = null;
		          }
		          if(currentScope) {
		            currentScope.$destroy();
		            currentScope = null;
		          }
		          if(currentElement) {
		            $animate.leave(currentElement, function() {
		              previousElement = null;
		            });
		            previousElement = currentElement;
		            currentElement = null;
		          }
		        };
		
		        scope.$watch($sce.parseAsResourceUrl(srcExp), function ngIncludeWatchAction(src) {
		          var afterAnimation = function() {
		            if (angular.isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
		              $anchorScroll();
		            }		            
		            if(angular.isDefined(afterRendering)){
                  scope.$eval(afterRendering);
		            }
		          };
		          var thisChangeId = ++changeCounter;
		
		          if (src) {
		            $http.get(src, {cache: $templateCache}).success(function(response) {
		              if (thisChangeId !== changeCounter) return;
		              var newScope = scope.$new();
		              ctrl.template = response;
		
		              // Note: This will also link all children of ng-include that were contained in the original
		              // html. If that content contains controllers, ... they could pollute/change the scope.
		              // However, using ng-include on an element with additional content does not make sense...
		              // Note: We can't remove them in the cloneAttchFn of $transclude as that
		              // function is called before linking the content, which would apply child
		              // directives to non existing elements.
		              var clone = $transclude(newScope, function(clone) {
		                cleanupLastIncludeContent();
		                $animate.enter(clone, null, $element, afterAnimation);
		              });
		
		              currentScope = newScope;
		              currentElement = clone;
		
		              currentScope.$emit('$includeContentLoaded');
		              scope.$eval(onloadExp);
		            }).error(function() {
		              if (thisChangeId === changeCounter) cleanupLastIncludeContent();
		            });
		            scope.$emit('$includeContentRequested');
		          } else {
		            cleanupLastIncludeContent();
		            ctrl.template = null;
		          }
		        });
		      };
		    };


		return $delegate;
	});


  
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
      .when('/archive', {
        templateUrl: 'app/views/archive.html', 
        controller: 'AbstractArchiveCtrl', 
        reloadOnSearch:false
      })
      .when('/station-archive', {
        templateUrl: 'app/views/station-archive.html', 
        controller: 'AbstractArchiveCtrl', 
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
      .when('/user-trace', {
        templateUrl: 'app/views/user-trace.html', 
        controller: 'UserTraceCtrl', 
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
      .when('/react', {
        templateUrl: 'app/views/react.html', 
        controller: 'ReactCtrl', 
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
  



angular.module('ZeitfadenApp').filter('filterUnknownLocations', function(){
  return function(input){
    if(!(input == undefined || input == null || input == '')){
      return input;
    } else {
      return "unknown location";
    }
  };
});


app.directive('includeReplace', function () {
    return {
        require: 'ngInclude',
        restrict: 'A', /* optional */
        link: function (scope, el, attrs) {
            el.replaceWith(el.children());
        }
    };
});



  
