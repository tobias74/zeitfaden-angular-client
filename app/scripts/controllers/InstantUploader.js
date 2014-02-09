'use strict';

angular.module('ZeitfadenApp').controller('InstantUploaderCtrl', function($scope,StationService,$routeParams,$location,$upload) {
  
  window.tobias = {};
  
  console.debug('I got called : InstantUploaders.');
  
  $scope.dataForRangeSelect = [
    {"range": 2, "description": "2m"},
    {"range": 10, "description": "10m"},
    {"range": 100, "description": "100m"},
    {"range": 500, "description": "500m"},
    {"range": 1000, "description": "1km"},
    {"range": 10000, "description": "10km"},
    {"range": 100000, "description": "100km"},
    {"range": 1000000, "description": "1000km"},
    {"range": 10000000, "description": "10000km"},
    {"range": 100000000, "description": "100000km"}
  ];
         
         
         
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
  
  $scope.getTime = function(){
    var myDate = new Date();
    $scope.currentTimeString = myDate.toUTCString();
  }




  $scope.onFileSelect = function($files) {
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
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
      });
      //.error(...)
      //.then(success, error, progress); 
    }
  };
                           
         
});
