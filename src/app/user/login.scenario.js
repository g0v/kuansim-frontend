describe('a user login', function () {
  it('navigates to index page', function () {
    browser().navigateTo('/');
    expect(element('div.login .dropdown-menu', 'login dropdown menu').text()).toContain('Sign in');
    element('#menu .login button', 'login dropdown button').click();
    expect(element('div.login .dropdown-menu', 'logged in dropdown menu').text()).toContain('Logout');
  });
});