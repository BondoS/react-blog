import React, {Fragment, Component} from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import a from './header.module.css';
import * as actions from '../../store/actions/index';

/* eslint-disable */
class Header extends Component {
  render () {
    const {onLogout} = this.props;

    const user = JSON.parse (localStorage.getItem ('user'));
    const navItems = typeof user !== 'undefined' && user
      ? <li className="nav-item">
          <a className="nav-link" onClick={() => onLogout ()}>
            Logout
          </a>
        </li>
      : <Fragment>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
        </Fragment>;
    return (
      <Fragment>
        <nav
          className="navbar navbar-expand-lg navbar-light fixed-top"
          id="mainNav"
        >
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              Ask ME
            </NavLink>
            <button
              className="navbar-toggler navbar-toggler-right"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              Menu
              <i className="fas fa-bars" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link active" to="/">
                    Home
                  </NavLink>
                </li>
                {navItems}
              </ul>
            </div>
          </div>
        </nav>

        <header className="masthead">
          <div className="overlay" />
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  <h1>ASk ME </h1>
                  <span className="subheading">
                    The place where you get answers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    isSignedState: state.loggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch (actions.logout ()),
  };
};

Header.propTypes = {
  isSignedState: PropTypes.bool,
  onLogout: PropTypes.func,
};

Header.defaultProps = {
  isSignedState: false,
  onLogout: PropTypes.func,
};

export default connect (mapStateToProps, mapDispatchToProps) (Header);
