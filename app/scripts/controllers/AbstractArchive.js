'use strict';

angular.module('ZeitfadenApp').controller('AbstractArchiveCtrl', 
['$scope','ProtectedControllerData','$location','ResponsiveService','ScrollHistoryService',
function($scope,self,$location,ResponsiveService,ScrollHistoryService) {
  
  setTimeout(function(){
	  var someInput = document.getElementById('google-search-location');
	  var autocomplete = new google.maps.places.Autocomplete(someInput,{'types':['establishment']});
  	
  },3000);

  $scope.dataForVisibilitySelect = [
    {"visibility": 'public_only', "description": "Public"},
    {"visibility": 'my_own', "description": "Only mine"},
    {"visibility": 'pass_protected', "description": "Protected"}
  ];

  $scope.directiveData = {};

  $scope.searchLocation = {
    latitude: 13.0810, 
    longitude: 80.2740, 
    zoom: 14
  };

  ScrollHistoryService.setController(self);
  
  self.setHistoryEntities = function(data){
	  $scope.entities = data[self.entityName + 's'];
      self.scrollEndReached = data['scrollEndReached'];
  };
  
  self.loadEntities = function(){
    $scope.entities = [];
    $scope.loadMore();
  };

  
  $scope.entityListLoaded = function(){
  	ScrollHistoryService.unlockScrollHistory($scope.scrollingStatusId);
  	
  	if (ScrollHistoryService.hasScrollTop($scope.scrollingStatusId)){
  		ScrollHistoryService.restoreScrollTop($scope.scrollingStatusId);  
  	}
  };
  
  $scope.scrollCallback = function(val){
    ScrollHistoryService.setScrollTop($scope.scrollingStatusId, val);
  };
  
  
  $scope.searchGoogleLocation = function(request){
	var service = new google.maps.places.PlacesService($scope.directiveData.searchMapInstance);
	service.textSearch({query:request}, function(results,status){
		if (status === 'OK')
		{
			var place = results[0];
			$scope.$apply(function(){
				$scope.searchLocation.latitude = place.geometry.location.k;
				$scope.searchLocation.longitude = place.geometry.location.B;

			    self.digestChangedModelTemplateMethod();

			});
		}
	});  	
  	
  };
  
  
  self.onRouteUpdateTemplateMethod = function(myParams){
  	
  	window.stop();
  	
  	self.resetScrollStatus();   
  	
  	self.digestRouteParams(myParams);

    if (myParams.latitude && myParams.longitude){
      $scope.searchLocation.latitude = myParams.latitude;
      $scope.searchLocation.longitude = myParams.longitude;
      
    }
  	
  	
    self.digestRouteLonelyEntity(myParams);
  	
  	
    if (myParams.scrollingStatusId)
    {
      $scope.scrollingStatusId = myParams.scrollingStatusId;
      ScrollHistoryService.digestScrollingStatus(myParams.scrollingStatusId);
    }
  	
  };
  
  
  $scope.showLongSpacer = true;
  
  $scope.showLonelyEntity = false;
  
  $scope.toggleShowFullSettings = function(){
  	$scope.showFullSettings = !$scope.showFullSettings;
  };
  
  $scope.showFullSettings = false;
  
  self.scrollEndReached = false;       
  $scope.entities = [];
  $scope.isLoadingEntities = false;
  $scope.isSearchingLocation = false;
  $scope.selectedVisibility = $scope.dataForVisibilitySelect[0];

  $scope.getAttachmentFormat = ResponsiveService.getAttachmentFormat;       

  self.updateLocationSearch = function(search){
  	
  };
	
  self.digestChangedModelTemplateMethod = function(){
    self.resetScrollStatus();
    
    var search = $location.search();

    search.latitude = $scope.searchLocation.latitude;
    search.longitude = $scope.searchLocation.longitude;
    search.searchVisibility = $scope.selectedVisibility.visibility;
	
	  self.updateLocationSearch(search);
    
    search.scrollingStatusId = 'zf-ls-' + new Date().getTime();
    $location.search(search);
  };

  self.introduceNewScrollingId = function(){
    var search = $location.search();
    search.scrollingStatusId = 'zf-newls-' + new Date().getTime();
    $location.search(search);
  };

  self.digestRouteParams = function(myParams){

    if (myParams.searchVisibility){
      $scope.selectedVisibility = $.grep($scope.dataForVisibilitySelect,function(n,i){
        return (n.visibility == myParams.searchVisibility);
      })[0];
    }
    else {
      $scope.selectedVisibility = $scope.dataForVisibilitySelect[0];
    }

    if (!$scope.selectedVisibility){
      $scope.selectedVisibility = $scope.dataForVisibilitySelect[0];
    }


  };

  self.digestRouteLonelyEntity = function(myParams){
    if (myParams.showLonelyEntity){
      $scope.lonelyEntity = myParams.lonelyEntity;
      $scope.lonelyEntityOwner = myParams.lonelyEntityOwner;
      $scope.showLonelyEntity = true;
    }
    else {
      $scope.showLonelyEntity = false;
    }
  };

  
  $scope.setToCurrentLocation = function(callback) {
    $scope.isSearchingLocation = true;
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        $scope.searchLocation.latitude = position.coords.latitude;
        $scope.searchLocation.longitude = position.coords.longitude;
        $scope.isSearchingLocation = false;
        //$scope.selectedRange = $scope.dataForRangeSelect[1];
        self.digestChangedModelTemplateMethod();
        callback && callback();
      });
    });  
  };

  $scope.changedDistance = function(){
    self.digestChangedModelTemplateMethod();
  };

  $scope.changedVisibility = function(){
    self.digestChangedModelTemplateMethod();
  };

  $scope.changedDate = function(){
    $scope.$apply(function(){
      self.digestChangedModelTemplateMethod();
    });
  };

  $scope.changedLocation = function(){
    $scope.$apply(function(){
      self.digestChangedModelTemplateMethod();
    });
  };

  $scope.clickedLoad = function(){
    self.digestChangedModelTemplateMethod();    
  };
  
  $scope.$on('$routeUpdate', function(next, current) { 
    self.onRouteUpdateTemplateMethod($location.search());
  });  
  
  $scope.clickedLoad = function(){
    self.digestChangedModelTemplateMethod();    
  };
  
  $scope.scrolledForMore = function(callback){
    if (self.scrollEndReached)
    {
      console.debug('scroll end reached');
      return;
    }
    if (!$scope.isLoadingEntities)
    {
      $scope.loadMore(callback);
    }
  };
  
  $scope.setSelectedEntity = function(val){
    $scope.selectedEntity = val;
  };

  $scope.setSelectedMapEntity = function(val){
    $scope.selectedMapEntity = val;
  };


  $scope.activateNextEntity = function(){
    $scope.selectedEntity = _.succeeding($scope.entities, $scope.selectedEntity);
  };

  $scope.activatePreviousEntity = function(){
    $scope.selectedEntity = _.preceding($scope.entities, $scope.selectedEntity);
  };
  
  
  
  
  // only for the Archives
  
  $scope.dataForRangeSelect = [
    {"range": 2, "description": "2m"},
    {"range": 10, "description": "10m"},
    {"range": 100, "description": "100m"},
    {"range": 500, "description": "500m"},
    {"range": 1000, "description": "1km"},
    {"range": 10000, "description": "10km"},
    {"range": 100000, "description": "100km"},
    {"range": 1000000, "description": "1000km"},
    {"range": 10000000, "description": "10000km"},
    {"range": 100000000, "description": "100000km"}
  ];

  $scope.selectedRange = $scope.dataForRangeSelect[3];  
  
  $scope.searchSpec = {};
  $scope.searchSpec.showBigImages = true;

  $scope.searchSpec.searchDate = new Date();

  $scope.dataForTimeOrderingSelect = [
    {"order": 'intoThePast', "description": "Into the Past"},
    {"order": 'intoTheFuture', "description": "Into the Future"}
  ];

  $scope.searchSpec.selectedTimeOrdering = $scope.dataForTimeOrderingSelect[0];
  
  self.digestSingleTime = function(myParams){
    if (myParams.searchDirection){
      $scope.searchSpec.selectedTimeOrdering = $.grep($scope.dataForTimeOrderingSelect,function(n,i){
        return (n.order == myParams.searchDirection);
      })[0];
    }
    else {
      $scope.searchSpec.selectedTimeOrdering = $scope.dataForTimeOrderingSelect[0];
    }
    if (!$scope.searchSpec.selectedTimeOrdering){
      $scope.searchSpec.selectedTimeOrdering = $scope.dataForTimeOrderingSelect[0];
    }
    
    if (myParams.searchDate){
      $scope.searchSpec.searchDate = new Date(myParams.searchDate);
    }
    else {
      $scope.searchSpec.searchDate = new Date();
    }    
  };

  $scope.changedTimeOrdering = function(){
    console.debug('changed time ordering');
    self.digestChangedModelTemplateMethod();
  };

  self.digestRadius = function(myParams){
    if (myParams.radius){
      $scope.selectedRange = $.grep($scope.dataForRangeSelect,function(n,i){
        return (n.range == myParams.radius);
      })[0];
    }
    else {
      $scope.selectedRange = $scope.dataForRangeSelect[3];
    }
  	
  };
  
  
  
  
// only for the distance search, both stations und users
  $scope.limit=100;
  $scope.offset=0;
  $scope.searchSpec.fromDate = new Date();
  $scope.searchSpec.untilDate = new Date();
  $scope.searchDirection = "nearFirst"; //farFirst

  self.digestTwoTimes = function(myParams){
    if (myParams.fromDate){
      $scope.searchSpec.fromDate = new Date(myParams.fromDate);
    }
    else {
      $scope.searchSpec.fromDate = new Date();
    }

    if (myParams.untilDate){
      $scope.searchSpec.untilDate = new Date(myParams.untilDate);
    }
    else {
      $scope.searchSpec.untilDate = new Date();
    }
  };  
  
  
  
}]);
