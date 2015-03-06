'use strict';

/*global $:false */

angular.module('ZeitfadenApp').directive('zfDatePicker',function(){
  return {
    restrict: 'EA',
    require: '?ngModel',
    scope:{
      myModel: '=ngModel',
      myDateChangeCallback : '=onDateChange'
    },
    link: function(scope,element,attrs,ngModel){

      var datepicker;
      var optionsObj = {
        onSelect: function(dateText, inst){
          scope.$apply(function(){
            scope.myModel = new Date(dateText);
          });
          scope.myDateChangeCallback && scope.myDateChangeCallback();
        }
      };

      datepicker = $(element).datepicker(optionsObj);
      
      
      ngModel.$render = function(){
        //console.debug('inside $render with ' + ngModel.$viewValue);
        //$(element).datepicker('setDate',new Date(ngModel.$viewValue || ''));
      };
      
      scope.$watch('myModel', function(value){
        datepicker.datepicker('setDate', scope.myModel);
        datepicker.datepicker('refresh');
      });
      
      
    }
  };
});
