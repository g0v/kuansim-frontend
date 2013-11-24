(function() {
  var api = angular.module('kuansim.api', []);

  api.factory('API', function() {
    return function (route) {
      return '/api' + route;
    };
  });
})();