describe('a user profile page', function() {
  it('should display a profile image', function() {
    browser().navigateTo('/base/build/index.html');
    element('#menu .profile', 'profile').click();
    expect(element('div.profile-image').count()).toBe(1);
  });
});