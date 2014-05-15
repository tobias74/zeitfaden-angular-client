'use strict';

/*global $:false */

angular.module('ZeitfadenApp').directive('zfLoginForm',function(LoginService){
  return {
    restrict: 'EA',
    require: '?ngModel',
    templateUrl: 'app/views/directive-templates/zf-login-form.html', 
    scope:{
      myModel: '=ngModel'
    },
    link: function(scope,element,attrs,ngModel){
      var i;


	  scope.userInput = {};
	
      scope.performLogin = function(email,password){
        console.debug('email und password ' + email + password);
        console.debug(scope);
        var promise = LoginService.performLogin(email,password);
        
        promise.then(function(userId){
          console.debug('inside the prmise success');
        });    

        promise.catch(function(){
          console.debug('inside the prmise error');
        });    
        
      };
      
           

      scope.isPerformingLogin = LoginService.isPerformingLogin;    
           
      scope.isUserLoggedIn = LoginService.isUserLoggedIn;
      scope.getLoggedInUserId = LoginService.getLoggedInUserId;

      scope.$watch('isUserLoggedIn', function(newValue, oldValue, scope){
        console.debug('got the notification of the loginservice about loggedinUser');
      });
      

      
      
      
    }
  };
});
