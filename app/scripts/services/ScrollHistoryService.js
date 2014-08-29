'use strict';

angular.module('ZeitfadenApp').factory('ScrollHistoryService', function($rootScope,$q,$location,$window,ResponsiveService){
  var ScrollHistoryService = function(){
    var self = this;
    var stateHolder = [];
    
    
    this.hasScrollTop = function(scrollingStatusId){
      return true;
    };
    
    this.lockScrollHistory = function(scrollingStatusId){
      if (!stateHolder[scrollingStatusId]) stateHolder[scrollingStatusId] = {};
    	stateHolder[scrollingStatusId]['scrollHistoryIsLocked'] = true;
    };

    this.unlockScrollHistory = function(scrollingStatusId){
      if (!stateHolder[scrollingStatusId]) stateHolder[scrollingStatusId] = {};
    	stateHolder[scrollingStatusId]['scrollHistoryIsLocked'] = false;
    };
    
    this.getScrollTop = function(scrollingStatusId){
        return stateHolder[scrollingStatusId]['scrollTop'];
      
        /*
        var search = $location.search();
        return search.shsScrollTop;
        */
    };
    
    this.restoreScrollTop = function(scrollingStatusId){
      $window.scrollTo(0, this.getScrollTop(scrollingStatusId));
    };
    
    this.setScrollTop = function(scrollingStatusId,val){
      if (stateHolder[scrollingStatusId] && stateHolder[scrollingStatusId]['scrollHistoryIsLocked']){
    	 //console.debug('i guess the browser tried to scroll, preventing histroy overwrite.');
    	 return;	
      }
      
      if (!stateHolder[scrollingStatusId]) stateHolder[scrollingStatusId] = {};
      
      stateHolder[scrollingStatusId]['scrollTop'] = val;
     
    };
    
    
    this.setController = function(val){
      this.controller = val;      
    };
    
    this.getController = function(){
      return this.controller;     
    };
    
    this.isScrollingStatusEmpty = function(scrollingStatusId){
      return (stateHolder[scrollingStatusId]['filled'] !== true);
    };

  
    this.introduceScrollingStatus = function(scrollingStatusId){
      stateHolder[scrollingStatusId] = {};
      stateHolder[scrollingStatusId]['filled'] = false;
      stateHolder[scrollingStatusId]['stations'] = [];
      stateHolder[scrollingStatusId]['tobias'] = 'this thing was just initialized.';
    
    };

  this.storeScrollingStatus = function(scrollingStatusId, data){
    stateHolder[scrollingStatusId] = data;
//        filled: true,
//        stations: $scope.stations,
//        tobias: 'yeshere',
//        lastStation: lastStation,
//        scrollEndReached: scrollEndReached
      };

    this.digestScrollingStatus = function(scrollingStatusId){
      
      if (!stateHolder[scrollingStatusId]){
        this.introduceScrollingStatus(scrollingStatusId);
        
        // this is a callback
        this.getController().loadEntities();
      } 
      else {
      
        // this is a callback
        this.getController().setHistoryEntities(stateHolder[scrollingStatusId]);
      
        if (this.isScrollingStatusEmpty(scrollingStatusId)){
     	     // this is a callback
	        this.getController().loadEntities();
        }
        else {
	        console.debug('there should be stuff in the filler, not loading');
        }
    }
  };


        
  };
  
  var instance = new ScrollHistoryService();
  return instance;
});



