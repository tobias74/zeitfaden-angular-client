'use strict';

/*global $:false */

angular.module('ZeitfadenApp').directive('zfDateTimeInput',function(){
  return {
    restrict: 'EA',
    require: '?ngModel',
    templateUrl: 'app/views/directive-templates/zf-date-time-input.html', 
    scope:{
      myModel: '=ngModel'
    },
    link: function(scope,element,attrs,ngModel){
      var i;
      
      for (i=1; i<=31; i++){
        $(element).find('.day_selector').append($('<option>',{
          value: i,
          text: i
        }));
      }

      for (i=1; i<=12; i++){
        $(element).find('.month_selector').append($('<option>',{
          value: i,
          text: i
        }));
      }


      for (i=1900; i<=2015; i++){
        $(element).find('.year_selector').append($('<option>',{
          value: i,
          text: i
        }));
      }
      

      for (i=0; i<=23; i++){
        $(element).find('.hour_selector').append($('<option>',{
          value: i,
          text: i
        }));
      }

      for (i=1; i<=59; i++){
        $(element).find('.minute_selector').append($('<option>',{
          value: i,
          text: i
        }));
      }

      for (i=1; i<=59; i++){
        $(element).find('.second_selector').append($('<option>',{
          value: i,
          text: i
        }));
      }

      
      $(element).find('.day_selector').change(function(){
        scope.$apply(function(){
          scope.myModel.setDate($(element).find('.day_selector option:selected').val());
          scope.myModel = new Date(scope.myModel);
        });
      });

      $(element).find('.month_selector').change(function(){
        scope.$apply(function(){
          scope.myModel.setMonth($(element).find('.month_selector option:selected').val()-1);
          scope.myModel = new Date(scope.myModel);
        });
      });

      $(element).find('.year_selector').change(function(){
        scope.$apply(function(){
          scope.myModel.setYear($(element).find('.year_selector option:selected').val());
          scope.myModel = new Date(scope.myModel);
        });
      });

      $(element).find('.hour_selector').change(function(){
        scope.$apply(function(){
          scope.myModel.setHours($(element).find('.hour_selector option:selected').val());
          scope.myModel = new Date(scope.myModel);
        });
      });

      $(element).find('.minute_selector').change(function(){
        scope.$apply(function(){
          scope.myModel.setMinutes($(element).find('.minute_selector option:selected').val());
          scope.myModel = new Date(scope.myModel);
        });
      });
      
      $(element).find('.second_selector').change(function(){
        scope.$apply(function(){
          scope.myModel.setSeconds($(element).find('.second_selector option:selected').val());
          scope.myModel = new Date(scope.myModel);
        });
      });
      
      

      $(element).find('.date_selector, .time_selector').change(function(){
        scope.$apply(function(ev){
          //console.debug(ev);
          //console.debug($(element).find('.date_selector').val())
          //console.debug($(element).find('.time_selector').val())
          //scope.myModel.setSeconds($(element).find('date_selector').val());
          scope.myModel = new Date($(element).find('.date_selector').val() + ' ' + $(element).find('.time_selector').val());
        });
      });
      
      

      
      
      scope.$watch('myModel', function(value){
        console.debug('we got notified in about the new date ' + value + ' and the thing is ' + scope.myModel);
        $(element).find('.day_selector :nth-child(' + value.getDate() + ')').prop('selected', true);
        $(element).find('.month_selector option').eq(value.getMonth()).prop('selected', true);
        $(element).find('.year_selector option:eq(' + value.getYear() + ')').prop('selected', true);
        $(element).find('.hour_selector option').eq(value.getHours()).prop('selected', true);
        $(element).find('.minute_selector option').eq(value.getMinutes()).prop('selected', true);
        $(element).find('.second_selector option').eq(value.getSeconds()).prop('selected', true);
        
        $(element).find('.date_selector').val(value.strftime('%Y-%m-%d'));
        console.debug('setting for timeselector ' + value.strftime('%H:%M:%S'));
        $(element).find('.time_selector').val(value.strftime('%H:%M:%S'));
      });
      
      
    }
  };
});
