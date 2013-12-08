describe('issue module', function() {
  beforeEach(module('kuansim.issue'));


  describe('timeline directive', function () {
    var compile, scope, httpBackend, res;

    beforeEach(inject(function ($compile, $rootScope, $httpBackend) {
      compile = $compile;
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      res = {success: true};
      httpBackend.when('GET', '/collections/issues/2').respond(res);
      httpBackend.when('GET', '/collections/issues/3').respond(res);
    }));

    xit('pulls new issue data if dropdown menu changed', function () {
      // httpBackend.flush();
      scope.dummy = '1';
      var elm = compile('<div timeline timeline-issue="dummy"></div>')(scope);
      scope.$apply(function () {
        scope.dummy = '2';
      });
      httpBackend.expectGET('/collections/issues/2');
      scope.$apply(function () {
        scope.dummy = '3';
      });
      httpBackend.expectGET('/collections/issues/3');
    });

  });

  xdescribe('IssueCtrl', function () {

    var scope, ctrl, httpBackend, ctrlService, issuesList;

    beforeEach(function () {
      inject(function ($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        ctrlService = $controller;
        httpBackend = $httpBackend;
        issuesList = [
          {
            id: '1',
            title: 'one fake issue',
            description: 'a very fake issue'
          },
          {
            id: '2',
            title: '2nd fake issue',
            description: 'a very fake issue'
          },
          {
            id: '3',
            title: '3rd fake issue',
            description: 'a very fake issue'
          }
        ];
        httpBackend.when('GET', '/collections/issues').respond(issuesList);
      });
    });

    it('gets list of all the issues', function () {
      httpBackend.expectGET('/collections/issues');
      ctrl = ctrlService('IssueCtrl', {$scope: scope});
      httpBackend.flush();

      expect(scope.issues).toEqual(issuesList);
      expect(scope.selectedIssue).toEqual(issuesList[0]);
      expect(scope.selectedIssueId).toEqual(issuesList[0].id);

    });

  });

});

