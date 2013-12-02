describe('issue scenarios', function () {
  it('creates a new issue', function () {

    // Given I am on the home page
    browser().navigateTo('/base/build/index.html');

    // When I follow "Create issue" dropdown link
    var issueBtn = element('#menu .btn-group.navigation.issue .dropdown-toggle', 'issue dropdown button');
    expect(issueBtn.text()).toContain('Issues');
    issueBtn.click();
    expect(element('#menu .btn-group.navigation.issue .dropdown-menu:visible', 'issue dropdown menu').count()).toBe(1);
    var createIssueBtn = element('#menu .btn-group.navigation.issue .dropdown-menu:visible a.create', 'create issue link');
    expect(createIssueBtn.text()).toContain('Create');
    createIssueBtn.click();

    // Then I should be on the create new issue page
    expect(browser().location().path()).toBe('/issues/create');

    // When I fill in the issue info in the form
    input('issueTitle').enter('2014 August Bart Strike');
    input('issueDescription').enter('bart went on strike for no apparent reason');

    // And I press create issue
    element('form.issue-create-form button', 'issue submit btn').click();

    // Then I should be on the bookmark list page
    expect(browser().location().path()).toBe('/issues/list');

  });
});