'use strict';

describe('Service: StationService', function () {

  // load the service's module
  beforeEach(module('ZeitfadenApp'));

  // instantiate service
  var StationService;
  beforeEach(inject(function (_StationService_) {
    StationService = _StationService_;
  }));

  it('should do something', function () {
    expect(!!StationService).toBe(true);
  });

});
