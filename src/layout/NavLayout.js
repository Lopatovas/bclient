/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import { withRouter } from 'react-router-dom';
import navBarRoutes from '../config/navRoutes';

import NavBar from '../components/navBar';

class NavLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, panelPath: 'UserPanel' };
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    this.setState({ loggedIn: localStorage.getItem('id'), panelPath: localStorage.getItem('role') });
  }

  componentDidUpdate() {
    const { loggedIn } = this.state;
    const id = localStorage.getItem('id');
    const panelPath = localStorage.getItem('role');
    if (id !== loggedIn) {
      this.setState({ loggedIn: id, panelPath });
    }
  }

  handleLogOut() {
    localStorage.clear();
    const { history } = this.props;
    history.push('/Login');
  }

  render() {
    const { children } = this.props;
    const { panelPath, loggedIn } = this.state;
    return (
      <div>
        <NavBar routes={new navBarRoutes(panelPath, loggedIn).getNavigation(this.handleLogOut, panelPath)} />
        {children}
      </div>
    );
  }
}

export default withRouter(NavLayout);
