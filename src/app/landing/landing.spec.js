/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe('index landing page', function() {
  beforeEach(module('kuansim.landing'));

  describe('LandingCtrl', function () {
    it('has a scope variable `test`', inject(function ($controller) {
      var scope = {},
          ctrl = $controller('LandingCtrl', {$scope: scope});
      expect(scope.test.length).toBe(3);
    }));
  });

});

