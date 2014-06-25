angular.module('ZeitfadenApp').directive('displayStation', function($document,ResponsiveService) {
    return {
        restrict: 'A',
        scope:{
          displayStation: '=displayStation'
        },
        
        link: function(scope, element, attr) {
            console.debug('int he l.ink functionnnn');
            //console.debug(scope.displayStation);   
            
            
            scope.$watch('displayStation', function (station) {
              console.debug('changed oribasdsad src');
              console.debug(station);
              
              
              element[0].src = station.smallFrontImageUrl + '/format/' + ResponsiveService.getAttachmentFormat();
              
              var img = $document[0].createElement('img');
              console.debug(attr);
              
              img.src = station.bigFrontImageUrl + '/format/' + ResponsiveService.getAttachmentFormat();
              img.onload = function() {
                  console.debug('on load, now puting the original image');
                  element[0].src = station.bigFrontImageUrl + '/format/' + ResponsiveService.getAttachmentFormat();
              };
              
            });
            
           
        }
    };
});