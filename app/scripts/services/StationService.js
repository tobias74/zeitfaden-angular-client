'use strict';

angular.module('ZeitfadenApp').factory('StationService', function($resource){
  return {
    getByQuery: function(query, callback){
      return $resource('/getStationsByQuery/:query', {query:'@id'}).query({query:query},callback);
    },
    getStationsByQuery: function(query, callback){
      return $resource('/getStationsByQuery/:query', {query:'@id'}).query({query:query},callback);
    },
    getUsersByQuery: function(query, callback){
      return $resource('/getUsersByQuery/:query', {query:'@id'}).query({query:query},callback);
    }
  };
  
});



/*
angular.module('stationServices', ['ngResource']).
factory('StationsByQuery', function($resource){
  return $resource('/getStationsByQuery/:query', {query:'@id'});
});
*/
