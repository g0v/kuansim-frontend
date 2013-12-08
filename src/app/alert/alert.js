(function () {
  var alerts = angular.module('kuansim.alert', []);

  alerts.service('Alert', function () {
    this.message = "";
    this.success = true;
    this.hasAlert = false;
    this.keepOnLocationChange = false;

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
      this.keepOnLocationChange = false;
    };

    this.setFromResponseWithLocationChange = function(response) {
      this.setAlert((response.message) ? response.message : "", response.success);
      this.keepOnLocationChange = true;
    };

  });

  alerts.controller('AlertCtrl', function ($scope, $rootScope, Alert) {

    $scope.alert = Alert;
    $rootScope.$on("$locationChangeStart", function (event, newUrl) {
      if (!$scope.alert.keepOnLocationChange) {
        $scope.alert.clearAlert();
      } else {
        $scope.alert.keepOnLocationChange = false;
      }
    });

  });
})();