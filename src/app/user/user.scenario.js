describe('a user profile page', function() {
  it('should display a profile image', function() {
    browser().navigateTo('/');
    expect(browser().location().url()).toBe('/');
    element('#menu .login button', 'login dropdown button').click();
    element('a.facebook', 'facebook login').click();
    browser().navigateTo('#/profile');
    // element("#menu .dropdown-menu a:contains(Logout)", 'profile').click();
    expect(element('img').count()).toBe(1);
  });
});