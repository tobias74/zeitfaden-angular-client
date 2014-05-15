'use strict';

/*global $:false */

angular.module('ZeitfadenApp').directive('zfPictureUploader',function($upload){
  return {
    restrict: 'EA',
    require: '?ngModel',
    templateUrl: 'app/views/directive-templates/zf-picture-uploader.html', 
    scope:{
      myModel: '=ngModel'
    },
    link: function($scope,element,attrs,ngModel){
      var i;



	  $scope.loadCurrentLocation = function(callback) {
	    $scope.getTime();
	    $scope.isSearchingLocation = true;
	    navigator.geolocation.getCurrentPosition(function(position){
	      $scope.$apply(function(){
	        $scope.position = position;
	        $scope.isSearchingLocation = false;
	        callback && callback();
	      });
	    });  
	  };
	  
	  $scope.buttonText = 'Instant Upload';
	  $scope.isUploading = false;
	  
	  $scope.getTime = function(){
	    var myDate = new Date();
	    $scope.currentTimeString = myDate.toUTCString();
	  }
	
	
	
	
	  $scope.onFileSelect = function($files) {
	  	if ($scope.position === undefined){
	  		console.debug('no position set.');
	  		return;
	  	}
	  	
	  	$scope.buttonText = "Please wait...";
	  	$scope.isUploading = true;
	    //$files: an array of files selected, each file has name, size, and type.
	    for (var i = 0; i < $files.length; i++) {
	      var file = $files[i];
	      $scope.upload = $upload.upload({
	        url: '/station/create/', //upload.php script, node.js route, or servlet url
	        // method: POST or PUT,
	        // headers: {'headerKey': 'headerValue'},
	        // withCredential: true,
	        data: {
	          startLatitude: $scope.position.coords.latitude,
	          endLatitude: $scope.position.coords.latitude,
	          startLongitude: $scope.position.coords.longitude,
	          endLongitude: $scope.position.coords.longitude,
	          startDate: $scope.currentTimeString,
	          endDate: $scope.currentTimeString
	        },
	        file: file,
	        fileFormDataName: 'uploadFile',
	        // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
	        /* set file formData name for 'Content-Desposition' header. Default: 'file' */
	        //fileFormDataName: myFile, //OR for HTML5 multiple upload only a list: ['name1', 'name2', ...]
	        /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
	        //formDataAppender: function(formData, key, val){} 
	      }).progress(function(evt) {
	      	$scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
	        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
	      }).success(function(data, status, headers, config) {
	        // file is uploaded successfully
	        $scope.buttonText = 'Instant Upload';
	  		  $scope.isUploading = false;
	        console.log(data);
	      });
	      //.error(...)
	      //.then(success, error, progress); 
	    }
	  };
	

      
    }
  };
});
