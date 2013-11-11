describe('navigation module', function() {
  beforeEach(module('kuansim.nav'));

  var scope, ctrl, oauth;

  describe('Navigation controller', function () {
    beforeEach(function () {
      inject(function ($rootScope, $controller, OAuth) {
        scope = $rootScope.$new();
        ctrl = $controller('NavCtrl', {$scope: scope});
        oauth = OAuth;
        spyOn(oauth, 'popup');
      });
    });

    it('tests oauth.io function', function () {
      scope.thirdPartySignIn('facebook');
      expect(oauth.popup).toHaveBeenCalled();
    });

  });

});

