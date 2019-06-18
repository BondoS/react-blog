import React from "react";
import PropTypes from "prop-types";

import classes from "./Button.module.scss";

/* eslint-disable */
const button = ({ disabled = false, btnType, clicked, children, type }) => (
  <button
    type={type}
    disabled={disabled}
    className={[classes.Button, classes[btnType]].join(" ")}
    onClick={clicked}
  >
    {children}
  </button>
);

button.propTypes = {
  disabled: PropTypes.bool,
  btnType: PropTypes.string,
  clicked: PropTypes.func,
  children: PropTypes.element,
  type: PropTypes.string
};

button.defaultProps = {
  disabled: false,
  btnType: "text",
  clicked: () => {},
  children: PropTypes.element,
  type: "submit"
};
export default button;
