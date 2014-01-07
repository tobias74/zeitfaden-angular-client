'use strict';

describe('Controller: TraceArchiveCtrl', function () {

  // load the controller's module
  beforeEach(module('ZeitfadenApp'));

  var TracearchiveCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TracearchiveCtrl = $controller('TracearchiveCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
