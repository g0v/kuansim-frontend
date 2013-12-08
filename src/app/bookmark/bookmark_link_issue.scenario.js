describe('linking bookmark to issues', function () {
  it('has issues to select from', function () {

    // Given I am on the home page
    browser().navigateTo('/');
    // browser().navigateTo('/Users/raejin/kuansim-rails/kuansim-frontend/build/index.html');

    // When I follow "Create bookmark"
    var bookmarkBtn = element('#menu button.dropdown-toggle:first', 'bookmark dropdown button');
    expect(bookmarkBtn.text()).toContain('Bookmark');
    bookmarkBtn.click();
    expect(element('#menu .btn-group:first .dropdown-menu:visible', 'bookmark dropdown menu').count()).toBe(1);
    var createBookmarkBtn = element('#menu .btn-group:first .dropdown-menu:visible a:last', 'create bookmark link');
    expect(createBookmarkBtn.text()).toContain('Create');
    createBookmarkBtn.click();

    // Then I should be on the new bookmark page
    expect(browser().location().path()).toBe('/bookmarks/create');

    // When I fill in the bookmark info in the form
    input('bmTitle').enter('news');
    input('bmDateStr').enter(Date.now());
    input('bmLocation').enter('LAX, shooting, murder');
    input('bmDescription').enter("Federal officials charged the 23-year-old suspect in Friday's shooting rampage at Los Angeles International Airport");
    input('bmIssues').enter("Issue0");
    // And I press create bookmark
    element('form.bookmark-form button', 'bookmark submit btn').click();

    // Then I should be on the bookmark list page
    expect(browser().location().path()).toBe('/bookmarks/create');

  });
});