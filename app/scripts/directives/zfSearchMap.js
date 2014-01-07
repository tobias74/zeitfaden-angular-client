'use strict';

/*global $:false */
/*global google:false */


angular.module('ZeitfadenApp').directive('zfSearchMap',function(){
  return {
    restrict: 'EA',
    require: '?ngModel',
    scope:{
      myModel: '=ngModel',
      myStation: '=zfStation'
    },
    link: function(scope,element,attrs,ngModel){
      var mapOptions;
      var googleMap;
      var searchMarker;
      var stationMarker;
      var searchLatLng;
      
      
      ngModel.$render = function(){
        $(element).addClass('google-maps');
        
        searchLatLng = new google.maps.LatLng(scope.myModel.latitude, scope.myModel.longitude);

        mapOptions = {
            center: searchLatLng,
            zoom: scope.myModel.zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

        googleMap = new google.maps.Map($(element)[0],mapOptions);

        searchMarker = new google.maps.Marker({
          position: searchLatLng,
          map: googleMap,
          title: 'drag me to search!',
          draggable: true,
          animation:google.maps.Animation.DROP
        });
        
        google.maps.event.addListener(searchMarker, 'dragend', function(){
          scope.$apply(function(){
            scope.myModel.latitude = searchMarker.getPosition().lat();
            scope.myModel.longitude = searchMarker.getPosition().lng();
          });
        }.bind(this));
        
        
      };
      
      scope.$watch('myModel', function(){
        var myPosition = new google.maps.LatLng(scope.myModel.latitude, scope.myModel.longitude);
        searchMarker.setPosition(myPosition);
        googleMap.panTo(myPosition);
      }, true);
      
      scope.$watch('myStation', function(){
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
        
        googleMap.panTo(myPosition);
        
      };
    }
  };
});
