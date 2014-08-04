'use strict';

/*global $:false */
/*global google:false */


angular.module('ZeitfadenApp').directive('zfStationImageLonely',function(ResponsiveService,$log,$location){
  return {
    restrict: 'EA',
    require: '?ngModel',
    replace:true,
    scope: false,
    templateUrl: 'station-image-lonely.html', 
    link: function(scope,element,attrs,ngModel){
      
	var longTapCallback = function(){
        scope.$apply(function(){
          scope.setSelectedMapEntity(ngModel.$modelValue);
        });
		
	};      

	var shortTapCallback = function(){
        scope.$apply(function(){
          scope.setSelectedEntity(ngModel.$modelValue);
        });
		
        scope.$apply(function(){
        	$location.hash(ngModel.$modelValue.id);
        	$location.replace();
        });

		
        scope.$apply(function(){

		    var search = $location.search();
		    search.showLonelyEntity = true;
		    search.lonelyEntity = ngModel.$modelValue.stationId;
		    search.lonelyEntityOwner = ngModel.$modelValue.userId;
		    
		    $location.search(search);

        });
		
        //return scope.selectedEntity;
		
		
	};
      


//      $(element).find('.blocker-div-for-image').longpress(longTapCallback,shortTapCallback);      

      $(element).find('.blocker-div-for-image').tgTouchEvent('longTap',  {}, longTapCallback);      
      $(element).find('.blocker-div-for-image').tgTouchEvent('tap',  {}, shortTapCallback);
      
     
     
    }
  };
});
