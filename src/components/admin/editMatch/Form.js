import React from 'react';
import PropTypes from 'prop-types';
import FormField from '../../ui/formFields';

const Form = ({
  formType,
  formError,
  formSuccess,
  date,
  local,
  resultLocal,
  away,
  resultAway,
  referee,
  stadium,
  result,
  final,
  handleChange,
  submitForm
}) => {
  return (
    <div className="editmatch_dialog_wrapper">
      <h2> {formType} </h2>
      <form onSubmit={e => submitForm(e)}>
        <FormField
          id='date'
          formData={date}
          handleChange={e => handleChange(e)}
        />

        <div className="select_team_layout">
          <div className="label_inputs">
            Local
          </div>
          <div className="wrapper">
            <div className="left">
              <FormField
                id='local'
                formData={local}
                handleChange={e => handleChange(e)}
              />
            </div>
            <div>
              <FormField
                id='resultLocal'
                formData={resultLocal}
                handleChange={e => handleChange(e)}
              />
            </div>
          </div>
        </div>

        <div className="select_team_layout">
          <div className="label_inputs">
            Away
          </div>
          <div className="wrapper">
            <div className="left">
              <FormField
                id='away'
                formData={away}
                handleChange={e => handleChange(e)}
              />
            </div>
            <div>
              <FormField
                id='resultAway'
                formData={resultAway}
                handleChange={e => handleChange(e)}
              />
            </div>
          </div>
        </div>

        <div className="split_fields">
          <FormField
            id='referee'
            formData={referee}
            handleChange={e => handleChange(e)}
          />
          <FormField
            id='stadium'
            formData={stadium}
            handleChange={e => handleChange(e)}
          />
        </div>

        <div className="split_fields last">
          <FormField
            id='result'
            formData={result}
            handleChange={e => handleChange(e)}
          />
          <FormField
            id='final'
            formData={final}
            handleChange={e => handleChange(e)}
          />
        </div>

        <div className="success_label">
          {formSuccess}
        </div>
        {
          formError ?
            <div className="error_label">
              Something is wrong
            </div> :
            ''
        }

        <div className="admin_submit">
          <button onClick={e => submitForm(e)}>
            {formType}
          </button>
        </div>
      </form>
    </div>
  );
};

Form.propTypes = {
  formType: PropTypes.string,
  formError: PropTypes.bool,
  formSuccess: PropTypes.string,
  date: PropTypes.object,
  local: PropTypes.object,
  resultLocal: PropTypes.object,
  away: PropTypes.object,
  resultAway: PropTypes.object,
  referee: PropTypes.object,
  stadium: PropTypes.object,
  result: PropTypes.object,
  final: PropTypes.object,
  handleChange: PropTypes.func,
  submitForm: PropTypes.func,
};

export default Form;
