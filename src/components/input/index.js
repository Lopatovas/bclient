import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const {
    labelText, id, children, error
  } = props;
  return (
    <div className="form-group">
      <label htmlFor={id}>{labelText}</label>
      {children}
      {error.length > 0 ? <p className="text-danger">{error[0]}</p> : null }
    </div>
  );
}

Input.propTypes = {
  labelText: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.array,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Input.defaultProps = {
  labelText: '',
  id: '',
  error: [],

};

export default Input;
