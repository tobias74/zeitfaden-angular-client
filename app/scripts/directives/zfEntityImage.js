angular.module('ZeitfadenApp').directive('displayStation', function($document,ResponsiveService) {
    return {
        restrict: 'A',
        scope:{
          displayStation: '=displayStation'
        },
        
        link: function(scope, element, attr) {
            var imageLoader = new CancelableImageLoader('empty.html');
          
            var img = $document[0].createElement('img');
            console.debug('int he l.ink functionnnn');
            //console.debug(scope.displayStation);   
            
            
            scope.$watch('displayStation', function (station) {

              console.debug('changed oribasdsad src');
              console.debug(station);
              img.onload=function(){};
              
              element[0].src = station.smallFrontImageUrl + '/format/' + ResponsiveService.getAttachmentFormat();
              
              /*

              img = $document[0].createElement('img');
              console.debug(attr);

              
              img.src = station.bigFrontImageUrl + '/format/' + ResponsiveService.getAttachmentFormat();
              img.onload = function() {
                  console.debug('on load, now puting the original image');
                  element[0].src = station.bigFrontImageUrl + '/format/' + ResponsiveService.getAttachmentFormat();
              };

              */
             
              imageLoader.load(station.smallFrontImageUrl + '/format/' + ResponsiveService.getAttachmentFormat(), function(imageTag){
                  console.debug('on load, now puting the original image');
                  element[0].src = station.bigFrontImageUrl + '/format/' + ResponsiveService.getAttachmentFormat();
              });



              
            });
            
           
        }
    };
});