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

angular.module('ZeitfadenApp').directive('displayImageWithPlaceholder', function($document,ResponsiveService) {
    return {
        restrict: 'A',
        scope:{
          displayImage: '@displayImageWithPlaceholder'
        },
        
        link: function(scope, element, attr) {
    		var img = $document[0].createElement('img');      
    		img.onload = function(){};
    		img.src = scope.displayImage;
    		
            
//          element.css('display','inline-block');  
//		  element.css('width','100%');
//		  element.css('border','1px solid red');
          element[0].src = ResponsiveService.getPlaceholderUrl();
 //         console.debug('trying to load ' + scope.displayImage);
         
          img.onload = function(){
//              console.debug('on load, now puting the original image');
              element[0].src = scope.displayImage;
          };



              
            
           
        }
    };
});
