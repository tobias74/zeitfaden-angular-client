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
    template:'<div style="width:100%;height:90%;" class="search_map_div"></div><div class="hidden-xs" style="width:100%;"class="search_input_div"><input style="width:100%;" class="search_input" zf-enter="searchGoogleLocation(searchGoogleText)" ng-model="searchGoogleText" class="location-search-input" type="text"></div>',
    scope:{
      myModel: '=ngModel',
      myStation: '=zfStation',
      myShowFullSettings: '=zfShowFullSettings',
      myFullSettingsCallback: '=zfOnChangedFullSettings',
      myRequestLocationCallback: '=zfRequestLocationCallback',
      myIsSearchingLocation: '=zfIsSearchingLocation',
      mySearchMapInstance: '=zfSearchMapInstance',
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
      
      // copy paste from stackoverflow
      
      
      
      function LongPress(map, length) {
        this.length_ = length;
        var me = this;
        me.map_ = map;
        me.timeoutId_ = null;
        me.didTriggerLongPress = false;
        google.maps.event.addListener(map, 'mousedown', function(e) {
          me.didTriggerLongPress = false;
          me.onMouseDown_(e);
        });
        google.maps.event.addListener(map, 'mouseup', function(e) {
          me.onMouseUp_(e);
          if (me.didTriggerLongPress){
            //alert('I would like to stop the propagation now.');
            e.preventDefault();
          }
        });
        google.maps.event.addListener(map, 'drag', function(e) {
          me.onMapDrag_(e);
        });
      };
      LongPress.prototype.onMouseUp_ = function(e) {
        clearTimeout(this.timeoutId_);
      };
      LongPress.prototype.onMouseDown_ = function(e) {
        clearTimeout(this.timeoutId_);
        var map = this.map_;
        var event = e;
        var me = this;
        this.timeoutId_ = setTimeout(function() {
          google.maps.event.trigger(map, 'longpress', event);
          me.didTriggerLongPress = true;
        }, this.length_);
      };
      LongPress.prototype.onMapDrag_ = function(e) {
        clearTimeout(this.timeoutId_);
      };
      
      
      // end copy paste from stack overflow
      
      
      
      
      
      
      
      
      ngModel.$render = function(){
      	
        $(element).addClass('google-maps');
        
        searchLatLng = new google.maps.LatLng(scope.myModel.latitude, scope.myModel.longitude);


        var mapStyles = [
          {
            featureType: "poi",
            stylers: [
              { visibility: "off" }
            ]
          }
        ];
        
        var styledMap = new google.maps.StyledMapType(mapStyles,
          {name: "Styled Map"});



        mapOptions = {
            center: searchLatLng,
            zoom: scope.myModel.zoom,
            mapTypeControlOptions: {
              mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            },
            
            //mapTypeId: google.maps.MapTypeId.ROADMAP,
            scaleControl: true,
            disableDoubleClickZoom: true,
            streetViewControl: false,
            draggable: ResponsiveService.shouldMapBeDraggable()
          };

        console.debug('making the maps');
        var domElementForMap = $(element).find('.search_map_div');
        console.debug(domElementForMap);
        googleMap = new google.maps.Map(domElementForMap[0],mapOptions);
        googleMap.mapTypes.set('map_style', styledMap);
        googleMap.setMapTypeId('map_style');
        console.debug('done making the maps');
        
        scope.mySearchMapInstance = googleMap;
        window.tobiasmap = googleMap;
        //new LongPress(googleMap, 500);            
        
        
        google.maps.event.trigger(googleMap, 'resize');

		    //customMapController = addCustomControlls(googleMap,scope);
		    locateController = addLocateControlls(googleMap,scope);
		    //freeMapController = addFreeMapControlls(googleMap,scope);

        console.debug('before the marker');
        searchMarker = new google.maps.Marker({
          position: searchLatLng,
          map: googleMap,
          title: 'drag me to search!',
          draggable: true,
          animation:google.maps.Animation.DROP
        });
        
        
        console.debug('after the marker');
        
        google.maps.event.addListener(searchMarker, 'dragend', function(){
          console.debug('dragend event');
          scope.$apply(function(){
            scope.myModel.latitude = searchMarker.getPosition().lat();
            scope.myModel.longitude = searchMarker.getPosition().lng();
          });
          scope.myChangedMarkerCallback();
        }.bind(this));



        google.maps.event.addListener(googleMap, 'click', function(event){
          console.debug('click event');
          event.stop();
          scope.$apply(function(){
            scope.myFullSettingsCallback();
          });
          scope.$apply(function(){
            scope.mapIsFree = scope.myShowFullSettings;
          });


          google.maps.event.trigger(googleMap, 'resize');
          
          var myPosition = new google.maps.LatLng(scope.myModel.latitude, scope.myModel.longitude);
          googleMap.panTo(myPosition);
        }.bind(this));


        google.maps.event.addListener(googleMap, 'dblclick', function(event){
          console.debug('dnbl click event');
          searchMarker.setPosition(event.latLng);
          scope.$apply(function(){
            scope.myModel.latitude = searchMarker.getPosition().lat();
            scope.myModel.longitude = searchMarker.getPosition().lng();
          });
          scope.myChangedMarkerCallback();
        }.bind(this));

/*
        google.maps.event.addListener(googleMap, 'longpress', function(event){
          searchMarker.setPosition(event.latLng);
          scope.$apply(function(){
            scope.myModel.latitude = searchMarker.getPosition().lat();
            scope.myModel.longitude = searchMarker.getPosition().lng();
          });
          scope.myChangedMarkerCallback();
        }.bind(this));
*/
        
        
        var domElementForSearchInput = $(element).find('.search_input');
        var autocomplete = new google.maps.places.Autocomplete(domElementForSearchInput[0],{'types':['establishment']});
          
        
        
      };


      scope.searchGoogleLocation = function(request){
        var service = new google.maps.places.PlacesService(googleMap);
        service.textSearch({query:request}, function(results,status){
          if (status === 'OK')
          {
            var place = results[0];
            scope.$apply(function(){
              scope.myModel.latitude = place.geometry.location.lat();
              scope.myModel.longitude = place.geometry.location.lng();
            });
            scope.myChangedMarkerCallback();
          }
        });   
      };

 

      scope.$watch('myModel', function(){
        console.debug('watching my model in search map');
        var myPosition = new google.maps.LatLng(scope.myModel.latitude, scope.myModel.longitude);
        searchMarker.setPosition(myPosition);
        googleMap.panTo(myPosition);
        
      }, true);
 
      scope.$watch('myStation', function(){
        console.debug('show my station');
        showStationOnMap(scope.myStation);
      }, true);

      
      scope.$watch('myShowFullSettings', function(){
      	//customMapController.setShowFullSettings(scope.myShowFullSettings);
      }, true);
      
      scope.$watch('myIsSearchingLocation', function(){
      	locateController.setIsLocating(scope.myIsSearchingLocation);
      }, true);
      
      scope.$watch('mapIsFree', function(){
      	//freeMapController.setIsFree(scope.mapIsFree);
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
        
        console.debug('before resize');
        google.maps.event.trigger(googleMap, 'resize');
        console.debug('after resize');
        googleMap.panTo(myPosition);
        
      };
    }
  };
});
