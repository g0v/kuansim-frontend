describe('a user login', function () {
  it('navigates to index page', function () {
    browser().navigateTo('/base/build/index.html');
    expect(element('div.login .dropdown-menu', 'login dropdown menu').text()).toContain('Sign in');
    element('#menu .login button', 'login dropdown button').click();
    element('#menu .login .dropdown-menu li:last', 'test button').click();
  });
});