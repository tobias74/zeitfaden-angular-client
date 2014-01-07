'use strict';

angular.module('ZeitfadenApp').directive('zfWhenScrolled', function() {
  return function(scope, elm) {
    var raw = elm[0];
    var blocked = false;
    elm.bind('scroll', function() {
      console.debug('this is whenscrolled: ' + attr.whenScrolled);
      if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
        scope.$apply(function(){
          if (!blocked){
            blocked = true;
            //scope.$eval(attr.whenScrolled);
            scope.scrolledForMore(function(){
              console.debug('the callbeaaak yeah.');
              blocked=false;
            });
          }
          else {
            console.debug('scrolled again? I am blocked right now. waiting.');
          }
        });
      }
    });
  };
});
