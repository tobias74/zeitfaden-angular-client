'use strict';

angular.module('ZeitfadenApp').factory('ResponsiveService', function(){
  return {
    shouldMapBeDraggable: function(){
      if (screen.width <= 767)
      {
        return false;
      }
      else 
      {
        return true;
      }
    },
    
    getAttachmentFormat: function(){
      if (window.innerWidth <= 767)
      {
        return 'square';
      }
      else
      {
        return '4by3';
      }
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
