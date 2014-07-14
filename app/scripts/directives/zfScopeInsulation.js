'use strict';

angular.module('ZeitfadenApp').directive('zfScopeInsulation', function() {
  return {
    link: function($scope,element,attrs,ngModel){
      console.debug('we have the insulation...');
    }
  };
});
