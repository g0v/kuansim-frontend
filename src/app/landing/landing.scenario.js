describe('landing page intro', function () {
  it('should show some instrutions', function () {
    browser().navigateTo('/');
    // expect(element('div.intro').text()).toContain('To use the bookmarks tool');
  });
});