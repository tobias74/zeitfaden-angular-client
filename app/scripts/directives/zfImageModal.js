'use strict';

/*global $:false */
/*global google:false */


angular.module('ZeitfadenApp').directive('zfStationImageModal',function(ResponsiveService,$modal,$log){
  return {
    restrict: 'EA',
    require: '?ngModel',
    replace:true,
    scope: false,
    templateUrl: 'app/views/directive-templates/station-image-modal.html', 
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
		
        var modalInstance = $modal.open({
          templateUrl: 'app/views/directive-templates/modal-station.html',
          controller: ModalStationInstanceCtrl,
          windowClass: "modal-station",
          resolve: {
            selectedStation: function(){
              return scope.selectedEntity;
            },
            controllerScope: function(){
              return scope;
            }
          }
        });
    
        modalInstance.result.then(function (selectedItem) {
          console.debug('when is this called ' +selectedItem);
          scope.selected = selectedItem;
        }, function () {
          //$log.info('Modal dismissed at: ' + new Date());
        });
		
	};
      



      $(element).find('.blocker-div-for-image').tgTouchEvent('longTap',  {}, longTapCallback);      
      $(element).find('.blocker-div-for-image').tgTouchEvent('tap',  {}, shortTapCallback);
      
     
     
    }
  };
});
