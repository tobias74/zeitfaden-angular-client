'use strict';

angular.module('ZeitfadenApp').factory('MenuService', function(){
  var self = this;
  
  self.clickPeople = function(){
    console.debug('clickPeople not set yet');
  };

  self.clickPictures = function(){
    console.debug('clickPictures not set yet');
  };

  self.clickByTime = function(){
    console.debug('clickByTime not set yet');
  };

  self.clickByDistance = function(){
    console.debug('clickByDistance not set yet');
  };
  
  return {
    setClickPeople: function(callback){
      self.clickPeople = callback;      
    },

    setClickPictures: function(callback){
      self.clickPictures = callback;      
    },

    setClickByTime: function(callback){
      self.clickByTime = callback;      
    },

    setClickByDistance: function(callback){
      self.clickByDistance = callback;      
    },
    
    
    clickPeople: function(){
      self.clickPeople();
    },
    
    clickPictures: function(){
      self.clickPictures();
    },
    
    clickByTime: function(){
      self.clickByTime();
    },
    
    clickByDistance: function(){
      self.clickByDistance();
    }
    
  };
  
});



