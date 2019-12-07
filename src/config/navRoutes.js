/* eslint-disable class-methods-use-this */
class navBarRoutes {
  constructor(user) {
    this.user = user;
  }

  getNavLoggedOut() {
    return [
      { name: 'Home', url: '/' },
      { name: 'Register', url: '/Register' },
      { name: 'Login', url: '/Login' },
    ];
  }

  getNavLoggedInUser(logout, path) {
    return [
      { name: 'Home', url: '/' },
      {
        name: 'Log Out',
        url: '/',
        action: () => {
          logout();
        },
      },
      {
        name: 'My Panel',
        url: `/${path}/${this.user}`,
      },
    ];
  }

  getNavigation(logout = () => {}, path = 'UserPanel') {
    if (this.user) {
      return this.getNavLoggedInUser(logout, path);
    }

    return this.getNavLoggedOut();
  }
}

export default navBarRoutes;
