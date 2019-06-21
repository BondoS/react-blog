import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';

/* eslint-disable */
import * as actions from '../../store/actions/index';

class Register extends Component {
  state = {
    fields: {
      username: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your UserName',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    loggedIn: false,
  };

  /* eslint-enable */

  inputChangedHandler = (event, fieldName) => {
    const {fields} = this.state;

    const updatedControls = {
      ...fields,
      [fieldName]: {
        ...fields[fieldName],
        value: event.target.value,
        valid: this.checkValidity (
          event.target.value,
          fields[fieldName].validation
        ),
        touched: true,
      },
    };
    this.setState ({fields: updatedControls});
  };

  submitHandler = event => {
    event.preventDefault ();
    const {onLogin} = this.props;
    const {fields} = this.state;
    onLogin (fields.username.value, fields.password.value);
  };

  /* eslint-disable */
  checkValidity (value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim () !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test (value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test (value) && isValid;
    }

    return isValid;
  }

  render () {
    const {isSignedState, isLoading, username} = this.props;
    const formElementsArray = [];
    const {fields} = this.state;
    const signedInText = isSignedState
      ? `Signed In, ${username}`
      : 'Signed Out';
    console.log ('Login props', this.props);
    Object.keys (fields).forEach (key => {
      formElementsArray.push ({
        id: key,
        config: fields[key],
      });
    });

    // for (const key in fields ()) {
    //   if (fields.hasOwnProperty (key)) {
    //     formElementsArray.push ({
    //       id: key,
    //       config: fields[key],
    //     });
    //   }
    // }

    let form = formElementsArray.map (formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler (event, formElement.id)}
      />
    ));

    if (isLoading) {
      form = <Spinner />;
    }
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button type="submit" btnType="Success">
            Sign In
          </Button>
          <div>{signedInText}</div>
        </form>
      </div>
    );
  }
}
/* eslint-enable */

const mapStateToProps = state => {
  return {
    isSignedState: state.loggedIn,
    isLoading: state.loading,
    userId: state.userId,
    username: state.username,
    name: state.name,
    imageUrl: state.imageUrl,
    password: state.password,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (username, password) =>
      dispatch (actions.login (username, password)),
  };
};
Register.propTypes = {
  isSignedState: PropTypes.bool,
  onLogin: PropTypes.func,
  isLoading: PropTypes.bool,
};

Register.defaultProps = {
  isSignedState: false,
  onLogin: PropTypes.func,
  isLoading: false,
};

export default connect (mapStateToProps, mapDispatchToProps) (Register);
