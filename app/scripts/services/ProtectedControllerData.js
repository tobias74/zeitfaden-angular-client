'use strict';

angular.module('ZeitfadenApp').factory('ProtectedControllerData', function(){
  var MyConstructor = function(){
  	
  	this.sayHello = function(){
  		console.debug('hello....................................');
  		console.debug('this is my scope: ' + $scope.tobiasHello);
  	};
  	
  };
  	  	
  var instance = new MyConstructor();
  return instance;
});



