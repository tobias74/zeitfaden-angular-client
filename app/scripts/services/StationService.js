'use strict';

angular.module('ZeitfadenApp').factory('StationService', function($resource){
  return {
    getByQuery: function(query, callback){
      return $resource('/station/getByQUery/query/:query', {query:'@id'}).query({query:query},callback);
    },


    
    getResourceForUnboundStationsOrderedByTime: function(){
      return $resource('/station/get/limit/:limit/stationMustHaveAttachment/:mustHaveAttachment/visibility/:visibility/timestamp/:timestamp/sort/byTime/direction/:direction/lastId/:lastId', {
        mustHaveAttachment: '@id',
        limit: '@id',
        timestamp: '@id',
        direction: '@id',
        visibility: '@id',
        lastId: '@id'
      });
    },


    getUnboundStationsOrderedByTime: function(params,callback){
      return this.getResourceForUnboundStationsOrderedByTime().query(params,callback);
    },

    getStationsOrderedByTime: function(params,callback){
      return $resource('/station/get/limit/:limit/stationMustHaveAttachment/:mustHaveAttachment/visibility/:visibility/latitude/:latitude/longitude/:longitude/maxDistance/:distance/timestamp/:timestamp/sort/byTime/direction/:direction/lastId/:lastId', {
        mustHaveAttachment: '@id',
        limit: '@id',
        latitude: '@id',
        longitude: '@id',
        distance: '@id',
        timestamp: '@id',
        direction: '@id',
        visibility: '@id',
        lastId: '@id'
      }).query(params,callback);
    },


    getStationsOrderedByDistance: function(params,callback){
      return $resource('/station/get/stationMustHaveAttachment/:mustHaveAttachment/visibility/:visibility/latitude/:latitude/longitude/:longitude/maxDistance/:maxDistance/from/:fromDate/until/:untilDate/sort/byDistanceToPin/direction/:direction/limit/:limit/offset/:offset', {
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
    },


    
    
    getUsersOrderedByTime: function(params,callback){
      return $resource('/user/get/limit/:limit/userMustHaveAttachment/:mustHaveAttachment/visibility/:visibility/latitude/:latitude/longitude/:longitude/maxDistance/:distance/datetime/:datetime/sort/byTime/direction/:direction/', {
        mustHaveAttachment: '@id',
        limit: '@id',
        latitude: '@id',
        longitude: '@id',
        distance: '@id',
        datetime: '@id',
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
