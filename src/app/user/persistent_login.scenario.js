describe('a user login', function () {
  it('navigates to index page', function () {
    browser().navigateTo('/');
    expect(element('div.login .dropdown-menu', 'login dropdown menu').text()).toContain('Sign in');
    element('#menu .login button', 'login dropdown button').click();
    element('#menu .login .dropdown-menu li:last', 'test button').click();
    browser().reload('google.com');
    browser().navigateTo('/');
    expect(element('div.login .dropdown-menu', 'login dropdown menu').text()).toContain('Logout');
  });
});