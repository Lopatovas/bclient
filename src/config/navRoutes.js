/* eslint-disable class-methods-use-this */
class navBarRoutes {
  constructor(userRole, userId) {
    this.userRole = userRole;
    this.userId = userId;
  }

  getNavLoggedOut() {
    return [
      { name: 'Courses', url: '/' },
      { name: 'Register', url: '/Register' },
      { name: 'Login', url: '/Login' },
    ];
  }

  getNavLoggedInUser(logout, path) {
    return [
      {
        name: 'Log Out',
        url: '/',
        action: () => {
          logout();
        },
      },
      {
        name: 'Register to a course',
        url: `/registerCourse/${this.userId}`,
      },
    ];
  }

  getNavLoggedInProfessor(logout, path) {
    return [
      {
        name: 'Log Out',
        url: '/',
        action: () => {
          logout();
        },
      },
      {
        name: 'My Courses',
        url: `/viewParticipants/${this.userId}`,
      },
    ];
  }

  getNavLoggedInAdmin(logout) {
    return [
      { name: 'Courses', url: '/' },
      {
        name: 'Log Out',
        url: '/',
        action: () => {
          logout();
        },
      },
      {
        name: 'Create course',
        url: '/createCourse',
      },
      {
        name: 'Give Proffesor Status',
        url: '/giveProfessorStatus',
      },
    ];
  }

  getNavigation(logout = () => {}, path = 'UserPanel') {
    if (this.userRole) {
      switch (this.userRole) {
        case 'admin':
            return this.getNavLoggedInAdmin(logout, path);
        case 'professor':
            return this.getNavLoggedInProfessor(logout, path);
        default:
          return this.getNavLoggedInUser(logout, path);
      }
    }

    return this.getNavLoggedOut();
  }
}

export default navBarRoutes;
