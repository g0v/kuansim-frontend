(function () {
  var alerts = angular.module('kuansim.alert', []);

  alerts.service('Alert', function () {
    this.message = "";
    this.success = true;
    this.hasAlert = false;

    this.setAlert = function(message, success) {
      this.message = message;
      this.success = success;
      this.hasAlert = this.message !== "";
    };

    this.clearAlert = function() {
      this.hasAlert = false;
      this.message = "";
    };

    // Use for cleaner code
    this.setFromResponse = function(response) {
      this.setAlert((response.message) ? response.message : "", response.success);
    };

  });

  alerts.controller('AlertCtrl', function ($scope, Alert) {

    $scope.alert = Alert;
    $scope.alert.clearAlert();

  });
})();