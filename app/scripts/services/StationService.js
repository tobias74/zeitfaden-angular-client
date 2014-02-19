'use strict';

angular.module('ZeitfadenApp').factory('StationService', function($resource){
  return {
    getByQuery: function(query, callback){
      return $resource('/station/getByQUery/query/:query', {query:'@id'}).query({query:query},callback);
    },
    getStationsOrderedByTime: function(params,callback){
      
      return $resource('/station/get/mustHaveAttachment/:mustHaveAttachment/latitude/:latitude/longitude/:longitude/distance/:distance/datetime/:datetime/sort/:sort/direction/:direction/lastId/:lastId', {
        mustHaveAttachment: '@id',
        latitude: '@id',
        longitude: '@id',
        distance: '@id',
        datetime: '@id',
        sort: '@id',
        direction: '@id',
        lastId: '@id'
      }).query(params,callback);
    },
    getStationsByQuery: function(query, callback){
      return $resource('/station/getByQuery/query/:query', {query:'@id'}).query({query:query},callback);
    },
    getUsersByQuery: function(query, callback){
      return $resource('/user/getByQuery/query/:query', {query:'@id'}).query({query:query},callback);
    }
  };
  
});



/*
angular.module('stationServices', ['ngResource']).
factory('StationsByQuery', function($resource){
  return $resource('/getStationsByQuery/:query', {query:'@id'});
});
*/
