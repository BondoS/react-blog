import React, {Fragment, Component} from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import a from './header.module.css';

/* eslint-disable */
class Header extends Component {
  render () {
    const {onLogout} = this.props;

    const user = JSON.parse (localStorage.getItem ('user'));
    const navItems = typeof user !== 'undefined' && user
      ? <Fragment>
          <li className="nav-item">
            <NavLink className="nav-link" to="/post/add">
              Add Post
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/logout">
              Logout
            </NavLink>
          </li>
        </Fragment>
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

Header.propTypes = {
  isSignedState: PropTypes.bool,
};

Header.defaultProps = {
  isSignedState: false,
};

export default connect (mapStateToProps) (Header);
