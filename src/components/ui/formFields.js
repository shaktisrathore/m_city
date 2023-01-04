import React from 'react';
import PropTypes from 'prop-types';

const FormField = ({
  id,
  formData: {
    element,
    value,
    config,
    validation,
    validationMessage,
    valid,
    showLabel = false,
  },
  handleChange,
}) => {
  const { name, type, placeholder, label, options } = config;

  const showError = () => {
    return (
      <div className="error_label">
        {
          validation && !valid ?
            validationMessage :
            null
        }
      </div>
    );
  };

  const renderTemplate = () => {
    let formTemplate = null;

    switch (element) {
      case 'input':
        formTemplate = (
          <div>
            {
              showLabel ?
                <div className="label_inputs">
                  {label}
                </div> :
                ''
            }
            <input
              name={name}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={event => handleChange({ event, id })}
            />
            {showError()}
          </div>
        );
        break;

      case 'select':
        formTemplate = (
          <div>
            {
              showLabel ?
                <div className="label_inputs">
                  {label}
                </div> :
                ''
            }
            <select
              name={name}
              type={type}
              value={value}
              onChange={event => handleChange({ event, id })}
            >
              <option value="">Select one</option>
              {
                options.map(({ key, value }) => (
                  <option
                    key={key}
                    value={key}
                  >
                    {value}
                  </option>
                ))
              }
            </select>
            {showError()}
          </div>
        );
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  };

  return (
    <div>
      {renderTemplate()}
    </div>
  );
};

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  formData: PropTypes.objectOf(PropTypes.any),
  handleChange: PropTypes.func.isRequired,
};

export default FormField;
