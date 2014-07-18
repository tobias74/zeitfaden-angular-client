'use strict';

/*global $:false */
/*global google:false */


angular.module('ZeitfadenApp').directive('zfStationImageModal',function(ResponsiveService,$modal,$log){
  return {
    restrict: 'EA',
    require: '?ngModel',
    scope: false,
    link: function(scope,element,attrs,ngModel){
      
      $(element).click(function(){
        
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
        
      });
      

      
     
     
      /*      
      scope.$watch('myModel', function(){
        
      }, true);
      
      scope.$watch('myStation', function(){
        
      }, true);
      */
    }
  };
});
