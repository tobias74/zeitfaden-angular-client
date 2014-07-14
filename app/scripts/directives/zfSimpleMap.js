'use strict';

/*global $:false */
/*global google:false */


angular.module('ZeitfadenApp').directive('zfSimpleMap',function(ResponsiveService){
  return {
    restrict: 'EA',
    require: '?ngModel',
    scope:{
      myStation: '=zfStation',
    },
    link: function(scope,element,attrs,ngModel){
      var mapOptions;
      var googleMap;
      var searchMarker;
      var stationMarker;
      
      
      $(element).addClass('google-maps');

      mapOptions = {
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scaleControl: true,
          disableDoubleClickZoom: true,
          draggable: ResponsiveService.shouldMapBeDraggable()
        };

      googleMap = new google.maps.Map($(element)[0],mapOptions);
      google.maps.event.trigger(googleMap, 'resize');

      
      scope.$watch('myStation', function(){
        console.debug('simple map got location change');
        showStationOnMap(scope.myStation);
      }, true);
      
      
      var showStationOnMap = function(station){
        if (!station) {
          return;
        }
        
        var myPosition = new google.maps.LatLng(station.startLatitude, station.startLongitude);

        if (stationMarker){
          stationMarker.setPosition(myPosition);
        }
        else {
          stationMarker = new google.maps.Marker({
            position: myPosition,
            map: googleMap,
            title: 'this is me!',
            draggable: false,
            animation:google.maps.Animation.DROP
          });
          
        }
        
        google.maps.event.trigger(googleMap, 'resize');
        googleMap.panTo(myPosition);
        
      };
    }
  };
});
