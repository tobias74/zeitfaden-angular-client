'use strict';

describe('Directive: zfDatePicker', function () {
  beforeEach(module('ZeitfadenApp'));

  var element;

  it('should open a jQuery-UI-Datepicker', inject(function ($rootScope, $compile) {
    element = angular.element('<div zf-date-picker ng-model="someDate" ></div>');
    element = $compile(element)($rootScope);
    expect(element.hasClass('ui-datepicker-header'));
  }));
});
