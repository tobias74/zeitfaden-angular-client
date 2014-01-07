'use strict';

/*global $:false */

angular.module('ZeitfadenApp').directive('zfDatePicker',function(){
  return {
    restrict: 'EA',
    require: '?ngModel',
    scope:{
      myModel: '=ngModel'
    },
    link: function(scope,element,attrs,ngModel){

      var datepicker;
      var optionsObj = {
        onSelect: function(dateText, inst){
          console.debug('we got the onsleect. ' + inst);
          scope.$apply(function(){
            scope.myModel = new Date(dateText);
          });
        }
      };

      datepicker = $(element).datepicker(optionsObj);
      
      
      ngModel.$render = function(){
        //console.debug('inside $render with ' + ngModel.$viewValue);
        //$(element).datepicker('setDate',new Date(ngModel.$viewValue || ''));
      };
      
      scope.$watch('myModel', function(value){
        console.debug('we got notified in watch about ' + value + ' and the thing is ' + scope.myModel);
        //console.debug(datepicker.datepicker('getDate'));
        datepicker.datepicker('setDate', scope.myModel);
        datepicker.datepicker('refresh');
        //console.debug(datepicker.datepicker('getDate'));
      });
      
      
    }
  };
});
