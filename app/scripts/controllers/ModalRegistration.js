'use strict';

angular.module('ZeitfadenApp').controller('ModalRegistrationCtrl', 
['$scope','$modal','$log','LoginService',
function ($scope, $modal, $log, LoginService) {


  // Please note that $modalInstance represents a modal window (instance) dependency.
  // It is not the same as the $modal service used above.
  
  var ModalRegistrationInstanceCtrl = function ($scope, $modalInstance, items) {
  
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };
  
    $scope.isPerformingRegistration = false;    
  
    $scope.performRegistration = function(email,password,password_again){
      console.debug('email und password ' + email + password);
      var promise = $modalInstance.loginService.performRegistration(email,password,password_again);
      $scope.isPerformingRegistration = true;    
      
      promise.then(function(userId){
        $scope.isPerformingRegistration = false;    
        console.debug('inside the prmise success');
        $modalInstance.close($scope.selected.item);
      });    
    
      promise.catch(function(){
        $scope.isPerformingRegistration = false;    
        console.debug('inside the prmise error');
      });    
      
    };
  
    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };
  
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };



  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'myModalRegistration.html',
      controller: ModalRegistrationInstanceCtrl,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    
    modalInstance.loginService = LoginService;

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
}]);




