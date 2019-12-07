import React from 'react';
import PropTypes from 'prop-types';

function FormWrapper(props) {
  const { children, callBack, submitText } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    callBack();
  };
  return (
    <form className="shadow-lg p-3 mb-5 bg-white rounded">
      {children}
      <button onClick={(e) => { handleSubmit(e); }} type="button" className="btn btn-light">
        {submitText}
      </button>
    </form>
  );
}

FormWrapper.propTypes = {
  children: PropTypes.oneOf(PropTypes.object, PropTypes.object),
  submitText: PropTypes.string,
  callBack: PropTypes.func.isRequired,
};

FormWrapper.defaultProps = {
  children: [],
  submitText: 'Submit',
};

export default FormWrapper;
