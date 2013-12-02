describe('landing page intro', function () {
  it('should show some instrutions', function () {
    browser().navigateTo('/base/build/index.html');
    expect(element('div.intro').text()).toContain('To use the bookmarks tool');
  });
});