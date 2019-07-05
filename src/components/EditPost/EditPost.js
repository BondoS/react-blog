import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import axios from 'axios';
import {connect} from 'react-redux';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import {readSync} from 'fs';

// /* eslint-disable */
class EditPost extends Component {
  state = {
    fields: {
      title: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Title',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      desc: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Description',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
      imageUrl: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Image Url',
        },
        value: '',
        validation: {
          required: false,
        },
        valid: false,
        touched: false,
      },
    },
    post: {},
    loading: false,
  };

  /* eslint-enable */

  componentDidMount () {
    const {postID} = this.state;
    axios
      .get (
        `http://issr-dev.eu-west-1.elasticbeanstalk.com/api/posts/${this.props.match.params.id}`
      )
      .then (res => {
        console.log (res.data);
        this.setState ({post: res.data});
        this.setState (state => {
          return {
            ...state,
            fields: {
              ...state.fields,
              title: {
                ...state.fields.title,
                value: res.data.title,
              },
              desc: {
                ...state.fields.desc,
                value: res.data.text,
              },
              imageUrl: {
                ...state.fields.imageUrl,
                value: res.data.imageUrl,
              },
            },
          };
        });
      })
      .catch (err => console.log (err));
  }

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
    const {username, password, history} = this.props;
    const {fields} = this.state;
    this.setState (state => {
      return {...state, loading: true};
    });

    // Send a POST request
    axios ({
      method: 'put',
      auth: {
        username,
        password,
      },
      url: `http://issr-dev.eu-west-1.elasticbeanstalk.com/api/posts/${this.props.match.params.id}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify ({
        title: fields.title.value,
        text: fields.desc.value,
        imageUrl: fields.imageUrl.value,
      }),
    })
      .then (res => {
        console.log (res.data);
        this.setState (state => {
          return {...state, loading: false};
        });
        history.push (`/${this.props.match.params.id}`);
      })
      .catch (err => {
        this.setState (state => {
          return {...state, loading: false};
        });
        console.log (err);
      });
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
    const {isSignedState, username} = this.props;
    const formElementsArray = [];
    const {fields, loading} = this.state;
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

    let form = formElementsArray.map (formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={formElement.config.valid}
        shouldValidate={formElement.config.validation ? true : false}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler (event, formElement.id)}
      />
    ));

    if (loading) {
      form = <Spinner />;
    }
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button type="submit" btnType="Success">
            Update
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
    username: state.username,
    password: state.password,
  };
};

EditPost.propTypes = {
  isSignedState: PropTypes.bool,
  username: PropTypes.string,
  password: PropTypes.string,
  history: ReactRouterPropTypes.history,
};

EditPost.defaultProps = {
  isSignedState: false,
  username: '',
  password: '',
  history: ReactRouterPropTypes.history,
};

export default connect (mapStateToProps, null) (EditPost);
