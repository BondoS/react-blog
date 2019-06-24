import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.scss';

const Input = ({
  invalid,
  shouldValidate,
  touched,
  elementType,
  elementConfig,
  value,
  changed,
  label,
}) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (!invalid && shouldValidate && touched) {
    inputClasses.push (classes.Invalid);
  }

  switch (elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join (' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join (' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join (' ')}
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map (option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join (' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label htmlFor={elementType} id={elementType} className={classes.Label}>
        {label}
      </label>
      {inputElement}
    </div>
  );
};

Input.propTypes = {
  invalid: PropTypes.bool,
  shouldValidate: PropTypes.bool,
  touched: PropTypes.bool,
  elementType: PropTypes.string,
  elementConfig: PropTypes.shape ({
    type: PropTypes.string,
    placeholder: PropTypes.string,
  }),
  value: PropTypes.node,
  changed: PropTypes.func,
  label: PropTypes.string,
};

Input.defaultProps = {
  invalid: false,
  shouldValidate: false,
  touched: false,
  elementType: '',
  elementConfig: PropTypes.shape ({
    type: 'input',
    placeholder: 'Please insert text',
  }),
  value: PropTypes.node,
  changed: PropTypes.func,
  label: '',
};

export default Input;
