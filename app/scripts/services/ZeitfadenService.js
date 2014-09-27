'use strict';

angular.module('ZeitfadenApp').service('ZeitfadenService', function ZeitfadenService($resource) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  
  
  
  return {
  	getCurrentLocation: function(callback){
	    navigator.geolocation.getCurrentPosition(function(position){
	    	callback && callback(position.coords.latitude, position.coords.longitude);
	    });  
  		
  	},
  	
  	reverseGeoCode: function(latitude,longitude,callback){
  	  return $resource('/station/reverseGeoCode/latitude/:latitude/longitude/:longitude', {
        latitude: '@id',
        longitude: '@id',
      }).get({
        latitude: latitude,
        longitude: longitude
      },callback);
  	},
  	
  	sayHello: function(){
  		console.debug('hello');
  	}
  	
  };
  
});
