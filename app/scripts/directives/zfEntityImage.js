angular.module('ZeitfadenApp').directive('displayStation', function($document,ResponsiveService) {
    return {
        restrict: 'A',
        scope:{
          displayStation: '=displayStation'
        },
        
        link: function(scope, element, attr) {
            var imageLoader = new CancelableImageLoader('empty.html');
          
            
            
            scope.$watch('displayStation', function (station) {

              element[0].src = station.smallFrontImageUrl + '/format/' + ResponsiveService.getAttachmentFormat();
              
             
              imageLoader.load(station.bigFrontImageUrl + '/format/original', function(imageTag){
                  console.debug('on load, now puting the original image');
                  element[0].src = station.bigFrontImageUrl + '/format/original';
              });



              
            });
            
           
        }
    };
});