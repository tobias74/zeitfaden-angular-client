'use strict';

/*global $:false */
/*global google:false */


angular.module('ZeitfadenApp').directive('zfTraceMap',function(){
  return {
    restrict: 'EA',
    require: '?ngModel',
    scope:{
      mySearchLocation: '=zfSearchLocation',
      myStation: '=zfStation',
      myTraces: '=zfTraces',
      mySearchRadius: '=zfSearchRadius'
        
    },
    link: function(scope,element,attrs,ngModel){
      var mapOptions;
      var googleMap;
      var stationMarker;
      var searchLatLng;
      var distanceWidget;
      
      scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
          if(fn && (typeof(fn) === 'function')) {
            fn();
          }
        } else {
          this.$apply(fn);
        }
      };      
      
      var DistanceWidget = function(map,myDistance){
        this.set('map', map);
        this.set('position', map.getCenter());

        var marker = new google.maps.Marker({
          draggable: true,
          title: 'Move me!'
        });

        // Bind the marker map property to the DistanceWidget map property
        marker.bindTo('map', this);

        // Bind the marker position property to the DistanceWidget position
        // property
        marker.bindTo('position', this);
        
        // Create a new radius widget
        var radiusWidget = new RadiusWidget(myDistance);

        // Bind the radiusWidget map to the DistanceWidget map
        radiusWidget.bindTo('map', this);

        // Bind the radiusWidget center to the DistanceWidget position
        radiusWidget.bindTo('center', this, 'position');        
        
        // Bind to the radiusWidgets' distance property
        this.bindTo('distance', radiusWidget);

        // Bind to the radiusWidgets' bounds property
        this.bindTo('bounds', radiusWidget);        
        
      };
      DistanceWidget.prototype = new google.maps.MVCObject();
      
      
      var RadiusWidget = function(myDistance){
        var circle = new google.maps.Circle({
          strokeColor: "#c3fc49",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#c3fc49",
          fillOpacity: 0.05
        });

        // Set the distance property value, default to 50km.
        this.set('distance', myDistance);

        // Bind the RadiusWidget bounds property to the circle bounds property.
        this.bindTo('bounds', circle);

        // Bind the circle center to the RadiusWidget center property
        circle.bindTo('center', this);

        // Bind the circle map to the RadiusWidget map
        circle.bindTo('map', this);

        // Bind the circle radius property to the RadiusWidget radius property
        circle.bindTo('radius', this);
        
        this.addSizer_();
      };
      RadiusWidget.prototype = new google.maps.MVCObject();
      RadiusWidget.prototype.distance_changed = function() {
        this.set('radius', this.get('distance') );
      };
      RadiusWidget.prototype.addSizer_ = function() {
        var sizer = new google.maps.Marker({
          draggable: true,
          title: 'Drag me!'
        });

        sizer.bindTo('map', this);
        sizer.bindTo('position', this, 'sizer_position');
        
        var me = this;
        google.maps.event.addListener(sizer, 'drag', function() {
          // Set the circle distance (radius)
          me.setDistance();
        });
      };      
      RadiusWidget.prototype.center_changed = function() {
        var bounds = this.get('bounds');

        // Bounds might not always be set so check that it exists first.
        if (bounds) {
          var lng = bounds.getNorthEast().lng();

          // Put the sizer at center, right on the circle.
          var position = new google.maps.LatLng(this.get('center').lat(), lng);
          this.set('sizer_position', position);
        }
      };      
      RadiusWidget.prototype.distanceBetweenPoints_ = function(p1, p2) {
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
      RadiusWidget.prototype.setDistance = function() {
        // As the sizer is being dragged, its position changes.  Because the
        // RadiusWidget's sizer_position is bound to the sizer's position, it will
        // change as well.
        var pos = this.get('sizer_position');
        var center = this.get('center');
        var distance = this.distanceBetweenPoints_(center, pos);

        // Set the distance property for any objects that are bound to it
        this.set('distance', distance);
      };      
      
      
      ngModel.$render = function(){
        $(element).addClass('google-maps');
        
        searchLatLng = new google.maps.LatLng(scope.mySearchLocation.latitude, scope.mySearchLocation.longitude);

        mapOptions = {
            center: searchLatLng,
            zoom: scope.mySearchLocation.zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

        googleMap = new google.maps.Map($(element)[0],mapOptions);

        
        console.debug('This is my search-radius: ' + scope.mySearchRadius);
        
        
        distanceWidget = new DistanceWidget(googleMap,scope.mySearchRadius);

        
        google.maps.event.addListener(distanceWidget, 'distance_changed', function() {
          scope.safeApply(function(){
            scope.mySearchRadius = distanceWidget.get('distance');
          });
        }.bind(this));

        google.maps.event.addListener(distanceWidget, 'position_changed', function() {
          scope.safeApply(function(){
            var position = distanceWidget.get('position');
            scope.mySearchLocation.latitude = position.lat();
            scope.mySearchLocation.longitude = position.lng();
          });
        }.bind(this));        
        
      };
      
      scope.$watch('mySearchLocation', function(){
        var myPosition = new google.maps.LatLng(scope.mySearchLocation.latitude, scope.mySearchLocation.longitude);
        distanceWidget.set('position',myPosition);
        //googleMap.panTo(myPosition);
      }, true);

      scope.$watch('mySearchRadius', function(){
        distanceWidget.set('distance',scope.mySearchRadius);
      }, true);
      
      scope.$watch('myStation', function(){
        showStationOnMap(scope.myStation);
      }, true);

      scope.$watch('myTraces', function(){
        
        var paintPolyline = function(coordinates)
        {
          var flightPath = new google.maps.Polyline({
            path: coordinates,
            strokeColor: '#FF0000',
            strokeCapacity: 1.0,
            strokeWeight: 1.0
          });
          flightPath.setMap(googleMap);
          
        };
        
        $.each(scope.myTraces, function(userId, stations){
          
          
          var coordinates = [];
          var previousEndLatitude = 0;
          var previousEndLongitude = 0;
          
          stations.forEach(function(station){
            if ((station.startLatitude == previousEndLatitude) && (station.startLongitude == previousEndLongitude))
            {
              coordinates.push(new google.maps.LatLng(station.endLatitude, station.endLongitude));
            }
            else
            {
              paintPolyline(coordinates);
              coordinates = [];
              coordinates.push(new google.maps.LatLng(station.startLatitude, station.startLongitude));
              coordinates.push(new google.maps.LatLng(station.endLatitude, station.endLongitude));
            }
            
            previousEndLatitude = station.endLatitude;
            previousEndLongitude = station.endLongitude;
              
          });
          paintPolyline(coordinates);
          
        });
        
        //console.debug('from within the tracemap');
        //console.debug(scope.myTraces);
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
