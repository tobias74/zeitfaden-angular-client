'use strict';

/*global $:false */
/*global google:false */


angular.module('ZeitfadenApp').directive('zfTraceMap',function(){
  return {
    restrict: 'EA',
    require: '?ngModel',
    scope:{
      mySearchLocation: '=zfSearchLocation',
      myTraces: '=zfTraces',
      mySearchRadius: '=zfSearchRadius'
        
    },
    link: function(scope,element,attrs,ngModel){
      var mapOptions;
      var googleMap;
      var searchLatLng;
      var allFlightPaths = [];
      
      
      var distanceBetweenPoints = function(p1, p2) {
        if (!p1 || !p2) {
          return 0;
        }

        var R = 6371000; // Radius of the Earth in m
        var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
        var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
      };
      
      
      var removeAllFlightPaths = function(allFlightPaths){
        allFlightPaths.forEach(function(flightPath){
          flightPath.setMap(null);
          flightPath.set('zfStations',null);
        });
      };
      
      
      var getColorForUser = function(userId)
      {
        var red = (parseInt(userId.substring(6,8),16) % 255);
        var green = (parseInt(userId.substring(9,11),16) % 255);
        var blue = (parseInt(userId.substring(12),16) % 255);
        
        var returnString = "#" + "FF" + green.toString(16) + blue.toString(16);
        
        return "#ff0000";
        return returnString;
      };

      
      
      
      var paintPolylineByStations = function(polyStations)
      {
        
        if (polyStations.length === 0) return;
        
        var coordinates = [];
        
        coordinates.push(new google.maps.LatLng(polyStations[0].startLatitude, polyStations[0].startLongitude));
        
        polyStations.forEach(function(station){
          coordinates.push(new google.maps.LatLng(station.endLatitude, station.endLongitude));
        });

        
        var userId = polyStations[0].userId;
        var flightPath = new google.maps.Polyline({
          path: coordinates,
          strokeColor: getColorForUser(userId),
          strokeOpacity: 0.6,
          strokeWeight: 5.0
        });
        flightPath.setMap(googleMap);
        
        flightPath.set('zfStations',polyStations);
        flightPath.set('zfShowingMarkers', false);
        google.maps.event.addListener(flightPath, "click", function(event){
          console.debug('got the lcikc.');
          toggleMarkers(flightPath);
        });
        allFlightPaths.push(flightPath);
      };

      
      var toggleMarkers = function(flightPath){
        var polyStations = flightPath.get('zfStations');
        if (flightPath.get('zfShowingMarkers') === true)
        {
          polyStations.forEach(function(station){
            station.gmMarkers.forEach(function(marker){
              marker.setMap(null);
            });
          });
          flightPath.set('zfShowingMarkers', false);
        }
        else
        {
          polyStations.forEach(function(station){
            station.gmMarkers=[];
          });
          var marker;
          var myLatlng = new google.maps.LatLng(polyStations[0].endLatitude,polyStations[0].endLongitude);
          marker = new google.maps.Marker({
            position: myLatlng,
            map: googleMap,
            title: polyStations[0].startDate
          });
          polyStations[0].gmMarkers.push(marker);
          
          polyStations.forEach(function(station){
            var myLatlng = new google.maps.LatLng(station.endLatitude,station.endLongitude);
            marker = new google.maps.Marker({
              position: myLatlng,
              map: googleMap,
              title: station.endDate
            });
            station.gmMarkers.push(marker);
          });

          flightPath.set('zfShowingMarkers', true);
        }
      };


      scope.$watch('myTraces', function(){
        console.debug('change in my traces');
        removeAllFlightPaths(allFlightPaths);
        
        $.each(scope.myTraces, function(userId, stations){
          
          console.debug('working my round for userId ' + userId);
          
          var lineStations = [];
          var previousEndLatitude = 0;
          var previousEndLongitude = 0;
          
          stations.forEach(function(station){
            
            if (true && (station.startLatitude == previousEndLatitude) && (station.startLongitude == previousEndLongitude))
            {
              lineStations.push(station);
            }
            else
            {
              paintPolylineByStations(lineStations);
              lineStations = [];
              lineStations.push(station);
            }
            
            previousEndLatitude = station.endLatitude;
            previousEndLongitude = station.endLongitude;
              
          });

          paintPolylineByStations(lineStations);
        });
        
        console.debug('from within the tracemap');
        console.debug(scope.myTraces);
        console.debug('leaving my traces');
        
      }, true);


      scope.$watch('mySearchLocation', function(){
        var myPosition = new google.maps.LatLng(scope.mySearchLocation.latitude, scope.mySearchLocation.longitude);
        googleMap.panTo(myPosition);
      }, true);

      
      ngModel.$render = function(){
        $(element).addClass('google-maps');
        
        searchLatLng = new google.maps.LatLng(scope.mySearchLocation.latitude, scope.mySearchLocation.longitude);

        mapOptions = {
            center: searchLatLng,
            zoom: scope.mySearchLocation.zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

        googleMap = new google.maps.Map($(element)[0],mapOptions);
        
        
        var eventHandler = function(){
          console.debug('bounds changed.');
          scope.$apply(function(){
            var bounds = googleMap.getBounds();
            var radius = distanceBetweenPoints(googleMap.getCenter(), bounds.getNorthEast());
            scope.mySearchRadius = radius;
            scope.mySearchLocation.zoom = googleMap.getZoom();
            scope.mySearchLocation.latitude = googleMap.getCenter().lat();
            scope.mySearchLocation.longitude = googleMap.getCenter().lng();
          });
        };
        
        google.maps.event.addListener(googleMap, 'dragend', eventHandler);
        google.maps.event.addListener(googleMap, 'zoom_changed', eventHandler);
        google.maps.event.addListenerOnce(googleMap, 'idle', eventHandler);
        
        console.debug('This is my search-radius: ' + scope.mySearchRadius);
        
      };

      
    }
  };
});
