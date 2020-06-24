import logo200Image from '../../assets/img/logo/logo_200_white.png';
import sidebarBgImage from '../../assets/img/sidebar/sidebar-4.jpg';
import TokenService from '../../services/Token.js';
import React from 'react';
import {
  MdExitToApp,
  MdBorderAll,
  MdDashboard,
  MdPerson,
  MdAddCircle
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from '../../utils/bemnames';

const sidebarBackground = {
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navItems = [
  { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
  { to: '/user-profile', name: 'Profile', exact: false, Icon: MdPerson },
  { to: '/garages', name: 'Garages', exact: false, Icon: MdPerson },
  { to: '/login', name: 'Logout', exact: false, Icon: MdExitToApp }
];

const navItemsAdmin = [
  { to: '/tables', name: 'tables', exact: false, Icon: MdBorderAll },
  { to: '/pending', name: 'Pending', exact: false, Icon: MdAddCircle },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <div className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">
                {process.env.REACT_APP_NAME}
              </span>
            </div>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}

            {
              TokenService.getUserRole() === 'app-admin' ?
                navItemsAdmin.map(({ to, name, exact, Icon }, index) => (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <BSNavLink
                      id={`navItem-${name}-${index}`}
                      className="text-uppercase"
                      tag={NavLink}
                      to={to}
                      activeClassName="active"
                      exact={exact}
                    >
                      <Icon className={bem.e('nav-item-icon')} />
                      <span className="">{name}</span>
                    </BSNavLink>
                  </NavItem>
                ))
                : null
            }
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
