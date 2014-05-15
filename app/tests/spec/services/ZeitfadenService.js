'use strict';

describe('Service: ZeitfadenService', function () {

  // load the service's module
  beforeEach(module('ZeitfadenApp'));

  // instantiate service
  var ZeitfadenService;
  beforeEach(inject(function (_ZeitfadenService_) {
    ZeitfadenService = _ZeitfadenService_;
  }));

  it('should do something', function () {
    expect(!!ZeitfadenService).toBe(true);
  });

});
