angular.module('kuansim.user', [
])

.service('User', function ($cookies) {
  this.loggedIn = false;
  this.email = "";
  this.name = "";

  this.logIn = function(_email, _name) {
    this.loggedIn = true;
    this.email = _email;
    this.name = _name;
  };

  this.logOut = function() {
    this.loggedIn = false;
    this.email = "";
    this.name = "";
  };

})

.controller('UserCtrl', function UserCtrl($scope) {
});

