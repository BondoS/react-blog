import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../store/actions/index';

class Logout extends Component {
  componentDidMount () {
    const {onLogout} = this.props;

    onLogout ();
  }

  render () {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch (actions.logout ()),
  };
};

Logout.propTypes = {
  onLogout: PropTypes.func,
};

Logout.defaultProps = {
  onLogout: PropTypes.func,
};

export default connect (null, mapDispatchToProps) (Logout);
