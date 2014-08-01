'use strict';

/*global $:false */
/*global google:false */


angular.module('ZeitfadenApp').directive('zfSearchMap',function(ResponsiveService){

	var HomeControl = function(controlDiv, map, scope) {
	
	  // Set CSS styles for the DIV containing the control
	  // Setting padding to 5 px will offset the control
	  // from the edge of the map
	  controlDiv.style.padding = '5px';
	
	  // Set CSS for the control border
	  var controlUI = document.createElement('div');
	  controlUI.style.backgroundColor = '#fcfcfc';
	  controlUI.style.border = '1px solid #aaaaaa';
	  controlUI.style.cursor = 'pointer';
	  controlUI.style.marginTop = '1px';
	  controlUI.style.textAlign = 'center';
	  controlUI.title = 'Click to set the map to Home';
	  controlDiv.appendChild(controlUI);
	
	  // Set CSS for the control interior
	  var controlText = document.createElement('div');
	  controlText.style.fontFamily = 'Arial,sans-serif';
	  controlText.style.fontSize = '11px';
	  controlText.style.paddingTop = '1px';
	  controlText.style.paddingLeft = '4px';
	  controlText.style.paddingRight = '4px';
	  controlText.innerHTML = '<b>Home</b>';
	  controlUI.appendChild(controlText);
	
	  google.maps.event.addDomListener(controlUI, 'click', function() {
	  	scope.$apply(function(){
	  		scope.myFullSettingsCallback();		
	  	});
	  });
	  
	  this.setShowFullSettings = function(val){
	  	console.debug('insde the very controller ' + val);
	  	if (val == true){
	  		controlText.innerHTML = '<b>Small Map</b>';
	  	}
	  	else {
	  		controlText.innerHTML = '<b>Big Map</b>';
	  	}
	  };
	  
	
	};

	var addCustomControlls = function(map,scope) {

	  // Create the DIV to hold the control and
	  // call the HomeControl() constructor passing
	  // in this DIV.
	  var homeControlDiv = document.createElement('div');
	  var homeControl = new HomeControl(homeControlDiv, map,scope);
	  homeControlDiv.index = 1;

	  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(homeControlDiv);
	  
	  return homeControl;
	};







	var FreeMapControl = function(controlDiv, map, scope) {
	
	  // Set CSS styles for the DIV containing the control
	  // Setting padding to 5 px will offset the control
	  // from the edge of the map
	  controlDiv.style.padding = '5px';
	
	  // Set CSS for the control border
	  var controlUI = document.createElement('div');
	  controlUI.style.backgroundColor = '#fcfcfc';
	  controlUI.style.border = '1px solid #aaaaaa';
	  controlUI.style.cursor = 'pointer';
	  controlUI.style.marginTop = '1px';
	  controlUI.style.textAlign = 'center';
	  controlUI.title = 'Click to set the map to Home';
	  controlDiv.appendChild(controlUI);
	
	  // Set CSS for the control interior
	  var controlText = document.createElement('div');
	  controlText.style.fontFamily = 'Arial,sans-serif';
	  controlText.style.fontSize = '11px';
	  controlText.style.paddingTop = '1px';
	  controlText.style.paddingLeft = '4px';
	  controlText.style.paddingRight = '4px';
	  controlText.innerHTML = '<b>Here!</b>';
	  controlUI.appendChild(controlText);
	
	  google.maps.event.addDomListener(controlUI, 'click', function() {
	  	console.debug('request to loocate');
	  	scope.$apply(function(){
		  	scope.mapIsFree = !scope.mapIsFree;
	  	});
	  });
	  
	  this.setIsFree = function(val){
	  	console.debug('insde the very controller ' + val);
	  	if (val == true){
	  		controlText.innerHTML = '<b>fixed map</b>';
	  	}
	  	else {
	  		controlText.innerHTML = '<b>free map</b>';
	  	}
	  };
	  
	
	};
	
	var addFreeMapControlls = function(map,scope) {

	  // Create the DIV to hold the control and
	  // call the HomeControl() constructor passing
	  // in this DIV.
	  var homeControlDiv = document.createElement('div');
	  var homeControl = new FreeMapControl(homeControlDiv, map,scope);
	  homeControlDiv.index = 1;

	  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(homeControlDiv);
	  
	  return homeControl;
	};











	var LocateControl = function(controlDiv, map, scope) {
	
	  // Set CSS styles for the DIV containing the control
	  // Setting padding to 5 px will offset the control
	  // from the edge of the map
	  controlDiv.style.padding = '5px';
	
	  // Set CSS for the control border
	  var controlUI = document.createElement('div');
	  controlUI.style.backgroundColor = '#fcfcfc';
	  controlUI.style.border = '1px solid #aaaaaa';
	  controlUI.style.cursor = 'pointer';
	  controlUI.style.marginTop = '1px';
	  controlUI.style.textAlign = 'center';
	  controlUI.title = 'Click to set the map to Home';
	  controlDiv.appendChild(controlUI);
	
	  // Set CSS for the control interior
	  var controlText = document.createElement('div');
	  controlText.style.fontFamily = 'Arial,sans-serif';
	  controlText.style.fontSize = '11px';
	  controlText.style.paddingTop = '1px';
	  controlText.style.paddingLeft = '4px';
	  controlText.style.paddingRight = '4px';
	  controlText.innerHTML = '<b>Here!</b>';
	  controlUI.appendChild(controlText);
	
	  google.maps.event.addDomListener(controlUI, 'click', function() {
	  	console.debug('request to loocate');
	  	scope.$apply(function(){
		  	scope.myRequestLocationCallback();
	  	});
	  });
	  
	  this.setIsLocating = function(val){
	  	console.debug('insde the very controller ' + val);
	  	if (val == true){
	  		controlText.innerHTML = '<b>locating...</b>';
	  	}
	  	else {
	  		controlText.innerHTML = '<b>locate me</b>';
	  	}
	  };
	  
	
	};
	




	var addLocateControlls = function(map,scope) {

	  // Create the DIV to hold the control and
	  // call the HomeControl() constructor passing
	  // in this DIV.
	  var locateControlDiv = document.createElement('div');
	  var locateControl = new LocateControl(locateControlDiv, map,scope);
	  locateControlDiv.index = 1;
	  
	  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locateControlDiv);
	  
	  return locateControl;
	};

	
	
	
  return {
    restrict: 'EA',
    require: '?ngModel',
    scope:{
      myModel: '=ngModel',
      myStation: '=zfStation',
      myShowFullSettings: '=zfShowFullSettings',
      myFullSettingsCallback: '=zfOnChangedFullSettings',
      myRequestLocationCallback: '=zfRequestLocationCallback',
      myIsSearchingLocation: '=zfIsSearchingLocation',
      myChangedMarkerCallback: '=zfOnChangeMarker'
    },
    link: function(scope,element,attrs,ngModel){
      var mapOptions;
      var googleMap;
      var searchMarker;
      var stationMarker;
      var searchLatLng;
      var customMapController;
      var locateController;
      var freeMapController;
      
      scope.mapIsFree = false;
      
      ngModel.$render = function(){
      	
        $(element).addClass('google-maps');
        
        searchLatLng = new google.maps.LatLng(scope.myModel.latitude, scope.myModel.longitude);

        mapOptions = {
            center: searchLatLng,
            zoom: scope.myModel.zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scaleControl: true,
            disableDoubleClickZoom: true,
            draggable: ResponsiveService.shouldMapBeDraggable()
          };

        googleMap = new google.maps.Map($(element)[0],mapOptions);
        google.maps.event.trigger(googleMap, 'resize');

		customMapController = addCustomControlls(googleMap,scope);
		locateController = addLocateControlls(googleMap,scope);
		freeMapController = addFreeMapControlls(googleMap,scope);

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
          scope.myChangedMarkerCallback();
        }.bind(this));

        google.maps.event.addListener(googleMap, 'dblclick', function(event){
          searchMarker.setPosition(event.latLng);
          scope.$apply(function(){
            scope.myModel.latitude = searchMarker.getPosition().lat();
            scope.myModel.longitude = searchMarker.getPosition().lng();
          });
          scope.myChangedMarkerCallback();
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

      
      scope.$watch('myShowFullSettings', function(){
      	customMapController.setShowFullSettings(scope.myShowFullSettings);
      }, true);
      
      scope.$watch('myIsSearchingLocation', function(){
      	locateController.setIsLocating(scope.myIsSearchingLocation);
      }, true);
      
      scope.$watch('mapIsFree', function(){
      	freeMapController.setIsFree(scope.mapIsFree);
      	googleMap.setOptions({'draggable':scope.mapIsFree});
      }, true);
      
      
      var showStationOnMap = function(station){
        if (!station) {
        	console.debug('no station to pan to in search map');
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
