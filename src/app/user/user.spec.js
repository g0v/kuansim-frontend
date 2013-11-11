describe('user module', function() {
  beforeEach(module('kuansim.user'));

  xdescribe('User service', function () {
    it('deals with user login intermediate steps', inject(function (User) {
      var user = {
        name: 'Spooky Monkey',
        email: 'spookym@berkeley.edu'
      };
      User.storeInfo(user);
      expect(User.getInfo().name).toEqual('Spooky Monkey');
      expect(User.getInfo().email).toEqual('spookym@berkeley.edu');
      expect(User.isLogin()).toEqual(true);
    }));
  });

});

