(function() {
  'use strict';

  /**
   * Unit testing ToastrFactory
   */
  describe('[ToastrFactory]', function() {
    var toastr, Toastr;

    beforeEach(module('crossoverAssignment'));
    beforeEach(inject(function(_toastr_, _Toastr_) {
      toastr = _toastr_;
      Toastr = _Toastr_;
    }));

    it('should show a toastr.success when Toastr.success is invoked', function() {
      spyOn(toastr, 'success');

      Toastr.success('', '');

      expect(toastr.success).toHaveBeenCalled();
    });

    it('should show a toastr.info when Toastr.info is invoked', function() {
      spyOn(toastr, 'info');

      Toastr.info('', '');

      expect(toastr.info).toHaveBeenCalled();
    });

    it('should show a toastr.warning when Toastr.warning is invoked', function() {
      spyOn(toastr, 'warning');

      Toastr.warning('', '');

      expect(toastr.warning).toHaveBeenCalled();
    });

    it('should show a toastr.error when Toastr.error is invoked', function() {
      spyOn(toastr, 'error');

      Toastr.error('', '');

      expect(toastr.error).toHaveBeenCalled();
    });

    it('should clear a toastr message when Toastr.close is invoked', function() {
      spyOn(toastr, 'clear');

      Toastr.close();

      expect(toastr.clear).toHaveBeenCalled();
    });

  });
})();
