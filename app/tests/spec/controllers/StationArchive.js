'use strict';

describe('Controller: StationArchiveCtrl', function () {

  // load the controller's module
  beforeEach(module('ZeitfadenApp'));

  var StationArchiveCtrl, scope, location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($location, $controller, $rootScope) {
    location = $location;
    scope = $rootScope.$new();
    StationArchiveCtrl = $controller('StationArchiveCtrl', {
      $scope: scope
    });
  }));

  it('should attach RangeSelectData to the scope', function () {
    expect(scope.dataForRangeSelect.length).toBeGreaterThan(5);
  });
  
  
  
  
});
