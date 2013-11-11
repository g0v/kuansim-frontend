describe('bookmark scenarios', function () {
  it('creates a new bookmark', function () {

    // Given I am on the home page
    browser().navigateTo('/base/build/index.html');
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
    input('url').enter('http://online.wsj.com/news/articles/SB10001424052702304527504579174283262127454');
    input('type').enter('news');
    input('date').enter(Date.now());
    input('tags').enter('LAX, shooting, murder');
    input('msg').enter("Federal officials charged the 23-year-old suspect in Friday's shooting rampage at Los Angeles International Airport");

    // And I press create bookmark
    element('button.createBookmarkBtn', 'bookmark submit btn').click();

    // Then I should be on the bookmark list page
    expect(browser().location().path()).toBe('/bookmarks');

  });
});