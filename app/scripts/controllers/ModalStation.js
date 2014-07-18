// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalStationInstanceCtrl = function (ResponsiveService, $scope, $modalInstance, controllerScope) {

    $scope.getAttachmentFormat = ResponsiveService.getAttachmentFormat;       

	console.debug('thi is the selected station');
	console.debug(controllerScope.selectedEntity);
	
	
  $scope.controllerScope = controllerScope;
  
	
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};