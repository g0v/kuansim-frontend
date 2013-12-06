angular.module('kuansim.user', [
  'ui.router'
]).

service('User', function ($q) {

  var userReady = $q.defer();

  this.loggedIn = false;
  this.email = "";
  this.name = "";
  this.id = "";

  this.userReady = function() {
    return userReady.promise;
  };

  this.logIn = function(_email, _name, _id) {
    this.loggedIn = true;
    this.email = _email;
    this.name = _name;
    this.id = _id;
    userReady.resolve();
  };

  this.logOut = function() {
    this.loggedIn = false;
    this.email = "";
    this.name = "";
    this.id = "";
  };

}).

controller('UserCtrl', function ($scope) {

});