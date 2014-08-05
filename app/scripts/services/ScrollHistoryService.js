'use strict';

angular.module('ZeitfadenApp').factory('ScrollHistoryService', function($rootScope,$q,$location,$window){
  var ScrollHistoryService = function(){
    var self = this;
    var stateHolder = [];
    
    
    this.hasScrollTop = function(scrollingStatusId){
      return true;
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
      stateHolder[scrollingStatusId]['scrollTop'] = val;
      
      /*
      console.debug('the history service gets set with scroll-top' + val);

      $rootScope.$apply(function(){
        var search = $location.search();
        search.shsScrollTop = val;
        $location.search(search);
        $location.replace();
      });
      */
     
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
      console.debug('got the scrolling status');
      
      if (!stateHolder[scrollingStatusId]){
        console.debug('uh.. that scrollingStatusId-Id does not exists.');
        this.introduceScrollingStatus(scrollingStatusId);
        
        // this is a callback
        this.getController().loadEntities();
      } 
      else {
        console.debug('digesting scrollingStatusId: ' + scrollingStatusId);
        console.debug(stateHolder[scrollingStatusId]);
        console.debug(stateHolder[scrollingStatusId]['tobias']);
      
        // this is a callback
        this.getController().setHistoryEntities(stateHolder[scrollingStatusId]);
      
        if (this.isScrollingStatusEmpty(scrollingStatusId)){
          console.debug('scrolling status seems to be emtpy, therefore loading now.');
          
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



