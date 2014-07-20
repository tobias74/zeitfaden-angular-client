'use strict';

angular.module('ZeitfadenApp').factory('UserService', function($resource){
  return {
    
    getUsersOrderedByTime: function(params,callback){
      
      return $resource('/user/get/userMustHaveAttachment/:mustHaveAttachment/visibility/:visibility/latitude/:latitude/longitude/:longitude/maxDistance/:distance/datetime/:datetime/sort/:sort/direction/:direction/limit/:limit/offset/:offset', {
        mustHaveAttachment: '@id',
        latitude: '@id',
        longitude: '@id',
        distance: '@id',
        datetime: '@id',
        sort: '@id',
        direction: '@id',
        visibility: '@id',
        offset: '@offset',
        limit: '@limit'
      }).query(params,callback);
    },
    
    getUsersOrderedByDistance: function(params,callback){
      return $resource('/user/get/userMustHaveAttachment/:mustHaveAttachment/visibility/:visibility/latitude/:latitude/longitude/:longitude/maxDistance/:maxDistance/from/:fromDate/until/:untilDate/sort/byDistanceToPin/direction/:direction/limit/:limit/offset/:offset', {
        mustHaveAttachment: '@id',
        limit: '@id',
        offset: '@id',
        latitude: '@id',
        longitude: '@id',
        maxDistance: '@id',
        fromDate: '@id',
        untilDate: '@id',
        direction: '@id',
        visibility: '@id'
      }).query(params,callback);
    }
    
  };
  
});



/*
angular.module('stationServices', ['ngResource']).
factory('StationsByQuery', function($resource){
  return $resource('/getStationsByQuery/:query', {query:'@id'});
});
*/