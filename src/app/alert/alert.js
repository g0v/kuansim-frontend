(function () {
  var alerts = angular.module('kuansim.alert', []);

  alerts.service('Alert', function () {
    this.message = "";
    this.success = true;
    this.hasAlert = false;

    this.setAlert = function(message, success) {
      this.hasAlert = true;
      this.message = message;
      this.success = success;
    };

    this.clearAlert = function() {
      this.hasAlert = false;
      this.message = "";
    };

  });

  alerts.controller('AlertCtrl', function ($scope, Alert) {

    $scope.alert = Alert;
    $scope.alert.clearAlert();

  });
})();