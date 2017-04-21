'use strict';

describe('sscApp.version module', function() {
  beforeEach(module('sscApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
