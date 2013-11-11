describe('issue module', function() {
  beforeEach(module('kuansim.issue'));

  describe('IssueCtrl', function () {

    var scope, ctrl, httpBackend;

    beforeEach(function () {
      inject(function ($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        ctrl = $controller('IssueCtrl', {$scope: scope});
        httpBackend = $httpBackend;

        var issuesList = [

        ];

        httpBackend.when('POST', '/collections/bookmarks').respond(respondObj);
      });
    });


    it('creates a new bookmark', function () {
      // fill in the fake data in js object
      var newBookmark = {
        url: 'http://online.wsj.com/news/articles/SB10001424052702304527504579174283262127454',
        type: 'news',
        date: Date.now(),
        tags: ['LAX', 'shooting', 'murder'],
        msg: "Federal officials charged the 23-year-old suspect in Friday's shooting rampage at Los Angeles International Airport"
      };

      scope.createBookmark();

      httpBackend.expectPOST('/collections/bookmarks', newBookmark)
                 .respond(200, '[{status:"success", data:null, msg:"a bookmark is successfully created"}]');

      httpBackend.flush();
    });

  });

});

