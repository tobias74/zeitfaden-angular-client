'use strict';

angular.module('ZeitfadenApp').factory('StationService', function($resource){
  return {
    getByQuery: function(query, callback){
      return $resource('/station/getByQUery/query/:query', {query:'@id'}).query({query:query},callback);
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
