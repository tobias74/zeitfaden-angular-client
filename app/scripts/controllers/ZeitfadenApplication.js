'use strict';

angular.module('ZeitfadenApp').controller('ZeitfadenApplicationCtrl', function($scope,StationService,$routeParams,$location,LoginService,$fileUploader) {
  

  $scope.tobias="inside the main application controller.";
  $scope.applicationTitle = "Zeitfaden";                         
     
     
  $scope.isUserLoggedIn = LoginService.isUserLoggedIn;
  $scope.getLoggedInUserId = LoginService.getLoggedInUserId;

  $scope.$watch('isUserLoggedIn', function(newValue, oldValue, scope){
    console.debug('inside ApplicationCOntroller: got the notification of the loginservice about loggedinUser');
  });
         
         
/*  
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
  */
 
  
  $scope.performRegistration = function(email,password,password_again){
      LoginService.performRegistration(email,password,password_again);
  };       
         
  $scope.performLogout = function(){
      LoginService.performLogout();
  };
  
  

/*
        $scope.instantUploadButtonText = 'Instant Upload';
        $scope.isUploadingImages = false;

        var uploader = $scope.uploader = $fileUploader.create({
            scope: $scope,                          // to automatically update the html. Default: $rootScope
            url: '/station/create/',
            removeAfterUpload: true,
            autoUpload: true,
            alias: 'uploadFile',
            formData: [
              { 
                key: 'value',
              }
            ],
            filters: [
                function (item) {                    // first user filter
                    console.info('filter1');
                    return true;
                }
            ]
        });

        // ADDING FILTERS

        uploader.filters.push(function (item) { // second user filter
            console.info('filter2');
            return true;
        });

        // REGISTER HANDLERS

        uploader.bind('afteraddingfile', function (event, item) {
            console.info('After adding a file', item);
            item.formData.push({
              startLatitude: $scope.position.coords.latitude,
              endLatitude: $scope.position.coords.latitude,
              startLongitude: $scope.position.coords.longitude,
              endLongitude: $scope.position.coords.longitude,
              startDate: $scope.currentTimeString,
              endDate: $scope.currentTimeString
            });
        });

        uploader.bind('whenaddingfilefailed', function (event, item) {
            console.info('When adding a file failed', item);
        });

        uploader.bind('afteraddingall', function (event, items) {
            console.info('After adding all files', items);
            //uploader.uploadAll();
            $scope.isUploadingImages = true;
            //$scope.instantUploadButtonText = 'Instant Upload';
      });

        uploader.bind('beforeupload', function (event, item) {
            console.info('Before upload', item);
        });

        uploader.bind('progress', function (event, item, progress) {
            //console.info('Progress: ' + progress, item);
        });

        uploader.bind('success', function (event, xhr, item, response) {
            console.info('Success', xhr, item, response);
        });

        uploader.bind('cancel', function (event, xhr, item) {
            console.info('Cancel', xhr, item);
        });

        uploader.bind('error', function (event, xhr, item, response) {
            console.info('Error', xhr, item, response);
        });

        uploader.bind('complete', function (event, xhr, item, response) {
          console.info('Complete', xhr, item, response);
        });

        uploader.bind('progressall', function (event, progress) {
            //console.info('Total progress: ' + progress);
        });

        uploader.bind('completeall', function (event, items) {
            //$scope.instantUploadButtonText = 'Instant Upload';
            console.info('Complete all', items);
            //$scope.isUploadingImages = false;
        });
        
         
         
         
*/         
         
// profile pixture upload


/*
        $scope.profileUploadButtonText = 'Upload Profile Image';
        $scope.isUploadingProfileImage = false;

        var profileUploader = $scope.profileUploader = $fileUploader.create({
            scope: $scope,                          // to automatically update the html. Default: $rootScope
            url: '/user/uploadProfileImage/',
            removeAfterUpload: true,
            autoUpload: true,
            alias: 'uploadFile',
            formData: [
              { 
                key: 'value',
              }
            ],
            filters: [
                function (item) {                    // first user filter
                    console.info('filter1');
                    return true;
                }
            ]
        });

        // ADDING FILTERS

        profileUploader.filters.push(function (item) { // second user filter
            console.info('filter2');
            return true;
        });

        // REGISTER HANDLERS

        profileUploader.bind('afteraddingfile', function (event, item) {
            console.info('After adding a file', item);
            item.formData.push({
              'nothing':'here'
            });
        });


        profileUploader.bind('afteraddingall', function (event, items) {
            console.info('After adding all files', items);
            //uploader.uploadAll();
            $scope.isUploadingProfileImage = true;
            //$scope.instantUploadButtonText = 'Instant Upload';
      });

        
         
*/         
         
         
         
         
         
         
         
});
